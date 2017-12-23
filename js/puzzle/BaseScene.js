define('puzzle/BaseScene', ['pixi'], (PIXI) => {
	const Container = PIXI.Container
	
	class BaseScene extends Container {
		// define properties
		constructor(conf) {
			super()
			
			this.application = conf['application']
			this.visible = false
			this.application.stage.addChild(this)
		}
		show() {
			this.visible = true
		}
		
		hide() {
			this.visible = false
		}
				
		loadResources() {
			return new Promise((resolve, reject) => { resolve() })
		}
	}
	
	return BaseScene
})