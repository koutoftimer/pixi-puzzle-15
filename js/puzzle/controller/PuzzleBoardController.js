define('puzzle/controller/PuzzleBoardController', ['hammer', 'puzzle/data/Board'], (Hammer, board) => {
	
	const DIRECTIONS = { 
		get up()    { return 'UP' }, 
		get right() { return 'RIGHT' }, 
		get down()  { return 'DOWN' },
		get left()  { return 'LEFT' }, 
	}
	
	class PuzzleBoardController {
		
		get showWinScreen() {
			for (let i = 0; i < board.size * board.size; ++i)
				if (board.get(i) != i) return false
			return true
		}
		
		constructor(conf) {
			this.swipeManager = null
			this.view = conf['view']
			this.winCallback = conf['winCallback']
		}
		
		swapTiles(x1, y1, x2, y2) {
			board.swap(x1 + y1 * board.size, x2 + y2 * board.size)
			if (this.showWinScreen) this.winCallback()
		}
		
		moveEmptyTile(direction) {
			this.view.playMoveSound()
			
			let emptyIndex = board.empty,
				x = emptyIndex % board.size,
				y = Math.floor(emptyIndex / board.size)
			if (direction == DIRECTIONS.left) {
				if (x == 0) return;
				this.swapTiles(x, y, x-1, y)
			} else if (direction == DIRECTIONS.up) {
				if (y == 0) return;
				this.swapTiles(x, y, x, y-1)
			} else if (direction == DIRECTIONS.right) {
				if (x == board.size-1) return;
				this.swapTiles(x, y, x+1, y)
			} else if (direction == DIRECTIONS.down) {
				if (y == board.size-1) return;
				this.swapTiles(x, y, x, y+1)
			}
		}
		
		_keyDownEventListener(e) {
			if (e.keyCode == 37) this.moveEmptyTile(DIRECTIONS.left)
			else if (e.keyCode == 38) this.moveEmptyTile(DIRECTIONS.up)
			else if (e.keyCode == 39) this.moveEmptyTile(DIRECTIONS.right)
			else if (e.keyCode == 40) this.moveEmptyTile(DIRECTIONS.down)
		}
		
		addEventHandlers() {
			// keyboard handlers
			document.addEventListener('keydown', this._keyDownEventListener.bind(this))
			
			// touch handlers
			if (this.swipeManager === null) {
				this.swipeManager = new Hammer.Manager(this.view.scene.application.view.parentElement)
				this.swipeManager.add(new Hammer.Swipe())
				this.swipeManager.on('swipeleft', (e) => { this.moveEmptyTile(DIRECTIONS.left) })
				this.swipeManager.on('swiperight', (e) => { this.moveEmptyTile(DIRECTIONS.right) })
				this.swipeManager.on('swipeup', (e) => { this.moveEmptyTile(DIRECTIONS.up) })
				this.swipeManager.on('swipedown', (e) => { this.moveEmptyTile(DIRECTIONS.down) })
			} else {
				this.swipeManager.get('swipe').set({ enable: true })
			}
		}
		
		removeEventHandlers() {
			document.removeEventListener('keydown', this._keyDownEventListener)
			if (this.swipeManager !== null)
				this.swipeManager.get('swipe').set({ enable: false })
		}
	}
	
	return PuzzleBoardController
})