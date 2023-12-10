import { create } from "zustand";
import { subscribeWithSelector } from 'zustand/middleware';

type PhaseType = 'playing' | 'ready' | 'ended';

export interface StateProps {
  blocksCount: number;
  blocksSeed: number;
  phase: PhaseType;
  startTime: number;
  endTime: number;
  start: () => void;
  restart: () => void;
  end: () => void;
}

export default create(subscribeWithSelector((set: any) => {
  return {
    blocksCount: 10,
    blocksSeed: 0,

    phase: 'ready',

    startTime: 0,
    endTime: 0,

    start: () => {
      set((state: StateProps)=> {
        if (state.phase === 'ready') return { phase: 'playing', startTime: Date.now() };
        return {};
      })
    },
    
    restart: () => {
      set((state: StateProps)=> {
        if(state.phase === 'playing' || state.phase === 'ended' )
          return { phase: 'ready', blocksSeed: Math.random() };
        return {};
      })
    },

    end: () => {
      set((state: StateProps)=> {
        if (state.phase === 'playing')
          return { phase: 'ended', endTime: Date.now() }
        return {};
      })
    },

  } as StateProps;
}));