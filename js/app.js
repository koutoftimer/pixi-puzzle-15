define('app', ['pixi'], (PIXI) => {
	return () => {
		//Aliases
		let Application = PIXI.Application,
			loader = PIXI.loader,
			resources = PIXI.loader.resources,
			Sprite = PIXI.Sprite,
			Text = PIXI.Text,
			TextStyle = PIXI.TextStyle,
			Rectangle = PIXI.Rectangle
			
		let options = {
			width: 800, 
			height: 600,
			antialias: true,
			transparent: false,
			resolution: 1
		}
		let app = new Application(options)
		app.renderer.view.style.position = 'absolute'
		app.renderer.view.style.display = 'block'
		app.renderer.autoResize = true
		app.renderer.resize(window.innerWidth, window.innerHeight)
		app.renderer.backgroundColor = 0x061639
		document.body.appendChild(app.view)
		
		console.log(app)
		
		let text = new Text('Пивет Настя!', {fill: 'white'});
		app.stage.addChild(text)
		
		loader.add('background', 'img/Hydrangeas.jpg')
			.on('progress', (loader, resource) => {
				console.log('loading: ' + resource.url)
				console.log('progress: ' + loader.progress)
			})
			.load(() => {
				let texture = resources.background.texture,
					sprite = null,
					scale = .3,
					anchor = .5
				texture.frame = new Rectangle(300, 180, 500, 500)
				sprite = new Sprite(resources.background.texture)
				sprite.width = sprite.height = 200
				sprite.anchor.set(anchor, anchor)
				sprite.position.set(200, 200)
				
				app.ticker.add(delta => { sprite.x += 1 })
				app.stage.addChild(sprite)
				console.log('done')
			})
		
	}
})