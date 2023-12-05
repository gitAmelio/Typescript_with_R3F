import { InstancedRigidBodies, InstancedRigidBodyProps, RapierRigidBody } from "@react-three/rapier";
import { useEffect, useMemo, useRef } from "react";

const MeshInstances = ({count}: {count: number}) => {
  const rigidBodies = useRef<RapierRigidBody[]>(null);

  // useEffect(() => {
  //   if (!rigidBodies.current) {
  //     return;
  //   }

  //   // You can access individual instanced by their index
  //   rigidBodies.current[40].applyImpulse({ x: 0, y: 10, z: 0 }, true);
  //   rigidBodies.current.at(100).applyImpulse({ x: 0, y: 10, z: 0 }, true);

  //   // Or update all instances
  //   rigidBodies.current.forEach((api) => {
  //     api.applyImpulse({ x: 0, y: 10, z: 0 }, true);
  //   });
  // }, []);

  // We can set the initial positions, and rotations, and scales, of
  // the instances by providing an array of InstancedRigidBodyProps
  // which is the same as RigidBodyProps, but with an additional "key" prop.
  const instances = useMemo(() => {
    const instances: InstancedRigidBodyProps[] = [];

    for (let i = 0; i < count; i++) {
      const scale = 0.2 + Math.random() * 0.8;
      instances.push({
        key: "instance_" + Math.random(),
        position: [
          (Math.random() - 0.5) * 8, 
          6 + i * 0.2,
          (Math.random() - 0.5) * 8,
        ],
        rotation: [
          Math.random(), 
          Math.random(), 
          Math.random()
        ],
        scale: [scale, scale, scale]
      });
    }

    return instances;
  }, []);

  return (
    <InstancedRigidBodies
      ref={rigidBodies}
      instances={instances}
      colliders="cuboid"
    >
      <instancedMesh args={[undefined, undefined, count]} count={count}>
        <boxGeometry />
        <meshPhongMaterial color="tomato" />
      </instancedMesh>
    </InstancedRigidBodies>
  );
};

export default MeshInstances;