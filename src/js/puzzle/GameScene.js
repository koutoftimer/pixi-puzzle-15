define('puzzle/GameScene', [
	'pixi', 
	'puzzle/BaseScene', 
	'puzzle/PuzzleBoard', 
	'puzzle/PuzzleMenu',
	'puzzle/data/Board', 
	'puzzle/controller/PuzzleBoardController'
], (PIXI, BaseScene, PuzzleBoard, PuzzleMenu, board, PuzzleBoardController) => {
	const loader = PIXI.loader,
		resources = PIXI.loader.resources,
		Text = PIXI.Text
	
	class GameScene extends BaseScene {
		
		constructor(conf) {
			super(conf)
			
			this.board = new PuzzleBoard({
				scene: this, 
				boardSize: board.size
			})
			this.addChild(this.board)
			
			this.boardController = new PuzzleBoardController({ 
				view: this.board,
				winCallback: this.showWinScene.bind(this)
			})
			
			this.addChild(new PuzzleMenu())
		}
		
		hide() {
			this.boardController.removeEventHandlers()
			super.hide()
		}
		
		loadResources() {
			return super.loadResources()
				.then(this.setup.bind(this))
		}

		setup() {
			this.board.setup()
			board.mix()
		}
		
		show() {
			super.show()
			this.boardController.addEventHandlers()
		}
		
		showWinScene() {
			this.application.showWinScene()
		}
	}
	
	return GameScene
})