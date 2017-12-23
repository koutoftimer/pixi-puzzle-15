define('puzzle/PuzzleTile', ['pixi'], (PIXI) => {
	const Container = PIXI.Container,
		Point = PIXI.Point,
		Sprite = PIXI.Sprite,
		Text = PIXI.Text
	
	class PuzzleTile extends Container {
		constructor(conf) {
			super()
			
			let texture = conf['texture'],
				width = conf['width'],
				height = conf['height'],
				text = conf['text']
				
			this.width = width
			this.height = height
				
			// initial positions
			this.row = conf['row']
			this.col = conf['col']
			
			let sprite = new Sprite(texture)
			sprite.position.set(0, 0)
			sprite.width = width
			sprite.height = height
			this.addChild(sprite)
			
			let number = new Text(text, { fill: '#ffffff', fontSize: Math.floor(height / 3) + 'px' })
			number.x = (width - number.width) / 2
			number.y = (height - number.height) / 2
			this.addChild(number)
			
			this.initPosition()
		}
		
		initPosition() {
			this.setPosition(this.row, this.col)
		}
		
		setPosition(row, col) {
			this.position.set(this.width * col, this.height * row)
		}
		
		swap(other) {
			let tempPoint = new Point(this.position.x, this.position.y)
			this.position.copy(other.position)
			other.position.copy(tempPoint)
		}
	}
	
	return PuzzleTile
})