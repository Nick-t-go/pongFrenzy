# phaser3-webpack4-template
A template for a Phaser 3 build using Webpack 4.

This was created following this tutorial:
https://snowbillr.github.io/blog/2018-04-09-a-modern-web-development-setup-for-phaser-3/#putting-it-all-together

In the above article the example is done in Webpack 3(WP3). This one attempts to use the newer version, Webpack 4(WP4). There are few setup differences. WP3 used `CommonsChunkPlugin` for seperating concerns(chunks) and WP4 uses `optimization.splitChunks`. I have yet to figure out how to use splitChunks. 

Instructions on giving it a whirl:
1) `yarn install`
2) `yarn webpack-dev-server`
3) `Open up your browser to http://localhost:8080`

