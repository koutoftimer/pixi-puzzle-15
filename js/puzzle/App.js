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
			
			let nextScene = new GameScene({ application: this })
			nextScene.loadResources()
				.then(() => this.resourcesLoaded(nextScene))
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