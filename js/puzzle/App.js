define('puzzle/App', ['pixi', 'puzzle/WellcomeScene', 'puzzle/GameScene', 'puzzle/WinScene'], (PIXI, WellcomeScene, GameScene, WinScene) => {
	const Application = PIXI.Application,
		Point = PIXI.Point,
		Sprite = PIXI.Sprite

	class PuzzleApplication extends Application {
		constructor(conf) {
			let width = conf && conf['width'] || 900,
				height = conf && conf['height'] || 1000

			super({
				antialias: true,
				transparent: false,
				resolution: 1,
				width: width,
				height: height
			})

			this.renderer.view.style.position = 'absolute'
			this.renderer.view.style.display = 'block'
			this.renderer.backgroundColor = 0x061639

			this.currentScene = new WellcomeScene({
				application: this,
				text: 'Loading..'
			})
			this.currentScene.show()

			window.addEventListener('resize', this.onWindowResize.bind(this))

			this.changeScene(new GameScene({ application: this }))
		}

		onWindowResize() {
			const ratio = Math.min(window.innerWidth / this._options.width, 
								   window.innerHeight / this._options.height),
				width = this._options.width * ratio,
				height = this._options.height * ratio
			this.stage.scale.x = this.stage.scale.y = ratio
			this.renderer.resize(width, height)
		}

		changeScene(nextScene) {
			nextScene.loadResources()
				.then(() => this.resourcesLoaded(nextScene))
		}

		resourcesLoaded(scene) {
			this.currentScene.hide()
			scene.show()
			this.currentScene = scene
		}

		showWinScene() {
			this.changeScene(new WinScene({ application: this }))
		}
	}

	return PuzzleApplication
})