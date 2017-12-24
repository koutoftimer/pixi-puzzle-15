requirejs.config({
	baseUrl: 'js',
	paths: {
		'pixi': '../node_modules/pixi.js/dist/pixi.min',
		'pixi-gl-core': '../node_modules/pixi-gl-core/bin/pixi-gl-core.min',
		'pixi-sound': '../node_modules/pixi-sound/dist/pixi-sound',
		'hammer': '../node_modules/hammerjs/hammer.min',
		'mini-signals': '../node_modules/mini-signals/browser'
	},
	shim: {
		'pixi-sound': ['pixi']
	}
})

require(['app'], (app) => { app() })