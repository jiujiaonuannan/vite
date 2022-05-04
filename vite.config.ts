import { defineConfig, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import autoprefixer from 'autoprefixer';
import windi from 'vite-plugin-windicss';
// vite.config.ts
import viteEslint from 'vite-plugin-eslint';
import viteStylelint from '@amatlash/vite-plugin-stylelint';
// vite.config.ts
import svgr from 'vite-plugin-svgr';
import viteImagemin from 'vite-plugin-imagemin';

// 是否为生产环境，在生产环境一般会注入 NODE_ENV 这个环境变量，见下面的环境变量文件配置
const isProduction = process.env.NODE_ENV === 'production';
// 填入项目的 CDN 域名地址
const CDN_URL = 'xxxxxx';

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('./src/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig({
  base: isProduction ? CDN_URL : '/',
  plugins: [
    windi(),
    viteEslint(),
    svgr(),
    viteStylelint({
      exclude: /windicss|node_modules/
    }),
    react({
      babel: {
        // 加入 babel 插件
        // 以下插件包都需要提前安装
        // 当然，通过这个配置你也可以添加其它的 Babel 插件
        plugins: [
          // 适配 styled-component
          'babel-plugin-styled-components',
          // 适配 emotion
          '@emotion/babel-plugin'
        ]
      },
      // 注意: 对于 emotion，需要单独加上这个配置
      // 通过 `@emotion/react` 包编译 emotion 中的特殊 jsx 语法
      jsxImportSource: '@emotion/react'
    }),
    viteImagemin({
      // 无损压缩配置，无损压缩下图片质量不会变差
      optipng: {
        optimizationLevel: 7
      },
      // 有损压缩配置，有损压缩下图片质量可能会变差
      pngquant: {
        quality: [0.8, 0.9]
      },
      // svg 优化
      svgo: {
        plugins: [
          {
            name: 'removeViewBox'
          },
          {
            name: 'removeEmptyAttrs',
            active: false
          }
        ]
      }
    })
  ],
  build: {
    // 8 KB
    assetsInlineLimit: 8 * 1024
  },
  resolve: {
    // 别名配置
    alias: {
      '@assets': path.join(__dirname, 'src/assets')
    }
  },

  // css 相关的配置
  css: {
    modules: {
      // 一般我们可以通过 generateScopedName 属性来对生成的类名进行自定义
      // 其中，name 表示当前文件名，local 表示类名
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    },
    postcss: {
      plugins: [
        autoprefixer({
          // 指定目标浏览器
          overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        // additionalData 的内容会在每个 scss 文件的开头自动注入
        additionalData: `@import "${variablePath}";`
      }
    }
  }
});
