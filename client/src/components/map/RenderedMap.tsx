import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { THREE, Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Scene } from "three";
import { resolveAsync } from "expo-asset-utils";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

//Docs said this line was required due to issues with Metro bundler
//@ts-ignore
global.THREE = global.THREE || THREE;

interface RenderedMapProps {
  isPannable: boolean;
  onMapYPan: (pan: number) => void;
  onMapXPan: (pan: number) => void;
}

const MAX_X_ROTATION = -1.3;
const MIN_X_ROTATION = -1.7;
const MAX_Y_ROTATION = 0.2;
const MIN_Y_ROTATION = -0.07;
let currentXRotation = -1.3;
let currentYRotation = 0;

function setCurrentXRotation(rotation: number) {
  currentXRotation = rotation;
}
function setCurrentYRotation(rotation: number) {
  currentYRotation = rotation;
}

export default function RenderedMap({
  isPannable,
  onMapXPan,
  onMapYPan,
}: RenderedMapProps) {
  useEffect(() => {
    currentXRotation = -1.3;
    currentYRotation = 0;
  }, []);

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      const newXRotation = currentXRotation + e.translationY / 300;
      if (newXRotation > MAX_X_ROTATION) {
        runOnJS(setCurrentXRotation)(MAX_X_ROTATION);
      } else if (newXRotation < MIN_X_ROTATION) {
        runOnJS(setCurrentXRotation)(MIN_X_ROTATION);
      } else {
        runOnJS(setCurrentXRotation)(newXRotation);
      }

      const newYRotation = currentYRotation + e.translationX / 300;
      if (newYRotation > MAX_Y_ROTATION) {
        runOnJS(setCurrentYRotation)(MAX_Y_ROTATION);
      } else if (newYRotation < MIN_Y_ROTATION) {
        runOnJS(setCurrentYRotation)(MIN_Y_ROTATION);
      } else {
        runOnJS(setCurrentYRotation)(newYRotation);
      }
    })
    .maxPointers(1);

  const ParentView = isPannable ? GestureDetector : View;

  return (
    <ParentView
      style={{ position: "absolute", width: "100%", height: "100%" }}
      gesture={panGesture}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          transform: [{ translateY: -200 }],
          position: "absolute",
        }}
      >
        <GLView
          style={{ flex: 1 }}
          onContextCreate={(gl) => createAndRenderMap(gl, onMapYPan, onMapXPan)}
        />
      </View>
    </ParentView>
  );
}

async function createAndRenderMap(
  gl: ExpoWebGLRenderingContext,
  onMapYPan: (pan: number) => void,
  onMapXPan: (pan: number) => void
) {
  const renderer: any = new Renderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  setUpRenderer(renderer);
  const scene = new THREE.Scene();

  const camera = addCamera(scene);
  addLight(scene);
  const model = await addModel(scene);
  let prevXRot = currentXRotation;
  let prevYRot = currentYRotation;

  const render = () => {
    if (prevXRot != currentXRotation) {
      onMapYPan(currentXRotation + 1.3); //Since -1.3 is natural state
    }
    if (prevYRot != currentYRotation) {
      onMapXPan(currentYRotation);
    }
    camera.rotation.x = currentXRotation;
    camera.rotation.y = currentYRotation;
    camera.position.copy(model.position);

    renderer.render(scene, camera);
    requestAnimationFrame(render);
    gl.endFrameEXP();
    prevXRot = currentXRotation;
    prevYRot = currentYRotation;
  };
  render();
}

function setUpRenderer(renderer: any) {
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.textureEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5;
}

function addCamera(scene: Scene): THREE.Camera {
  const camera = new THREE.OrthographicCamera(
    window.innerWidth / -160,
    window.innerWidth / 160,
    window.innerHeight / 160,
    window.innerHeight / -160
  );

  camera.position.set(0, 1, 0);
  scene.add(camera);
  return camera;
}

function addLight(scene: Scene) {
  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.y = 2;
  directionalLight.position.x = -0.3;

  scene.add(directionalLight);
}

async function addModel(scene: Scene): Promise<THREE.Group> {
  const model = await loadGLTFAsync({
    asset: require("../../../assets/3d_giu.glb"),
  });
  scene.add(model.scene);
  return model.scene;
}

/*
To fix issue with loading GLB files
https://github.com/expo/expo-three/issues/151#issuecomment-904532776
 */
async function loadFileAsync({ asset, funcName }: any) {
  if (!asset) {
    throw new Error(`ExpoTHREE.${funcName}: Cannot parse a null asset`);
  }
  return (await resolveAsync(asset)).localUri ?? null;
}

async function loadGLTFAsync({ asset, onAssetRequested }: any): Promise<GLTF> {
  const uri = await loadFileAsync({
    asset,
    funcName: "loadGLTFAsync",
  });
  const base64 = await FileSystem.readAsStringAsync(uri!!, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const arrayBuffer = decode(base64);
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.parse(
      arrayBuffer,
      onAssetRequested,
      (result) => {
        resolve(result);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
