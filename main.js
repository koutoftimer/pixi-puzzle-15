requirejs.config({
	baseUrl: 'js',
	paths: {
		'pixi': '../node_modules/pixi.js/dist/pixi.min',
		'pixi-gl-core': '../node_modules/pixi-gl-core/bin/pixi-gl-core.min'
	}
})

require(['app'], (app, PIXI) => { app() })