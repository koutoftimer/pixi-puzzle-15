define('app', ['puzzle/App'], (PuzzleApp) => {
	return () => {
		let app = new PuzzleApp()
		document.getElementById('game').appendChild(app.view)
	}
})