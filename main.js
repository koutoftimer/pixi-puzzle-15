requirejs.config({
	baseUrl: 'js',
	paths: {
		'pixi': 'lib/pixi.min',
		'pixi-gl-core': 'lib/pixi-gl-core.min',
		'pixi-sound': 'lib/pixi-sound',
		'hammer': 'lib/hammer.min',
		'mini-signals': 'lib/browser'
	},
	shim: {
		'pixi-sound': ['pixi']
	}
})

require(['app'], (app) => { app() })