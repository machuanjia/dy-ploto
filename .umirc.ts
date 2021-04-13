/*
 * @Author: D.Y
 * @Date: 2021-03-24 11:45:49
 * @LastEditTime: 2021-04-13 09:48:34
 * @LastEditors: D.Y
 * @FilePath: /dy-ploto/.umirc.ts
 * @Description:
 */
import { defineConfig } from 'dumi';

export default defineConfig({
  title: 'dy-ploto',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  // locales:[['en-US', 'English'], ['zh-CN', '中文']],
  // mode: 'site',
  // more config: https://d.umijs.org/config
  // theme:{
  //   '@primary-color':'red'
  // },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
    ],
  ],
});
