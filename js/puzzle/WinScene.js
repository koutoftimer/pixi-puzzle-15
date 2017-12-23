define('puzzle/WinScene', ['pixi', 'pixi-sound', 'puzzle/BaseScene', 'puzzle/GameScene'], (PIXI, pixiSound, BaseScene, GameScene) => {
	const loader = PIXI.loader,
		resources = loader.resources,
		sound = PIXI.sound,
		Text = PIXI.Text
	
	class WinScene extends BaseScene {
		constructor(conf) {
			super(conf)
			
			// text to display in the middle of the scene
			this.winText = conf['text'] || 'Victory'
						
			this.textSprite = new Text(this.winText, {
				fill: 'white',
				fontSize: '100px',
				align: 'center'
			})
			
			this.width = 900
			this.height = 1000
			
			this.textSprite.x = (this.application.renderer.width - this.textSprite.width) / 2
			this.textSprite.y = (this.application.renderer.height - this.textSprite.height) / 2
			
			this.addChild(this.textSprite)
			
			
			this.backButton = this.textSprite = new Text('<< back', {
				fill: 'white',
				fontSize: '100px',
				align: 'center'
			})
			this.backButton.interactive = true
			this.backButton.button = true
			this.backButton.position.set(10, 10)
			this.backButton.on('click', this.backToGame.bind(this))
			this.backButton.on('tap', this.backToGame.bind(this))
			
			this.addChild(this.backButton)
			
			this.sound = null
			this.playWonSound()
		}
		
		backToGame() {
			sound.stopAll()
			this.application.changeScene(new GameScene({ application: this.application }))
		}
		
		playWonSound() {
			let self = this
			if (resources['winSound']) {
				self.sound = resources['winSound']
				self.sound.play()
			} else {
				loader.add('winSound', 'ogg/win.ogg')
					.load((loader, resources) => {
						self.sound = resources['winSound'].sound
						self.sound.play()
					})
			}
		}
	}
	
	return WinScene
})