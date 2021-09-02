import type { Plugin } from 'vite';

import legacy from '@vitejs/plugin-legacy';
import reactRefresh from '@vitejs/plugin-react-refresh';
import windiCSS from 'vite-plugin-windicss';

import { configHtmlPlugin } from './html';
import { configPwaConfig } from './pwa';
import { configCompressPlugin } from './compress';
import { configVisualizerConfig } from './visualizer';
// import { configPluginImp } from './pluginImp';
import { configStyleImportPlugin } from './styleImport';
// import { configImageminPlugin } from './imagemin';
import { configHmrPlugin } from './hmr';

export function createVitePlugins(viteEnv: any, isBuild: boolean) {
  const {
    // VITE_USE_IMAGEMIN,
    VITE_LEGACY,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
  } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [reactRefresh()];

  // vite-plugin-windicss
  vitePlugins.push(windiCSS());
  // TODO
  !isBuild && vitePlugins.push(configHmrPlugin());

  // @vitejs/plugin-legacy
  VITE_LEGACY && isBuild && vitePlugins.push(legacy());

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild));

  // vite-plugin-windicss

  // vite-plugin-style-import
  // vitePlugins.push(configPluginImp());
  vitePlugins.push(configStyleImportPlugin(isBuild));
  // rollup-plugin-visualizer
  vitePlugins.push(configVisualizerConfig());

  // The following plugins only work in the production environment
  if (isBuild) {
    //vite-plugin-imagemin
    // VITE_USE_IMAGEMIN && vitePlugins.push(configImageminPlugin());

    // rollup-plugin-gzip
    vitePlugins.push(
      configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE)
    );

    // vite-plugin-pwa
    vitePlugins.push(configPwaConfig(viteEnv));
  }

  return vitePlugins;
}
