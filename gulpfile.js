var gulp = require('gulp'),
	rjs = require('gulp-requirejs');

gulp.task('default', ['copy']);

gulp.task('copy', function () {
	return gulp
		.src([
			'./node_modules/pixi.js/dist/pixi.min.{js,js.map}',
			'./node_modules/pixi-sound/dist/pixi-sound.{js,js.map}',
			'./node_modules/hammerjs/hammer.min.{js,js.map}',
			'./node_modules/mini-signals/browser.js',
			'./node_modules/requirejs/require.js',
		])
		.pipe(gulp.dest('./src/js/lib/')); // pipe it to the output DIR
});

gulp.task('build', function () {
	return gulp
		.src([
			'./src/**/*.html',
			'./src/main.js',
			'./src/**/*.ogg',
			'./src/**/**/*.{js,js.map}',
		])
		.pipe(gulp.dest('./build/'))
});