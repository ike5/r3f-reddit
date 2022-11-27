import { Box, Sphere } from "@react-three/drei";
import {
  Physics,
  RigidBody,
  BallCollider,
  CuboidCollider,
  RoundCuboidCollider
} from "@react-three/rapier";

const Scene = () => (
  <group position={[2, 5, 0]} rotation={[0, 0.3, 2]}>
    <RigidBody colliders="hull" includeInvisible>
    
    </RigidBody>
  </group>
);

export default Scene;
