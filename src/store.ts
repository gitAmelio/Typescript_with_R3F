import { proxy } from 'valtio';

export type Shape = 'box' | 'sphere';

const state = proxy({
  normalShadow: true,
  ground: {x:0, y:0, z:0},
  envMapIntensity: 3.5,
  sunPosition:  {x:1, y:2, z:3},
})

export { state }