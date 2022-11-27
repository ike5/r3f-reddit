import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh, MathUtils } from "three";
import { useSpring, animated, config } from "@react-spring/three";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import {Physics, usePlane, useBox } from "@react-three/cannon";
// import { Physics, RigidBody} from "@react-three/rapier"

function Plane(props: any) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));

  return (
    <mesh receiveShadow ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#f0f0f0" />
    </mesh>
  );
}

function Box(props: any) {
  const [active, setActive] = useState(false);
  const [ref] = useBox(() => ({ mass: 1, ...props }));

  // Provides bounce when clicked
  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly,
  });

  useFrame(() => {
    // boxRef.current.rotation.x += 0.005;
    // boxRef.current.rotation.y += 0.01;
    // boxRef.current.rotation.z += 0.01;
  });

  return (
    <animated.mesh scale={scale} onClick={() => setActive(!active)} ref={ref}>
      {/* <planeGeometry args={[1000, 1000]} /> */}
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </animated.mesh>
  );
}

let pos = {
  x: 0,
  y: 0,
  z: 0,
};

function setRandomPositions() {
  pos.x = MathUtils.randFloat(-5, 5);
  pos.y = MathUtils.randFloat(50, 10);
  pos.z = MathUtils.randFloat(-5, 5);
  return pos;
}

let rows: any = [];
for (let i = 0; i < 100; i++) {
  setRandomPositions();
  rows.push(<Box key={i} position={[pos.x, pos.y, pos.z]} />);
}

function ThreeScene() {
  return (
    // start camera at specific position
    <Canvas camera={{ position: [-5, 5, 5], fov: 100 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} />
      <Physics>
        <Plane />
        {rows}
      </Physics>
      <ContactShadows
        frames={1}
        position={[0, -0.5, 0]}
        blur={1}
        opacity={0.75}
      />
      <ContactShadows
        frames={1}
        position={[0, -0.5, 0]}
        blur={5}
        color="orange"
      />
      <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 2.1} />
    </Canvas>
  );
}

export default ThreeScene;
