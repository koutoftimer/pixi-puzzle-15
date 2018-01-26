define('puzzle/PuzzleMenu', ['pixi', 'puzzle/PuzzleButton', 'puzzle/data/Board'], (PIXI, PuzzleButton, board) => {
	const Container = PIXI.Container,
		Graphics = PIXI.Graphics,
		Point = PIXI.Point,
		Rectangle = PIXI.Rectangle,
		resources = PIXI.loader.resources,
		Sprite = PIXI.Sprite,
		Text = PIXI.Text,
		Texture = PIXI.Texture
		
	class PuzzleMenu extends Container {
		constructor() {
			super()
			
			this.menuWidth = 900
			this.menuHeight = 100
			
			let mixButton = new PuzzleButton({ text: 'Mix puzzle' })
			mixButton.x = (this.menuWidth / 2 - mixButton.width) / 2
			mixButton.y = (this.menuHeight - mixButton.height) / 2
			mixButton.callback = (e) => board.mix()
			this.addChild(mixButton)
			
			let changeSizeButton = new PuzzleButton({ text: 'Set size' })
			changeSizeButton.x = this.menuWidth * 3 / 4 - mixButton.width / 2
			changeSizeButton.y = (this.menuHeight - mixButton.height) / 2
			changeSizeButton.callback = this.onChangeSizeButton.bind(this)
			this.addChild(changeSizeButton)
		}
		
		onChangeSizeButton() {
			// obtain new size
			let boardSize = prompt('Insert size of the board as an integer: ')
			while (!boardSize || isNaN(parseInt(boardSize)))
				boardSize = prompt('Error: insert size of the board as an integer')
			boardSize = parseInt(boardSize)
			
			board.size = boardSize
		}
	}
	
	return PuzzleMenu
})