import { Dispatch, useReducer } from 'react';

type BasicStateAction<S> = ((S: S) => S) | S;

function basicStateReducer<S>(state: S, action: BasicStateAction<S>): S {
  return typeof action === 'function' ? action(state) : action;
}

export function useStateCustom<S>(_initialState: (() => S) | S): [S, Dispatch<BasicStateAction<S>>] {
  return useReducer(basicStateReducer, _initialState);
}
