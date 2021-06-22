import { bindActionCreators } from 'redux';
import { useDispatch, useSelector, shallowEqual, TypedUseSelectorHook } from 'react-redux';
import { useMemo } from 'react';
import RootState from '/@/store/types/rootState';
export function useActions(actions, deps) {
  const dispatch = useDispatch();
  return useMemo(
    () => {
      if (Array.isArray(actions)) {
        return actions.map((a) => bindActionCreators(a, dispatch));
      }
      return bindActionCreators(actions, dispatch);
    },
    deps ? [dispatch, ...deps] : [dispatch]
  );
}

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useShallowEqualSelector(selector) {
  return useAppSelector(selector, shallowEqual);
}
