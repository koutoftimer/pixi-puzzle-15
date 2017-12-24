var gulp = require('gulp'),
    rjs = require('gulp-requirejs');
 
gulp.task('default', ['copy']);

gulp.task('copy', function() {
    return gulp
		.src([
			'./node_modules/pixi.js/dist/pixi.min.js',
			'./node_modules/pixi-sound/dist/pixi-sound.js',
			'./node_modules/hammerjs/hammer.min.js',
			'./node_modules/mini-signals/browser.js',
			'./node_modules/requirejs/require.js',
		])
		.pipe(gulp.dest('./js/lib/')); // pipe it to the output DIR
});