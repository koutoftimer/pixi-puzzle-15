define('puzzle/data/Board', ['mini-signals'], (MiniSignal) => {
	
	class Board {
		
		constructor() {
			let size = parseInt(localStorage.getItem('boardSize'))
			this._size = !isNaN(size) ? size : this.defaults.size
			
			this._board = null
			this.initBoard()
			
			this.boardSizeChanged = new MiniSignal()
			this.boardChanged = new MiniSignal()
		}
		
		get defaults() {
			size: 3
		}
		
		// retrieve index of the empty puzzle
		get empty() {
			return this._board.indexOf(this.size * this.size - 1)
		}
		
		// getter/setter for board size
		get size() { return this._size }
		set size(value) { 
			this._size = value
			localStorage.setItem('boardSize', this._size)
			this.initBoard()
			this.boardSizeChanged.dispatch(this._size)
		}
		
		// gettter/setter for puzzles on the board
		get(index) { 
			if (index < 0 || index >= this.size * this.size)
				throw new RangError()
			return this._board[index]
		}
		set(index, value) {
			if (value < 0 || value >= this.size * this.size || index < 0 || index >= this.size * this.size) 
				throw new RangError()
			this._board[index] = value
			this.boardChanged.dispatch(index, value)
		}
		
		swap(index1, index2) {
			if (index1 < 0 || index1 >= this.size * this.size || index2 < 0 || index2 >= this.size * this.size)
				throw new RangError()
			let tmp = this._board[index1]
			this.set(index1, this._board[index2])
			this.set(index2, tmp)
		}
		
		initBoard() {
			this._board = new Array(this.size * this.size)
			for (let i = 0; i < this._board.length; ++i) this._board[i] = i
		}
		
		mix() {
			let posit = this._board,
				hgh = this.size,
				wid = this.size,
				siz = hgh * wid - 1,
				blnkx = this.size - 1,
				blnky = this.size - 1
			
			mix()
			
			for (let i = 0; i < this.size * this.size; ++i)
				this.boardChanged.dispatch(i, this._board[i])
			
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
	}
	
	return new Board()
})