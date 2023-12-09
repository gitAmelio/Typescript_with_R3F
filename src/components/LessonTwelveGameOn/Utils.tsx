import { BoxGeometry, MeshStandardMaterial } from "three";

export const boxGeometry = new BoxGeometry(1,1,1);

export const genMaterial = (props: any) => new MeshStandardMaterial({ ...props });

export const floor1Material = genMaterial({ color: 'limegreen' });
export const floor2Material = genMaterial({ color: 'greenyellow' });
export const obstacleMaterial = genMaterial({ color: 'orangered' });
export const wallMaterial = genMaterial({ color: 'slategrey' });