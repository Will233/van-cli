import sass from 'sass';
import FriendlyErrorsPlugin from '@nuxt/friendly-errors-webpack-plugin';
import { VueLoaderPlugin } from 'vue-loader';
import {
  CACHE_DIR,
  STYLE_EXTS,
  SCRIPT_EXTS,
  POSTCSS_CONFIG_FILE,
} from '../common/constant';

const CACHE_LOADER = {
  loader: 'cache-loader',
  options: {
    cacheDirectory: CACHE_DIR,
  },
};

const CSS_LOADERS = [
  'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      config: {
        path: POSTCSS_CONFIG_FILE,
      },
    },
  },
];

const IMAGE_LOADERS = {
  loader: 'url-loader',
  options: {
    limit: 10240,
    fallback: {
      loader: 'file-loader',
      options: {
        name: 'img/[name].[hash:8].[ext]'
      }
    }
  }
}
export const baseConfig = {
  mode: 'development',
  resolve: {
    extensions: [...SCRIPT_EXTS, ...STYLE_EXTS],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          CACHE_LOADER,
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
        ],
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules\/(?!(@vant\/cli))/,
        use: [CACHE_LOADER, 'babel-loader'],
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: CSS_LOADERS,
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [...CSS_LOADERS, 'less-loader'],
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          ...CSS_LOADERS,
          {
            loader: 'sass-loader',
            options: {
              implementation: sass,
            },
          },
        ],
      },
      {
        test: /\.md$/,
        use: [CACHE_LOADER, 'vue-loader', '@vant/markdown-loader'],
      },
      {
        test:/\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [IMAGE_LOADERS, 'file-loader']
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsPlugin({
      clearConsole: false,
      logLevel: 'WARNING',
    }),
  ],
};
