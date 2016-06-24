var gulp  						=		require('gulp'),
		del								=		require('del'),
		lodash						=		require('lodash'),
		clean							=		require('gulp-clean'),
		sass							=		require('gulp-sass'),
		cleanCSS 					= 	require('gulp-clean-css'),
		concat						=		require('gulp-concat'),
		uglify 						= 	require('gulp-uglify'),
		replace						=		require('gulp-replace'),
		cleanHtml					=		require('gulp-minify-html'),
		imagemin 					= 	require('gulp-imagemin'),
		gutil							=		require('gulp-util'),
		svgmin						=		require('gulp-svgmin'),
		browserSync 			=		require('browser-sync'),
		useref						=		require('gulp-useref'),
		htmlInjector 			= 	require('bs-html-injector'),
		watch							=		require('gulp-watch'),
		reload						=		browserSync.reload;


		var htmlFiles = [
			'./app/**/*.css',
			'./app/**/*.js',
			'./app/**/*.scss',
			'./app/views/**/*.html',
			'./app/views/**/**/*.html',
			'./app/views/**/**/**/*.html',
			'./app/index.debug.html',
			'./app/index.prebuild.html',
			'./index.html'
		];

		var stylesFiles = [
			'app/styles/css/reset.css',
			'app/styles/css/styles.css',
			'app/styles/css/media_queries.css',
			'app/styles/css/home.css',
			'app/styles/css/contact.css',
			'app/styles/css/shared.css',
			'app/styles/css/devices.css',
			'app/styles/css/clay.css',
			'app/styles/css/design.css',
			'app/styles/css/about.css',
			'app/styles/css/custom.css'
		];

		var buildStyles = [
			'build/styles/reset.css',
			'build/styles/styles.css',
			'build/styles/media_queries.css',
			'build/styles/home.css',
			'build/styles/contact.css',
			'build/styles/shared.css',
			'build/styles/devices.css',
			'build/styles/clay.css',
			'build/styles/design.css',
			'build/styles/about.css',
			'build/styles/custom.css'
		];

//clean up/remove build folder and rebuild files
gulp.task('clean:build', function() {
  return del.sync('./build');
});


//BUILD STYLES
gulp.task('sass', function() {
    gulp.src('app/styles/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('app/styles/css/'))
			.pipe(reload({stream:true}));
});

gulp.task('build-css', function() {
  return gulp.src(stylesFiles)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build/styles'))
		.pipe(reload({stream:true}));
});

//BUILD SCRIPTS
gulp.task('build-js', function() {
	return gulp.src([
		'app/js/app.module.js',
		'app/js/AppCtrl.js',
		'app/js/angular-smooth-scroll.js'
	])
		.pipe(uglify({mangle:false}))
		.pipe(concat('app.min.js'))
	 	.pipe(gulp.dest('build/js'))
		.pipe(reload({stream:true}));
	});

//BUILD HTML
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
    .pipe(gulp.dest('./build/views'))
		.pipe(reload({stream: true}));
});


//IMAGES
gulp.task('images', function() {
    return gulp.src('app/assets/img/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin({
			interlaced: true
		}))
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('svg-min', function () {
    return gulp.src('app/assets/img/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build/assets/img'));
});

gulp.task('useref', function() {
	return gulp.src('app/index.prebuild.html')
  .pipe(useref())
	.pipe(gulp.dest('build'));
});


// COPY FONTS FOLDER OVER TO BUILD FOLDER
gulp.task('copy-fonts', function() {
	return gulp.src('./fonts/*')
		.pipe(gulp.dest('build/fonts'));
});

//COPY JS FILES FROM APP TO BUILD
gulp.task('copy-js', function() {
	return gulp.src('app/js/*')
		.pipe(gulp.dest('build/js'));
});

//COPY INDEX FROM ROOT TO BUILD
gulp.task('copy-index', function() {
	return gulp.src('./index.html')
		.pipe(gulp.dest('build'));
});

gulp.task('watch', function() {
	return gulp.src([htmlFiles, './app/js/*.js'])
	.pipe(watch())
	.pipe(gulp.dest('build'));

});

//BROWSER SYNC DEV & PROD
gulp.task('browserSync', function() {

	browserSync.use(htmlInjector, {
		files: htmlFiles
	});

	browserSync.init(htmlFiles, {
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
			index: 'build/index.html',
		},
	});
});

gulp.task('watch', function() {
	gulp.watch(htmlFiles, ['build-html']);
	gulp.watch('./app/styles/css/*.css', ['build-css']);
	gulp.watch('./app/styles/sass/*.scss',['sass']);
	gulp.watch('./app/img/*.+(png|jpg|jpeg|gif|svg)',['images']);
});

gulp.task('default', ['clean:build', 'sass', 'build-js', 'build-css', 'build-html', 'images', 'svg-min', 'watch', 'useref', 'copy-index', 'copy-js', 'browserSync'], function() {

		return gulp.src(['./build/index.prebuild.html', 'build/styles/*.css'], {read: false})
		.pipe(clean());

});
