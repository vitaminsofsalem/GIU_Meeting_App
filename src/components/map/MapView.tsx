import React from "react";
import { View } from "react-native";
import { THREE, Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { PerspectiveCamera, Scene } from "three";
import { resolveAsync } from "expo-asset-utils";
import { decode } from "base64-arraybuffer";
import * as FileSystem from "expo-file-system";

//Docs said this line was required due to issues with Metro bundler
//@ts-ignore
global.THREE = global.THREE || THREE;

export default function MapView() {
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <GLView style={{ flex: 1 }} onContextCreate={createAndRenderMap} />
    </View>
  );
}

async function createAndRenderMap(gl: ExpoWebGLRenderingContext) {
  const renderer: any = new Renderer({ gl });
  renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.textureEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.5;
  renderer.gammaOutput = true;

  const scene = new THREE.Scene();

  addModel(scene);

  scene.add(new THREE.AmbientLight(0xffffff, 0.3));

  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.y = 2;
  light.position.z = -0.3;

  scene.add(light);

  const camera = new PerspectiveCamera(
    70,
    gl.drawingBufferWidth / gl.drawingBufferHeight,
    0.01,
    1000
  );

  camera.position.set(0, 6, 0);
  camera.rotation.x = -1.55;

  const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };
  render();
}

async function addModel(scene: Scene): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const model: any = await loadGLTFAsync({
      asset: require("../../../assets/3d_giu.glb"),
    });
    scene.add(model.scene);
  });
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

async function loadGLTFAsync({ asset, onAssetRequested }: any) {
  const uri = await loadFileAsync({
    asset,
    funcName: "loadGLTFAsync",
  });
  if (!uri) return;
  const base64 = await FileSystem.readAsStringAsync(uri, {
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
