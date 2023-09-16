import { Dispatch, useReducer } from 'react';

type BasicStateAction<S> = ((S: S) => S) | S;

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  return typeof action === 'function' ? action(state) : action;
}

export function useStateCustom<S>(_initialState: (() => S) | S): [S, Dispatch<BasicStateAction<S>>] {
  return useReducer(
    basicStateReducer,
    // useReducer has a special case to support lazy useState initializers
    _initialState,
  );
}

type Action = { type: 'increase' };

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
