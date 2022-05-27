import React from "react";
import { View } from "react-native";
import { THREE, Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { PerspectiveCamera, Scene } from "three";
import { resolveAsync } from "expo-asset-utils";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

//Docs said this line was required due to issues with Metro bundler
//@ts-ignore
global.THREE = global.THREE || THREE;

export default function RenderedMap() {
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      console.log("X", e.translationX);
      console.log("Y", e.translationY);
    })
    .onEnd((e) => {});

  return (
    <GestureDetector gesture={panGesture}>
      <View style={{ width: "100%", height: "100%" }}>
        <GLView style={{ flex: 1 }} onContextCreate={createAndRenderMap} />
      </View>
    </GestureDetector>
  );
}

async function createAndRenderMap(gl: ExpoWebGLRenderingContext) {
  const renderer: any = new Renderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.textureEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5;

  const scene = new THREE.Scene();

  addModel(scene);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.y = 2;
  light.position.z = -0.3;

  scene.add(light);

  const camera = new THREE.OrthographicCamera(
    window.innerWidth / -160,
    window.innerWidth / 160,
    window.innerHeight / 160,
    window.innerHeight / -160
  );

  camera.position.set(0, 1, 0);
  camera.rotation.x = -1;

  const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };
  render();
}

async function addModel(scene: Scene) {
  const model = await loadGLTFAsync({
    asset: require("../../../assets/3d_giu.glb"),
  });
  model.scene.position.z = -4;
  scene.add(model.scene);
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
