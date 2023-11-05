import { proxy } from 'valtio'

export type Shape = 'box' | 'sphere';

const state = proxy({
  active: 0,
  colors: ['blue', 'yellow', 'red', 'green'],
  buttunColor: ['none', 'none'], 
  shapes: ['box', 'sphere'] as Shape[],
  buttonShape: ['box', 'box'] as Shape[]
})

export { state }
