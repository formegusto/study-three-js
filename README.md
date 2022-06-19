# Fundamentals

<img width="795" alt="" src="https://user-images.githubusercontent.com/52296323/174477533-954d9156-130d-4ff8-bf03-cf5bd137dc7c.png">

three js structure

Renderer는 three.js의 주요 객체이다. Scene과 Camera 객체를 전달하면 카메라 내부에 있는 3D 장면의 일부 frustum eq.절두체 를 캔버스에 2D 이미지로 그려낸다.

다이어그램을 보게되면 Camera 객체는 Scene 그래프에서 절반으로 떨어져 있는데, 이는 Camera가 기능하기 위해 Scene 그래프에 있을 필요가 없다는 것을 나타낸다. 다른 개체들과 마찬가지로 Camera 객체도 다른 객체의 자식처럼 부모 객체에 대해 움직이며 방향을 지정한다.

Mesh 객체는 Material 객체를 사용하여 Geometry를 그리는 것을 나타낸다. Material 개게와 Geometry 객체는 모두 여러 개의 Mesh 객체에서 사용할 수 있다. ex ) 서로 다른 위치에 파란색 큐브 두 개를 그리려면 각 큐브의 위치와 방향을 나타내는 2개의 Mesh 객체가 필요할 수 있다.

Geometry 객체는 구체, 입방체, 평면, 개, 고양이, 인간, 나무, 건물 등과 같은 일부 형상 조각의 정점 데이터를 나타낸다. Three.js에서는 많은 종류의 내장 Geometry 를 제공한다. 이는 Custom하게 만들거나 로드할 수도 있다.

Material 객체는 사용할 색과 얼마나 반짝이는지를 포함하여 Geometry를 그리는 데 사용되는 표면적인 특성을 나타낸다. Material은 예를 들어 이미지를 Geometry 표면에 감는 데 사용할 수 있는 하나 이상의 텍스처 객체를 참조할 수도 있다.

Texture 객체는 일반적으로 이미지 파일에서 로드되거나 캔버스에서 생성되거나 다른 장면에서 렌더링된 이미지를 나타낸다.

Light 객체는 여러 종류의 빛을 나타낸다.

# 주요 객체를 사용하여 Box 도형 그리기

1. Canvas

```html
<canvas id="c"></canvas>
```

1. Renderer

```tsx
const elCanvas = document.querySelector("#c") as HTMLCanvasElement;

const renderer = new THREE.WebGLRenderer({ canvas: elCanvas });
```

Rendere는 renderer에 정의한 데이터를 가져와 canvas에 렌더링하는 역할을 한다. 과거에는 CSSRendere, CanvasRenderer와 같은 렌더러가 있었고, 현재는 WebGPURender, WebGLRenderer와 같은 WebGL을 사용하여 3D 렌더링하는 기능을 ㅗ사용한다.

1. Camera

```tsx
const fov = 75;
const aspect = 2;
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
```

<img width="812" alt="" src="https://user-images.githubusercontent.com/52296323/174477549-816d3907-d001-4371-a4b1-4df08e30409e.png">

- fov (field of view) : 원근 카메라 각도를 이용한다. 수직치수가 현재 75도로 설정되어 있다.
- aspect : 캔버스의 표시 측면, 기본적으로 캔버스 태그는 300x150 픽셀이므로 화면비를 300/150 또는 2로 만든다.
- near, far : 렌더링될 카메라 앞의 공간을 나타낸다. 해당 범위 이전이나 이후에 있는 모든 항목은 그려지지 않는다.

→ 이 모든 설정은 절두체 (frustum)를 정의한다. 절두체는 끝이 잘린 피라미드와 같은 3d 모양의 이름이다.

<img width="830" alt="" src="https://user-images.githubusercontent.com/52296323/174477563-ed720a86-e048-4170-bcce-9bbea917ebe0.png">

- 카메라는 기본적으로 +Y를 위로 올려 -Z 축을 아래로 바라보도록 설정된다. 우리는 큐브를 원점에 놓는 것이 목표이므로 카메라를 원점에서 약간 뒤로 움직여야 볼 수 있다.

1. Scene

```tsx
const scene = new THREE.Scene();
```

Scene은 장면 그래프 형식의 루트이다. Camera 객체는 Scene을 찍는다. Scene에 피사체를 두어야 한다.

1. BoxGeometry

```tsx
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
```

1. Material

```tsx
const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
```

기본재질에 색만 추가한 형태의 재질이다.

1. Make Cube

```tsx
const cube = new THREE.Mesh(geometry, material);
```

형상(geometry)과 재질(material)을 이용하여 cube를 만든다.

1. 장면에 cube 추가

```tsx
scene.add(cube);
```

1. 화면 렌더링

```tsx
renderer.render(scene, camera);
```

# requestAnimationFrame

```tsx
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
```

window.requestAnimationFrame 메서드는 DOMHighResTimeStamp를 callback 인자의 매개변수로 전달한다. DOMHighResTimeStamp는 문서 수명의 시작 시점 부터 특정 시점 사이에 경과된 밀리초를 설명하는 부동 소수점의 숫자이다. 해당 값을 이용하여 Cube에 회전 Animation을 주었으며, 3D Cube가 그려졌음을 확인할 수 있다.

# 조명 객체 이용하기

```tsx
const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
```

방향등에는 위치와 대상이 있다. 기본 값은 0,0,0 인데 이 경우에는 조명의 위치를 -1, 2, 4로 설정해서 카메라의 왼쪽, 위, 뒤에 약간 위치하도록 했다. 우리가 만든 큐브는 0,0,0에 위치한다.

```tsx
// const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
```

MeshBasicMaterial은 조명의 영향을 받지 않는다. 그렇기 때문에 MeshPhongMaterial을 사용해서 조명의 영향을 받는 재질로 교체해준다.

# Make Instance

```tsx
const makeInstance = React.useCallback(
  (geometry: any, color: number, x: number) => {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.x = x;

    return cube;
  },
  []
);

// ...

const cubes = [
  makeInstance(geometry, 0x44aa88, 0),
  makeInstance(geometry, 0xaa8844, -2),
  makeInstance(geometry, 0x8844aa, 2),
];
cubes.forEach((cube) => {
  scene.add(cube);
}

// ...

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
```
