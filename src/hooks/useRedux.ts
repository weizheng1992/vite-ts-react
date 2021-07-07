/*
 * @Author: weizheng
 * @Date: 2021-06-22 20:30:54
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-07 15:59:36
 */
import { bindActionCreators, ActionCreator } from 'redux';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useMemo, DependencyList } from 'react';
import { createSelectorCreator, defaultMemoize } from 'reselect';
import { isEqual } from 'lodash-es';

import RootState from '/@/store/types/rootState';

export function useActions(actions: ActionCreator<Recordable>, deps?: DependencyList) {
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

/**
 * @name: weizheng
 * @desc: obj 对比 selector
 * @param {function} selector
 * @return {*}
 */
export function useShallowEqualSelector<TSelected>(
  selector: (state: RootState) => TSelected
): TSelected {
  return useSelector<RootState, TSelected>(selector, shallowEqual);
}
// demo:
// const { userId }: LoginResultModel = useShallowEqualSelector<LoginResultModel>(
//     (state) => state.user.userInfo
//   );
/**
 * @name: weizheng
 * @desc: array 对比 select 缓存
 * @param {*} selectors
 * @param {*} selectorCreator
 * @return {*}
 */
export function useSelectorArray(selectors, selectorCreator) {
  const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);
  const itemSelector = createDeepEqualSelector(selectors, selectorCreator);
  const data = useSelector(itemSelector);
  return data;
}
// demo
// useSelectorArray(state => state.user,user => user.list)
