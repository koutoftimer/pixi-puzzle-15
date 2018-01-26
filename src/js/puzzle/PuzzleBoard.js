define('puzzle/PuzzleBoard', ['pixi', 'pixi-sound', 'hammer', 'puzzle/PuzzleTile', 'puzzle/data/Board'], (PIXI, pixiSound, Hammer, PuzzleTile, board) => {
	const Container = PIXI.Container,
		Graphics = PIXI.Graphics,
		loader = PIXI.loader,
		Point = PIXI.Point,
		Rectangle = PIXI.Rectangle,
		resources = PIXI.loader.resources,
		sound = PIXI.sound,
		Sprite = PIXI.Sprite,
		Text = PIXI.Text,
		Texture = PIXI.Texture
		
	class PuzzleBoard extends Container {
		
		get resources() {
			return [
				{ name: 'moveSound', url: 'ogg/move.ogg' }
			]
		}
		
		get tileWidth() { return this.boardWidth / board.size }
		get tileHeight() { return this.boardHeight / board.size }
				
		constructor(conf) { 
			super()
			
			this.scene = conf['scene']
			this.moveSound = resources['moveSound'] ? resources['moveSound'].sound : null
		
			this.position.set(0, 100)
			this.boardWidth = 900
			this.boardHeight = 900
			this.backgroundColor = 0x709DFF
			
			// container for tiles of the puzzle
			this.board = null
		}
		
		addSignalHandlers() {
			board.boardChanged.add(this.onBoardChanged, this)
			board.boardSizeChanged.add(this.onBoardSizeChanged, this)
		}
		
		initBoard() {
			// board tiles
			this.board = new Array(board.size * board.size)
			for (let i = 0; i < board.size * board.size; ++i) {
				let row = Math.floor(i / board.size),
					col = i % board.size
				let partTexture = Texture.WHITE
				if (i != board.size * board.size - 1) {
					let graphics = new Graphics()
						.beginFill(this.backgroundColor)
						.drawRect(0, 0, this.tileWidth, this.tileHeight)
						.endFill()
					partTexture = graphics.generateCanvasTexture()
				}
				let tile = new PuzzleTile({
					texture: partTexture,
					width: this.tileWidth,
					height: this.tileHeight,
					text: (i + 1).toString()
				})
				tile.setPosition(row, col)
				this.board[i] = tile
				this.addChild(tile)
			}
		}
		
		removeSignalHandlers() {
			board.detachAll()
		}
	
		playMoveSound() {
			if (this.moveSound) this.moveSound.play()
		}
	
		onBoardChanged(index, value) {
			let row = Math.floor(index / board.size),
				col = index % board.size
			this.board[value].setPosition(row, col)
		}
		
		onBoardSizeChanged(size) {
			this.initBoard()
		}
		
		// callback to call after resources loaded
		setup() {
			// sound
			if (resources['moveSound']) this.moveSound = resources['moveSound'].sound
			
			this.initBoard()
			this.addSignalHandlers()
		}
	}
	
	return PuzzleBoard
})