import { useKeyboardControls } from '@react-three/drei';
import './index.css';
import useGame from './stores/useGame';
import { useEffect, useRef } from 'react';
import { addEffect } from '@react-three/fiber';

const UI = () => {

  const timeRef = useRef<HTMLDivElement>(null);

  const restart = useGame((state: any) => state.restart);
  const phase = useGame((state: any) => state.phase)

  const forward = useKeyboardControls(state => state.forward);
  const backward = useKeyboardControls(state => state.backward);
  const left = useKeyboardControls(state => state.left);
  const right = useKeyboardControls(state => state.right);
  const jump = useKeyboardControls(state => state.jump);

  useEffect(() => {
    const unSubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0; 

      if (state.phase === 'playing'){
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === 'ended') {
        elapsedTime = state.endTime - state.startTime;
      }

      elapsedTime /= 1000;
      elapsedTime = +elapsedTime.toFixed(2);
      if(timeRef.current)
      timeRef.current.textContent = elapsedTime || '0.00';
    })

    return () => {
      unSubscribeEffect();
    }
  }, [])

  return (
    <>
      {/* Time */}  
      <div ref={timeRef} className='time'>0.00</div>

      {/* Restart */}
      {phase === 'ended' && <div className='restart' onClick={restart}>Restart</div>}

      {/* Controls */}
      <div className='controls'>
        <div className="raw">
          <div className={`key ${ forward && 'active'}` }></div>
        </div>
        <div className='raw'>
          <div className={ `key ${ left && 'active'}`}></div>
          <div className={ `key ${ backward && 'active'}`}></div>
          <div className={ `key ${ right && 'active'}`}></div>
        </div>
        <div className='raw'>
          <div className={`key large ${ jump && 'active'}`}></div>
        </div>
      </div>

    </>
  )
}
  
export default UI;