import React from "react";
import * as THREE from "three";

function Fundamentals() {
  const setLights = React.useCallback(() => {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);

    return light;
  }, []);

  const makeInstance = React.useCallback(
    (geometry: any, color: number, x: number) => {
      const material = new THREE.MeshPhongMaterial({ color });

      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = x;

      return cube;
    },
    []
  );

  React.useEffect(() => {
    const elCanvas = document.querySelector("#c") as HTMLCanvasElement;

    if (elCanvas) {
      const renderer = new THREE.WebGLRenderer({ canvas: elCanvas });

      const fov = 75;
      const aspect = 2;
      const near = 0.1;
      const far = 5;
      const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
      camera.position.z = 2;

      const scene = new THREE.Scene();

      const boxWidth = 1;
      const boxHeight = 1;
      const boxDepth = 1;
      const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

      //   const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
      //   const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
      //   const cube = new THREE.Mesh(geometry, material);
      const cubes = [
        makeInstance(geometry, 0x44aa88, 0),
        makeInstance(geometry, 0xaa8844, -2),
        makeInstance(geometry, 0x8844aa, 2),
      ];
      cubes.forEach((cube) => {
        scene.add(cube);
      });
      scene.add(setLights());

      const render = (time: number) => {
        time *= 0.001;

        cubes.forEach((cube, idx) => {
          const speed = 1 + idx * 0.1;
          const rot = time * speed;
          cube.rotation.x = rot;
          cube.rotation.y = rot;
        });

        renderer.render(scene, camera);

        requestAnimationFrame(render);
      };

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
  }, [setLights, makeInstance]);

  return <canvas id="c"></canvas>;
}

export default Fundamentals;
