import { useEffect, useRef } from "react";
import {
  InstancedRigidBodyApi,
  InstancedRigidBodies,
  CuboidCollider
} from "@react-three/rapier";

const COUNT = 1000

const Scene = () => {
  const instancedApi = useRef<InstancedRigidBodyApi>(null);

  useEffect(() => {
    // You can access individual instanced by their index
    instancedApi.at(40).applyImpulse({ x: 0, y: 10, z: 0 });

    // Or update all instances as if they were in an array
    instancedApi.forEach((api) => {
      api.applyImpulse({ x: 0, y: 10, z: 0 });
    });
  }, []);

  // We can set the initial positions, and rotations, and scales, of
  // the instances by providing an array equal to the instance count
  const positions = Array.from({ length: COUNT }, (_, index) => [index, 0, 0]);

  const rotations = Array.from({ length: COUNT }, (_, index) => [
    Math.random(),
    Math.random(),
    Math.random(),
  ]);

  const scales = Array.from({ length: COUNT }, (_, index) => [
    Math.random(),
    Math.random(),
    Math.random(),
  ]);

  return (
    <InstancedRigidBodies
      ref={instancedApi}
      positions={positions}
      rotations={rotations}
      scales={scales}
      colliders="ball"
    >
      <instancedMesh args={[undefined, undefined, COUNT]}>
        <sphereGeometry args={[0.2]} />
        <meshPhysicalGeometry color="blue" />

        <CuboidCollider args={[0.1, 0.2, 0.1]} />
      </instancedMesh>
    </InstancedRigidBodies>
  );
};

export default Scene;
