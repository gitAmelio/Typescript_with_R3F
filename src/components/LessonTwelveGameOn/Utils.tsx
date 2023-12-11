import React from "react";
import { BoxGeometry, MeshStandardMaterial } from "three";
import Obstacle from "./Obstacle";

export const boxGeometry = new BoxGeometry(1,1,1);

export const genMaterial = (props: any) => new MeshStandardMaterial({ ...props });

export const floor1Material = genMaterial({ color: '#111111', metalness: 0, roughness: 0 });
export const floor2Material = genMaterial({ color: '#222222', metalness: 0, roughness: 0 });
export const obstacleMaterial = genMaterial({ color: '#ff0000', metalness: 0, roughness: 1 });
export const wallMaterial = genMaterial({ color: '#887777', metalness: 0, roughness: 0 });

type BlockType = 'start' | 'axe' | 'limbo' | 'spinner' | 'end';

interface BlockMeshProps{
  material: MeshStandardMaterial;
  position: [number, number, number];
  type: BlockType
  children?: React.ReactNode;
}

export const BlockMesh: React.FC<BlockMeshProps> = ({ material, position, type, children }) => (
  <group position={position}>
    <mesh 
      geometry={ boxGeometry } 
      material={ material }
      position={ [ 0, (type === 'end') ? 0 : -0.1, 0 ] } 
      scale={ [4, 0.2, 4] } 
      receiveShadow
    />
    {!((type === 'start') || (type === 'end')) && <Obstacle position={ position } type={ type } />}
    { children }
  </group>
)