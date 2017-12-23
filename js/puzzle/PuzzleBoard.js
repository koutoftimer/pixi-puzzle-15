define('puzzle/PuzzleBoard', ['pixi', 'hammer', 'puzzle/PuzzleTile'], (PIXI, Hammer, PuzzleTile) => {
	const Container = PIXI.Container,
		Graphics = PIXI.Graphics,
		Point = PIXI.Point,
		Rectangle = PIXI.Rectangle,
		resources = PIXI.loader.resources,
		Sprite = PIXI.Sprite,
		Text = PIXI.Text,
		Texture = PIXI.Texture
	
	const DIRECTIONS = { 
		get up()    { return 'UP' }, 
		get right() { return 'RIGHT' }, 
		get down()  { return 'DOWN' },
		get left()  { return 'LEFT' }, 
	}
	
	class PuzzleBoard extends Container {
		get resources() {
			return [
				// { name: 'numbers', url: 'img/numbers.png' },
				// { name: 'flower', url: 'img/Hydrangeas.jpg' }
			]
		}
		
		get tileWidth() { return this.boardWidth / this.boardSize }
		get tileHeight() { return this.boardHeight / this.boardSize }
		
		constructor(conf) { 
			super()
			
			this.scene = conf['scene']
			this.swipeManager = null
		
			// number of rows and columns in the puzzle
			this.boardSize = conf && conf['boardSize'] || 3
			
			this.boardWidth = 900
			this.boardHeight = 900
			this.backgroundColor = 0x709DFF
			
			// container for tiles of the puzzle
			this.board = new Array(this.boardSize)
			for (let i = 0; i < this.boardSize; ++i) this.board[i] = new Array(this.boardSize)
			
			// location of the empty tile on the board
			this.emptyTile = new Point(this.boardSize-1, this.boardSize-1)
			
			this.position.set(0, 100)
		}
		
		swapTiles(x1, y1, x2, y2) {
			// get sprites
			let s1 = this.board[y1][x1], s2 = this.board[y2][x2]
			// swap tiles in the board array
			this.board[y1][x1] = s2, this.board[y2][x2] = s1
			// swap sprite position
			s1.swap(s2)
		}
		
		moveEmptyTile(direction) {
			let emptyTile = this.emptyTile
			if (direction == DIRECTIONS.left) {
				if (emptyTile.x == 0) return;
				this.swapTiles(emptyTile.x, emptyTile.y, --emptyTile.x, emptyTile.y)
			} else if (direction == DIRECTIONS.up) {
				if (emptyTile.y == 0) return;
				this.swapTiles(emptyTile.x, emptyTile.y, emptyTile.x, --emptyTile.y)
			} else if (direction == DIRECTIONS.right) {
				if (emptyTile.x == this.boardSize-1) return;
				this.swapTiles(emptyTile.x, emptyTile.y, ++emptyTile.x, emptyTile.y)
			} else if (direction == DIRECTIONS.down) {
				if (emptyTile.y == this.boardSize-1) return;
				this.swapTiles(emptyTile.x, emptyTile.y, emptyTile.x, ++emptyTile.y)
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
				this.swipeManager = new Hammer.Manager(this.scene.application.view.parentElement)
				this.swipeManager.add(new Hammer.Swipe())
				this.swipeManager.on('swipeleft', (e) => { this.moveEmptyTile(DIRECTIONS.left) })
				this.swipeManager.on('swiperight', (e) => { this.moveEmptyTile(DIRECTIONS.right) })
				this.swipeManager.on('swipeup', (e) => { this.moveEmptyTile(DIRECTIONS.up) })
				this.swipeManager.on('swipedown', (e) => { this.moveEmptyTile(DIRECTIONS.down) })
			} else {
				this.swipeManager.get('swipe').set({ enable: true })
			}
		}
		
		mixTiles() {
			let posit = new Array(this.boardSize * this.boardSize),
				hgh = this.boardSize,
				wid = this.boardSize,
				siz = hgh * wid - 1,
				blnkx = this.boardSize - 1,
				blnky = this.boardSize - 1
			
			mix()
			
			let board = new Array(this.boardSize)
			for (let row = 0; row < this.boardSize; ++row)
				board[row] = new Array(this.boardSize)
			for (let row = 0; row < this.boardSize; ++row) {
				for (let col = 0; col < this.boardSize; ++col) {
					let tile = this.board[row][col]
					tile.initPosition()
					board[tile.row][tile.col] = tile
				}
			}
			this.emptyTile.set(this.boardSize-1, this.boardSize-1)
			this.board = board
			
			board = new Array(this.boardSize)
			for (let row = 0; row < this.boardSize; ++row) {
				board[row] = new Array(this.boardSize)
				for (let col = 0; col < this.boardSize; ++col)
				{
					let i = col + row * this.boardSize,
						col1 = posit[i] % this.boardSize,
						row1 = Math.floor(posit[i] / this.boardSize)
					board[row][col] = this.board[row1][col1]
					board[row][col].setPosition(row, col)
				}
			}
			this.board = board
			this.emptyTile.set(blnkx, blnky)
			
			// code fragment from:
			// https://www.jaapsch.net/puzzles/javascript/fifteenj.htm
			function mix() {
				var i, j, c = 0;
				
				var pcs = new Array();
				for (i = 0; i <= siz; i++) 
					pcs[i] = i;
				pcs[siz - 1] = -1;
				pcs[siz - 2] = -1;
				
				for (i = 0; i < hgh; i++) {
					for(j = 0; j < wid; j++) {
						let k = Math.floor(Math.random() * pcs.length);
						posit[c] = pcs[k];
						if (pcs[k] == siz) 
							blnkx = j, blnky = i;
						pcs[k] = pcs[pcs.length - 1];
						pcs.length--;
						c++;
					}
				}
				filltwo();
			}

			function filltwo() {
				//First fill in last two tiles.
				var s1 = -1;
				var s2 = -1;
				for (var i = 0; i <= siz; i++) {
					if (posit[i] == -1) {
						if (s1 < 0) {
							s1 = i;
							posit[s1] = siz - 1; // 14
						} else {
							s2 = i;
							posit[s2] = siz - 2; // 13
							break;
						}
					}
				}
				//check permutation parity
				var c = 0;
				for (var i = 1; i <= siz; i++) {
					for (var j = 0; j < i; j++) {
						if (posit[j] > posit[i]) c++;
					}
				}
				//Check position of blank space; move to bottom right
				c += (wid - 1) - blnkx + (hgh - 1) - blnky;

				//if parity odd then swap
				if (c & 1) {
					posit[s1] = siz - 2;
					posit[s2] = siz - 1;
				}
			}
		}
		
		removeEventHandlers() {
			document.removeEventListener('keydown', this._keyDownEventListener)
			if (this.swipeManager !== null)
				this.swipeManager.get('swipe').set({ enable: false })
		}
		
		// callback to call after resources loaded
		setup() {
			for (let row = 0; row < this.boardSize; ++row) {
				for (let col = 0; col < this.boardSize; ++col) {
					let partTexture = Texture.WHITE
					if (row != this.emptyTile.y || col != this.emptyTile.x) {
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
						text: (row * this.boardSize + col + 1).toString(),
						row: row,
						col: col
					})
					this.board[row][col] = tile
					this.addChild(tile)
				}
			}
		}
	}
	
	return PuzzleBoard
})