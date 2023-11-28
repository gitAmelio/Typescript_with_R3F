import { BlendFunction, Effect } from "postprocessing";
import { Uniform, WebGLRenderTarget, WebGLRenderer } from "three";

const fragmentShader = /* glsl */`

  uniform float uFrequency;
  uniform float uAmplitude;
  uniform float offset;

  void mainUv(inout vec2 uv){
    uv.y += sin((uv.x + offset ) * uFrequency) * uAmplitude;
  }


  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor){
    vec4 color = inputColor;
    // color.rgb *= vec3(0.8, 1.0, 0.5);
    outputColor = vec4(0.8, 1.0, 0.5, inputColor.a);
  }
`

export interface DrunkEffectProps {
  frequency?: number;
  amplitude?: number;
  blendFunction?: BlendFunction
}

export default class DrunkEffect extends Effect{
  constructor({frequency, amplitude, blendFunction}: DrunkEffectProps ){
    super(
      'DrunkEffect',
      fragmentShader,
      {
        blendFunction,
        uniforms: new Map([
          ['uFrequency', new Uniform(frequency)],
          ['uAmplitude', new Uniform(amplitude)],
          ['offset', new Uniform(0)]
        ])
      }
    )
  }

  update(_renderer: WebGLRenderer, _inputBuffer: WebGLRenderTarget, deltaTime: number){
    if (this){
      this
      .uniforms
      .get('offset')!.value += deltaTime || 0;
    }
  }
}