import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";
import { useSpring, animated, config } from "@react-spring/three";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Physics, usePlane, useBox } from "@react-three/cannon";

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
  // const boxRef = useRef<Mesh>(null!);

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

function ThreeScene() {
  return (
    // start camera at specific position
    <Canvas camera={{ position: [-5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} />
      <Physics>
        <Plane />
        <Box position={[0, 5, 0]} />
        <Box position={[0, 10, 0.5]} />
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
