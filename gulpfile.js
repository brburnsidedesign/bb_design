var gulp  			=		require('gulp'),
		$  					=		require('gulp-load-plugins') (),
		del					=		require('del'),
		clean				=		require('gulp-clean'),
		sass				=		require('gulp-sass'),
		cssnano 		= 	require('gulp-cssnano'),
		rename      = 	require('gulp-rename'),
		minifyCSS 	= 	require('gulp-minify-css'),
		minify 			= 	require('gulp-minify'),
		concat			=		require('gulp-concat'),
		gulpIf 			= 	require('gulp-if'),
		uglify 			= 	require('gulp-uglify'),
		sourcemaps	=  	require('gulp-sourcemaps'),
		cleanHtml		=		require('gulp-minify-html'),
		imagemin 		= 	require('gulp-imagemin'),
		gutil				=		require('gulp-util'),
		svgmin			=		require('gulp-svgmin'),
		browserSync =		require('browser-sync'),
		useref			=		require('gulp-useref');


//clean up/remove build folder and rebuild files
gulp.task('clean:build', function() {
  return del.sync('./build');
});

gulp.task('sass', function() {
    gulp.src('app/styles/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('app/styles/css/'))
			.pipe(browserSync.reload({stream:true}));
});

gulp.task('build-css', function() {
	return gulp.src([
		'app/styles/css/styles.css',
		'app/styles/css/media_queries.css',
		'app/styles/css/reset.css',
		'app/styles/css/animate.css',
	])
		.pipe(minifyCSS())
		.pipe(concat('app.min.css'))
		.pipe(gulp.dest('build/styles/css'));
});

gulp.task('build-js', function() {
	return gulp.src([
		'app/js/app.module.js',
		'app/js/MainCtrl.js',
	])
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(uglify({mangle:false}))
		.pipe(concat('app.min.js'))
	 	.pipe(sourcemaps.write('./sourcemaps'))
	 	.pipe(gulp.dest('build/js'));
	});

gulp.task('useref', function() {
	return gulp.src('app/index.prebuild.html')
  .pipe(useref())
	.pipe(gulpIf(['build/libs/*.js'], uglify()))
	.pipe(gulp.dest('build'));
});

gulp.task('build-html', function(){
  var opts = {
    conditionals: true,
    spare: true
  };

  return gulp.src([
		'app/views/**/*.html',
		'app/views/**/**/*.html',
	])
    .pipe(cleanHtml(opts))
    .pipe(gulp.dest('./build/views'));
});

gulp.task('images', function() {
    return gulp.src('app/assets/img/*')
    .pipe(imagemin({ progressive: true }))
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('svg-min', function () {
    return gulp.src('app/assets/img/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build/assets/img'));
});

gulp.task('browserSync', function() {
	var files = [
		'./app/**/*.css',
		'./app/**/*.js',
		'./app/**/*.scss',
		'./app/views/**/*.html',
		'./app/layout/*.html',
		'./app/index.html',
	];

	browserSync.init(files, {
		server: {
			baseDir: "./",
			index: 'app/index.debug.html'
		},
	});

});

gulp.task('bs-production', function() {
	browserSync.create().init( {
		server: {
			baseDir: "./",
			index: 'index.html'
		},
	});
});

gulp.task('test', ['clean:build', 'sass', 'build-js', 'build-css', 'build-html', 'useref', 'browserSync']);

gulp.task('default', ['clean:build', 'sass', 'build-js', 'build-css', 'build-html', 'images', 'svg-min', 'useref', 'browserSync'], function() {

		gulp.watch('app/styles/sass/*.scss',['sass']);
		gulp.watch('app/img/*',['images']);
		gulp.watch([
			"app/styles/css/*.css",
			"app/views/**/*.html",
			"app/views/**/**/*.html"
		]).on("change", browserSync.reload);

		return gulp.src('build/index.prebuild.html', {read: false})
		.pipe(clean());
});
