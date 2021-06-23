import { combineReducers } from '@reduxjs/toolkit';
// import login from './modules/login';
const modules = import.meta.globEager('./modules/**/*.ts');
const reducerModules: any = {};

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const objKey = key && key.match(/modules\/(\S*).ts/);
  if (objKey && objKey.length > 0) {
    reducerModules[objKey[1]] = mod;
  }
});
const reducers = { ...reducerModules };
export default combineReducers(reducers);
