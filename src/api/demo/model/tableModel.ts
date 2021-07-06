/*
 * @Author: weizheng
 * @Date: 2021-06-29 17:23:23
 * @LastEditors: weizheng
 * @LastEditTime: 2021-07-01 16:57:40
 */
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
/**
 * @description: Request list interface parameters
 */
export type DemoParams = BasicPageParams;

export interface DemoListItem {
  id: string;
  nickname: string;
  username: string;
  email: number;
}

/**
 * @description: Request list return value
 */
export type DemoListGetResultModel = BasicFetchResult<DemoListItem>;
