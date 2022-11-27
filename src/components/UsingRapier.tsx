import { Box, Torus } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  Debug,
  CuboidCollider,
  RoundCuboidCollider,
} from "@react-three/rapier";
import { Suspense } from "react";
import Scene from "./Scene";

const UsingRapier = () => {
  return (
    <Canvas>
      <Suspense>
        <Physics>
          <RigidBody colliders={"hull"} restitution={1.8}>
            <Torus />
          </RigidBody>
          <RigidBody colliders={"hull"} restitution={1}>
            <CuboidCollider position={[0, 5, 0]} args={[1, 1, 1]} />
          </RigidBody>

          <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />

          {/* <Scene /> */}
          <Debug />
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default UsingRapier;
