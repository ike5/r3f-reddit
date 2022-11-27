import { Box, Torus } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Physics, RigidBody, Debug, CuboidCollider } from "@react-three/rapier";
import { Suspense } from "react";

const UsingRapier = () => {
  return (
    <Canvas>
      <Suspense>
        <Physics>
          <RigidBody colliders={"hull"} restitution={2}>
            <Torus />
          </RigidBody>

          <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />

          <Debug />
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default UsingRapier;
