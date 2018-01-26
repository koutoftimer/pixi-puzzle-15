define('puzzle/BaseScene', ['pixi'], (PIXI) => {
	const Container = PIXI.Container,
		loader = PIXI.loader
	
	class BaseScene extends Container {
		
		get resources() {
			return this.children
				.map((child) => child.resources || [])
				.reduce((a, c) => a.concat(c), [])
				.concat(this._resources || [])
				.filter((resource) => {
					let name = typeof(resource) === 'string' ? resource : resource.name
					return !loader.resources[name]
				})
		}
		
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
			return new Promise((resolve, reject) => { 
				let resources = this.resources
				resources.length == 0
					? resolve(null, null)
					: loader.add(resources).load((loader, resources) => {
						resolve(loader, resources)
					})
			})
		}
	}
	
	return BaseScene
})