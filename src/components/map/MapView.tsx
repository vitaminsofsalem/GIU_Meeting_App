import React from "react";
import { View } from "react-native";
import { THREE, Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Asset } from "expo-asset";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { OrthographicCamera, Scene } from "three";

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

  const scene = new THREE.Scene();

  //increase number to increase zoom
  const camera = new THREE.OrthographicCamera(
    window.innerWidth / -180,
    window.innerWidth / 180,
    window.innerHeight / 180,
    window.innerHeight / -180
  );

  addLights(scene);
  const material = await loadMaterial();
  addModel(scene, material, camera);

  const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };
  render();
}

function addLights(scene: Scene) {
  const lightPositions = [
    [1, 0, 0], //from right
    [0, 1, 0], //from top
    [0, 0, 1], //from front
    [0, 0, -1], // from back
  ];

  for (const lightPosition of lightPositions) {
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(
      lightPosition[0],
      lightPosition[1],
      lightPosition[2]
    );
    scene.add(directionalLight);
  }
}

function loadMaterial(): Promise<MTLLoader.MaterialCreator> {
  return new Promise(async (resolve, reject) => {
    const material = Asset.fromModule(require("../../../assets/3d_giu.mtl"));
    await material.downloadAsync();
    const mtlLoader = new MTLLoader();

    mtlLoader.load(material.localUri!!, (loadedMaterial) => {
      resolve(loadedMaterial);
    });
  });
}

async function addModel(
  scene: Scene,
  material: MTLLoader.MaterialCreator,
  camera: OrthographicCamera
) {
  const model = Asset.fromModule(require("../../../assets/3d_giu.obj"));
  await model.downloadAsync();

  const objLoader = new OBJLoader();
  objLoader.setMaterials(material);
  objLoader.load(model.localUri!!, (group) => {
    scene.add(group);
    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 0.3;
    camera.lookAt(group.position);
  });
}
