define('puzzle/PuzzleBoard', ['pixi', 'hammer'], () => {
	const Application = PIXI.Application,
		Point = PIXI.Point,
		Sprite = PIXI.Sprite
	
	class PuzzleTile {
		constructor() {
			// PIXI.Sprite instance
			this.sprite = null
			
			Object.assign(conf, this)
		}
	}
	
	class PuzzleBoard {
		constructor() { 
			// number of rows and columns in the puzzle
			this.boardSize = 3
			
			// container for tiles of the puzzle
			this.board = new Array(this.boardSize)
			for (let i = 0; i < this.boardSize; ++i) this.board[i] = new Array(this.boardSize)
			
			// location of the empty tile on the board
			this.emptyTile = null
		}
	}
	
	return PuzzleBoard
})