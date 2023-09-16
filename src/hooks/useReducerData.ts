import { useReducer } from 'react';

import { Action } from './types.ts';

export function reducer(state: number, action: Action) {
  switch (action.type) {
    case 'increase':
      return state + 1;
    default:
      return state;
  }
}

export function useReducerData() {
  return useReducer(reducer, 0);
}
