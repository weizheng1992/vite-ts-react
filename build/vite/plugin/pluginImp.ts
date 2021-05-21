import vitePluginImp from 'vite-plugin-imp';

export function configPluginImp() {
  const htmlPlugin = vitePluginImp({
    libList: [
      {
        libName: 'antd',
        style: (name) => `antd/es/${name}/style/index`,
      },
    ],
  });
  return htmlPlugin;
}
