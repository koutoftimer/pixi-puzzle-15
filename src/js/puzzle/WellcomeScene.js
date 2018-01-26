define('puzzle/WellcomeScene', ['pixi', 'puzzle/BaseScene'], (PIXI, BaseScene) => {
	const Text = PIXI.Text
	
	class WellcomeScene extends BaseScene {
		constructor(conf) {
			super(conf)
			
			// text to display in the middle of the scene
			this.wellcomeText = conf['text']
						
			this.textSprite = new Text(this.wellcomeText, {
				fill: 'white',
				fontSize: '100px',
				align: 'center'
			})
			this.textSprite.x = (this.application.renderer.width - this.textSprite.width) / 2
			this.textSprite.y = (this.application.renderer.height - this.textSprite.height) / 2
			
			this.addChild(this.textSprite)
		}
	}
	
	return WellcomeScene
})