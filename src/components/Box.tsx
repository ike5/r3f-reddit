import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Mesh } from "three";
import { useSpring, animated, config } from "@react-spring/three"

function Box() {
  const boxRef = useRef<Mesh>(null!);
  const [active, setActive] = useState(false);

  // Provides bounce when clicked
  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly
  });

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.01;
    boxRef.current.rotation.z += 0.01;
  });

  return (
    <animated.mesh
      scale={scale}
      onClick={() => setActive(!active)}
      ref={boxRef}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshPhongMaterial color={"royalblue"} />
    </animated.mesh>
  );
}

function ThreeScene() {
  return (
    <Canvas>
      <ambientLight intensity={0.7} />
      <pointLight position={[5, 5, 5]} />
      <Box />
    </Canvas>
  );
}

export default ThreeScene;
