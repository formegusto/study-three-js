import React from "react";
import * as THREE from "three";

function Primitives() {
  const makeInstance = React.useCallback(
    (geometry: any, color: number, x: number) => {
      const material = new THREE.MeshBasicMaterial({ color: color });
      const instance = new THREE.Mesh(geometry, material);
      instance.position.x = x;

      return instance;
    },
    []
  );

  React.useEffect(() => {
    const elCanvas = document.getElementById("c") as HTMLCanvasElement;
    if (elCanvas) {
      const renderer = new THREE.WebGLRenderer({ canvas: elCanvas });

      const fov = 75;
      const aspect = 1;
      const near = 0.1;
      const far = 5;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 4;

      const scene = new THREE.Scene();

      const boxInfo = [1, 1, 1];
      const boxGeo = new THREE.BoxGeometry(boxInfo[0], boxInfo[1], boxInfo[2]);
      const boxInstance = makeInstance(boxGeo, 0x44aa88, 0);
      boxInstance.rotation.x = 10;
      boxInstance.rotation.y = 2;
      scene.add(boxInstance);

      renderer.render(scene, camera);
    }
  }, [makeInstance]);
  return <canvas id="c" width="500" height="500"></canvas>;
}

export default Primitives;
