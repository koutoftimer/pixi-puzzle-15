define('puzzle/PuzzleButton', ['pixi'], (PIXI) => {
	const Container = PIXI.Container,
		Graphics = PIXI.Graphics,
		Point = PIXI.Point,
		Rectangle = PIXI.Rectangle,
		resources = PIXI.loader.resources,
		Sprite = PIXI.Sprite,
		Text = PIXI.Text,
		Texture = PIXI.Texture
		
	class PuzzleButton extends Text {
		
		set callback(value) {
			this._callback = value
		}
		
		constructor(conf) {
			super(conf['text'], conf)
			
			this.style.fontSize = conf['fontSize'] || '50px'
			this.style.fill = conf['fontColor'] || 'white'
			this.interactive = true
			this.buttonMode = true
			this.on('click', this.buttonHandler.bind(this))
			this.on('tap', this.buttonHandler.bind(this))
			
			this._callback = null
		}
		
		buttonHandler(e) { 
			this._callback 
				? this._callback(e)
				: console.warn('Not defined button callback')
		}
	}
	
	return PuzzleButton
})