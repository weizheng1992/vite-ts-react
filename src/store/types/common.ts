export interface Action<T extends string, P> {
  type: T;
  payload: P;
}
