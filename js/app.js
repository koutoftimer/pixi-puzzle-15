define('app', ['pixi', 'hammer', 'puzzle/PuzzleBoard'], (PIXI, Hammer, puzzle) => {
	return () => {
		//Aliases
		const Application = PIXI.Application,
			loader = PIXI.loader,
			resources = PIXI.loader.resources,
			Sprite = PIXI.Sprite,
			Text = PIXI.Text,
			TextStyle = PIXI.TextStyle,
			Rectangle = PIXI.Rectangle,
			Container = PIXI.Container,
			TextureCache = PIXI.utils.TextureCache,
			Texture = PIXI.Texture,
			Point = PIXI.Point
			
		let options = {
			width: 800, 
			height: 600,
			antialias: true,
			transparent: false,
			resolution: 1
		}
		let app = new Application(options),
			WIDTH = 920,
			HEIGHT = 1020
		app.renderer.view.style.position = 'absolute'
		app.renderer.view.style.display = 'block'
		// app.renderer.autoResize = true
		// app.renderer.resize(window.innerWidth, window.innerHeight)
		app.renderer.resize(WIDTH, HEIGHT)
		app.renderer.backgroundColor = 0x061639
		document.getElementById('game').appendChild(app.view)
		
		loader.add([
			// { name: 'flower', url: 'img/Hydrangeas.jpg' }
			{ name: 'flower', url: 'img/numbers.png' }
		])
			.on('progress', (loader, resource) => {
				// console.log('loading: ' + resource.url)
				// console.log('progress: ' + loader.progress)
			})
			.load(() => {
				let partsAmount = 3,
					tiles = new Array(partsAmount),
					emptyTile = new Point(2, 2)
				for (let i = 0; i < partsAmount; ++i) tiles[i] = new Array(partsAmount)
				
				let DIRECTIONS = { 
						get up()    { return 1 }, 
						get right() { return 2 }, 
						get down()  { return 3 },
						get left()  { return 4 }, 
					},
					swap = (x1, y1, x2, y2) => {
							// get sprites
							let s1 = tiles[y1][x1], 
								s2 = tiles[y2][x2]
								
							// swap tiles in array
							tiles[y1][x1] = s2, tiles[y2][x2] = s1
							
							// swap sprite pops
							let tx = s1.x, ty = s1.y
							s1.x = s2.x, s2.x = tx
							s1.y = s2.y, s2.y = ty
						}
					moveEmptyTile = (direction) => {
						if (direction == DIRECTIONS.left) {
							if (emptyTile.x == 0) return;
							let x1 = emptyTile.x, 
								y1 = emptyTile.y, 
								x2 = --emptyTile.x, 
								y2 = emptyTile.y
							swap(x1, y1, x2, y2)
						} else if (direction == DIRECTIONS.up) {
							if (emptyTile.y == 0) return;
							let x1 = emptyTile.x, 
								y1 = emptyTile.y, 
								x2 = emptyTile.x, 
								y2 = --emptyTile.y
							swap(x1, y1, x2, y2)
						} else if (direction == DIRECTIONS.right) {
							if (emptyTile.x == 2) return;
							let x1 = emptyTile.x, 
								y1 = emptyTile.y, 
								x2 = ++emptyTile.x, 
								y2 = emptyTile.y
							swap(x1, y1, x2, y2)
						} else if (direction == DIRECTIONS.down) {
							if (emptyTile.y == 2) return;
							let x1 = emptyTile.x, 
								y1 = emptyTile.y, 
								x2 = emptyTile.x, 
								y2 = ++emptyTile.y
							swap(x1, y1, x2, y2)
						}
					}
				
				// keyboard handlers
				document.addEventListener('keydown', (e) => {
					if (e.keyCode == 37) moveEmptyTile(DIRECTIONS.left)
					else if (e.keyCode == 38) moveEmptyTile(DIRECTIONS.up)
					else if (e.keyCode == 39) moveEmptyTile(DIRECTIONS.right)
					else if (e.keyCode == 40) moveEmptyTile(DIRECTIONS.down)
				})
				
				// touch handlers
				let swipeManager = new Hammer.Manager(document.getElementById('game'))
				swipeManager.add(new Hammer.Swipe())
				swipeManager.on('swipeleft', (e) => { moveEmptyTile(DIRECTIONS.left) })
				swipeManager.on('swiperight', (e) => { moveEmptyTile(DIRECTIONS.right) })
				swipeManager.on('swipeup', (e) => { moveEmptyTile(DIRECTIONS.up) })
				swipeManager.on('swipedown', (e) => { moveEmptyTile(DIRECTIONS.down) })
				
				// handle "shuffle" button
				// function getRandomInt(min, max) {
				    // min = Math.ceil(min);
				    // max = Math.floor(max);
				    // return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
				// }
				// let shuffle = (e) => {
					// let directions = [
						// DIRECTIONS.left, 
						// DIRECTIONS.up, 
						// DIRECTIONS.right, 
						// DIRECTIONS.down
					// ]
					// for (let i = 0; i < 100; ++i) {
						// moveEmptyTile(directions[getRandomInt(0, 3)])
					// }
				// }
				// let shuffleManager = new Hammer.Manager(document.getElementById('shuffle'))
				// shuffleManager.add(new Hammer.Tap())
				// shuffleManager.on('tap', shuffle)
				
				// make sprites
				let flower = resources.flower.texture,
					puzzleBoard = new Container()
				
				puzzleBoard.width = flower.width
				puzzleBoard.height = flower.height
				puzzleBoard.backgroundColor = 0xFFFFFF
				puzzleBoard.position.set(10, 10)
				app.stage.addChild(puzzleBoard)
				
				let partWidth = flower.width / partsAmount,
					partHeight = flower.height / partsAmount
				
				for (let row = 0; row < partsAmount; ++row) {
					for (let col = 0; col < partsAmount; ++col) {
						let partTexture = row != emptyTile.y || col != emptyTile.x
							? new Texture(flower, new Rectangle(col*partWidth, row*partHeight, partWidth, partHeight))
							: Texture.WHITE
						let sprite = new Sprite(partTexture)
						sprite.position.set(partWidth*col, partHeight*row)
						sprite.width = partWidth
						sprite.height = partHeight
						tiles[row][col] = sprite
						puzzleBoard.addChild(sprite)
					}
				}
				// texture.frame = new Rectangle(300, 180, 500, 500)
				// sprite = new Sprite(resources.background.texture)
				// sprite.width = sprite.height = 200
				// sprite.anchor.set(anchor, anchor)
				// sprite.position.set(200, 200)
				
				// app.ticker.add(delta => { sprite.x += 1 })
				// app.stage.addChild(sprite)
			})
		
	}
})