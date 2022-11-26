import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Mesh } from "three";

function Box() {
  const boxRef = useRef<Mesh>(null!);

  useFrame(() => {
    boxRef.current.rotation.x += 0.005;
    boxRef.current.rotation.y += 0.01;
    boxRef.current.rotation.z += 0.01;
  });

  return (
    <mesh ref={boxRef} onClick={(e) => alert("hello")}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"orange"} />
    </mesh>
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
