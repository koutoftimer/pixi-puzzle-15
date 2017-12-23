define('puzzle/PuzzleMenu', ['pixi'], (PIXI) => {
	const Container = PIXI.Container,
		Graphics = PIXI.Graphics,
		Point = PIXI.Point,
		Rectangle = PIXI.Rectangle,
		resources = PIXI.loader.resources,
		Sprite = PIXI.Sprite,
		Text = PIXI.Text,
		Texture = PIXI.Texture
		
	class PuzzleMenu extends Container {
		constructor(conf) {
			super()
			
			let mixCallback = conf['mixCallback']
			
			let mixButton = new Text('Mix puzzle', {
				fill: 'white',
				fontSize: '50px'
			})
			
			this.menuWidth = 900
			this.menuHeigh = 100
			
			mixButton.interactive = true
			mixButton.buttonMode = true
			mixButton.x = (this.menuWidth - mixButton.width) / 2
			mixButton.y = (this.menuHeigh - mixButton.height) / 2
			mixButton.on('click', mixCallback)
			mixButton.on('tap', mixCallback)
			this.addChild(mixButton)
		}
		
		
	}
	
	return PuzzleMenu
})