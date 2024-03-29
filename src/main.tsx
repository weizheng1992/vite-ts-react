import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import '/@/design/index.less';

import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
import App from './App';

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);
