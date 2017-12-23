define('puzzle/GameScene', ['pixi', 'puzzle/BaseScene', 'puzzle/PuzzleBoard', 'puzzle/PuzzleMenu'], (PIXI, BaseScene, PuzzleBoard, PuzzleMenu) => {
	const loader = PIXI.loader,
		Text = PIXI.Text
	
	class GameScene extends BaseScene {
		constructor(conf) {
			super(conf)
			
			this.board = new PuzzleBoard({ scene: this, boardSize: 4 })
			this.addChild(this.board)
			
			this.menu = new PuzzleMenu({ mixCallback: this.board.mixTiles.bind(this.board) })
			this.addChild(this.menu)
		}
		
		hide() {
			this.board.removeEventHandlers()
			super.hide()
		}
		
		loadResources() {
			return new Promise((resolve, reject) => {
				let resourcesList = this.children
					.map((child) => child.resources || [])
					.reduce((a, c) => a.concat(c))
				
				if (resourcesList.length) {
					loader.add(resourcesList).load(() => {
						this.setup()
						resolve()
					})
				} else {
					this.setup()
					resolve()
				}
			})
		}

		setup() {
			this.board.setup()
		}
		
		show() {
			super.show()
			this.board.addEventHandlers()
		}
	}
	
	return GameScene
})