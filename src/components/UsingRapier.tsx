import { Box, Torus, Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Physics,
  RigidBody,
  Debug,
  CuboidCollider,
  RoundCuboidCollider,
  BallCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { Suspense } from "react";
import Scene from "./Scene";

const count = 1000;

const UsingRapier = () => {
  return (
    <Canvas>
      <Suspense>
        <Physics colliders={false}>
          {/* Make a compound shape with two custom BallColliders */}
          <RigidBody position={[0, 10, 0]} restitution={1} colliders={"hull"}>
            <BallCollider args={[0.5]} position={[1, 0, 0]} />
          </RigidBody>

          <CuboidCollider position={[0, -2, 0]} args={[20, 0.5, 20]} />
          <Debug />
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default UsingRapier;
