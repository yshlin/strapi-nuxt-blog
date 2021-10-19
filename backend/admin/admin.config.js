module.exports = {
  webpack: (config, webpack) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.module.rules.push({
      type: 'javascript/auto',
      test: /bravura[_A-z]*\.(woff(2)?|ttf|eot|otf|svg)$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: '../public/font/',
      },
    });
    config.module.rules.push({
      test: /sonivox\.sf2$/i,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: '../public/soundfont/',
      },
    });
    config.optimization.minimize = false;
    return config;
  },
};
