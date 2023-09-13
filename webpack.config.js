import * as swcDefaultConfig from '@nestjs/cli/libcompiler/defaults/swc-defaults';

const swcDefaultSetConfig = swcDefaultConfig.swcDefaultsFactory().swcOptions;

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: swcDefaultSetConfig,
        },
      },
    ],
  },
};
