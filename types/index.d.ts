/// <reference types="react" />
declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}
