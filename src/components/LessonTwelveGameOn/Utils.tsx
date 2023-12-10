import { BoxGeometry, MeshStandardMaterial } from "three";

export const boxGeometry = new BoxGeometry(1,1,1);

export const genMaterial = (props: any) => new MeshStandardMaterial({ ...props });

export const floor1Material = genMaterial({ color: '#111111', metalness: 0, roughness: 0 });
export const floor2Material = genMaterial({ color: '#222222', metalness: 0, roughness: 0 });
export const obstacleMaterial = genMaterial({ color: '#ff0000', metalness: 0, roughness: 1 });
export const wallMaterial = genMaterial({ color: '#887777', metalness: 0, roughness: 0 });