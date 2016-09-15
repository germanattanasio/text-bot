'use strict';

var src = './src',
    docs = './docs',
    dist = './dist';

module.exports = {
  projectName: 'watson-developer-cloud-components',
  paths: {
    src: {
      root: src,
      styles: src + '/scss',
      scripts: src + '/js',
      views: src + '/views',
      dist: src + '/dist',
      icons: src + '/icons'
    },
    docs: {
      root: docs,
      styles: docs + '/css',
      scripts: docs + '/js',
      iconFonts: docs + '/fonts/icon-fonts',
      icons: docs + '/images/icons'
    },
    dist: {
      root: dist,
      stylesheets: dist + '/stylesheets',
      scripts: dist + '/js'
    }
  }
};