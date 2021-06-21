import { all } from 'redux-saga/effects';
import login from './modules/login';

// const modules = import.meta.globEager('./modules/**/*.ts');

// const sagaModules: any = {};

// Object.keys(modules).forEach((key) => {
//   console.log(key);
//   const mod = modules[key].default || {};
//   const objKey = key && key.match(/modules\/(\S*).ts/);
//   if (objKey && objKey.length > 0) {
//     sagaModules[objKey[1]] = mod;
//   }
// });
// const sagas = { ...sagaModules };

// export default function* rootSaga(): any {
//   return yield all([sagas]);
// }
export default function* rootSaga(): any {
  return yield all([login]);
}
