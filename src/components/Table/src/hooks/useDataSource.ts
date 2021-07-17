/*
 * @Author: weizheng
 * @Date: 2021-06-29 16:02:24
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-17 17:08:56
 */
import { useEffect } from 'react';
import { BasicTableProps, FetchParams } from '../types/table';
import { FilterValue, SorterResult } from 'antd/es/table/interface';
import { TablePaginationConfig } from 'antd/es/table';
import { useImmer, Updater } from 'use-immer';
import { produce } from 'immer';

import { get } from 'lodash-es';
import { isFunction, isBoolean } from '/@/utils/is';
import { FETCH_SETTING, ROW_KEY, PAGE_SIZE } from '../const';

interface ActionType {
  paginationInfo: TablePaginationConfig | boolean;
  setPagination: Updater<TablePaginationConfig>;
  setLoading: (loading: boolean) => void;
}

interface SearchState {
  sortInfo: Recordable;
  filterInfo: Record<string, string[]>;
}
export function useDataSource(
  props: BasicTableProps,
  { paginationInfo, setPagination, setLoading }: ActionType
) {
  const { sortFn, filterFn } = props;
  const [searchState, setSeatchState] = useImmer<SearchState>({
    sortInfo: {},
    filterInfo: {},
  });
  const [dataSource, setDataSource] = useImmer<{ data: Recordable[] }>({ data: [] });
  const getRowKey = () => {
    const { rowKey } = props;
    return rowKey || ROW_KEY;
  };
  const handleTableChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter: SorterResult<Recordable> | SorterResult<Recordable>[]
  ) => {
    setPagination((draft) => {
      draft = Object.assign({}, draft, pagination);
      return draft;
    });
    const params: Recordable = {};
    if (sorter && isFunction(sortFn)) {
      const sortInfo = sortFn(sorter);
      setSeatchState((draft) => {
        draft.sortInfo = sortInfo;
      });
      params.sortInfo = sortInfo;
    }

    if (filters && isFunction(filterFn)) {
      const filterInfo = filterFn(filters);
      setSeatchState((draft) => {
        draft.filterInfo = filterInfo;
      });
      params.filterInfo = filterInfo;
    }
    fetch(params);
  };
  async function fetch(opt?: FetchParams) {
    const { api, searchInfo, fetchSetting, beforeFetch, afterFetch, tableProps } = props;
    const { pagination } = tableProps || {};
    if (!api || !isFunction(api)) return;
    try {
      setLoading(true);
      const { pageField, sizeField, listField, totalField } = Object.assign(
        FETCH_SETTING,
        fetchSetting
      );
      let pageParams: Recordable = {};

      const { current = 1, pageSize = PAGE_SIZE } = paginationInfo as TablePaginationConfig;

      if ((isBoolean(pagination) && !pagination) || isBoolean(paginationInfo)) {
        pageParams = {};
      } else {
        pageParams[pageField] = (opt && opt.page) || current;
        pageParams[sizeField] = pageSize;
      }

      const { sortInfo = {}, filterInfo } = searchState;

      let params: Recordable = {
        ...pageParams,
        ...searchInfo,
        ...(opt?.searchInfo ?? {}),
        ...sortInfo,
        ...filterInfo,
        ...(opt?.sortInfo ?? {}),
        ...(opt?.filterInfo ?? {}),
      };
      if (beforeFetch && isFunction(beforeFetch)) {
        params = beforeFetch(params) || params;
      }

      const res = await api(params);
      const isArrayResult = Array.isArray(res);

      let resultItems: Recordable[] = isArrayResult ? res : get(res, listField);
      const resultTotal: number = isArrayResult ? 0 : get(res, totalField);

      // 假如数据变少，导致总页数变少并小于当前选中页码，通过getPaginationRef获取到的页码是不正确的，需获取正确的页码再次执行
      if (resultTotal) {
        const currentTotalPage = Math.ceil(resultTotal / pageSize);
        if (current > currentTotalPage) {
          setPagination((draft) => {
            draft.current = currentTotalPage;
          });
          fetch(opt);
        }
      }

      if (afterFetch && isFunction(afterFetch)) {
        resultItems = afterFetch(resultItems) || resultItems;
      }
      setDataSource(
        produce(dataSource, (draft) => {
          draft.data = resultItems;
        })
      );
      if (pagination) {
        setPagination((draft) => {
          draft.total = resultTotal || 0;
        });
      }
      if (opt && opt.page) {
        setPagination((draft) => {
          draft.current = opt.page || 1;
        });
      }
    } catch (error) {
      setDataSource({ data: [] });
      setPagination((draft) => {
        draft.total = 0;
      });
    } finally {
      setLoading(false);
    }
  }
  async function reload(opt?: FetchParams) {
    await fetch(opt);
  }
  useEffect(() => {
    fetch();
  }, []);

  return {
    dataSource,
    handleTableChange,
    getRowKey,
    fetch,
    reload,
  };
}
