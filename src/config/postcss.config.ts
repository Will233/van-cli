import { getPostcssConfig } from '../common';

type PostcssConfig = object & {
  plugins?: object;
}
interface PostcssConfigFunction {
  (ctx:{ file:object, options:object, env:string }): PostcssConfig
}
function mergePostcssConfig(config1: PostcssConfig, config2: PostcssConfig | PostcssConfigFunction) {
  if (typeof config2 === 'function') {
    return config2
  }
  const plugins = {
    ...config1.plugins,
    ...config2.plugins,
  };

  return {
    ...config1,
    ...config2,
    plugins,
  };
}

const DEFAULT_CONFIG = {
  plugins: {
    autoprefixer: {},
  },
};

module.exports = mergePostcssConfig(DEFAULT_CONFIG, getPostcssConfig());
