(function (r) {
    "use strict";

var gulp 					= r('gulp'),
		htmlInjector 		= r('bs-html-injector'),
  	plumber 				= r('gulp-plumber'),
  	webserver 			= r('gulp-webserver'),
  	ngAnnotate 			= r('gulp-ng-annotate'),
  	angularFilesort = r('gulp-angular-filesort'),
  	sass 						= r('gulp-sass'),
  	inject 					= r('gulp-inject'),
  	del 						= r('del'),
		imagemin				= r('gulp-imagemin'),
		uglify					=	r('gulp-uglify'),
		concat 					= r('gulp-concat'),
		nodemon					=	r('gulp-nodemon'),
		browserSync 		= r('browser-sync').create(),
		reload 					= browserSync.reload;


var paths = {
    build : 'build/',
    buildImgs: 'build/assets/img/',
		buildFonts: 'build/assets/fonts/',
    buildStyles: 'build/styles/',
    buildApp: 'build/app/',
    buildIndex: 'build/index.html',
		buildVendor: 'build/vendor/',

		index: 'src/index.html',
    markupSrc: 'src/app/**/*.html',
    imgSrc:'src/assets/img/*',
		fontsSrc: 'src/assets/fonts/*',
    styleSrc: 'src/styles/**/*.css',
		styleSrcSass: 'src/styles/**/*.scss',
		vendorFiles: 'src/vendors/*',
    appSrc: ['src/app/*/*.js', '!src/index.html'],
};

	gulp.task('default', ['watch', 'sass', 'browser-sync', 'nodemon']);

	gulp.task('watch', ['serve'], function () {
	    gulp.watch(paths.markupSrc, ['copyFiles']);
	    gulp.watch(paths.styleSrc, ['copyFiles']);
	    gulp.watch(paths.appSrc, ['copyFiles']);
			gulp.watch(paths.vendorFiles, ['copyFiles']);
	    gulp.watch(paths.index, ['copyFiles']);
			gulp.watch('src/styles/sass/*.scss', ['sass']);
	});

	gulp.task('serve', ['copyFiles'], function() {
	   return gulp.src(paths.build)
	    .pipe(webserver({
	        livereload: true,
	        proxies: [{
	            source: '/api',
	            target: 'http://localhost:1337'
	        }]
	    }));
	});

//clean up/remove build folder and rebuild files
gulp.task('clean', function() {
  return del.sync('build/');
});


//BUILD STYLES
gulp.task('sass', function() {
    gulp.src('src/styles/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('src/styles/css/'))
			.pipe(reload({stream:true}));
});

gulp.task('copyFiles', function () {

    var appFiles = gulp.src(paths.appSrc)
        .pipe(angularFilesort())
        .pipe(ngAnnotate())
				.pipe(uglify())
				.pipe(concat('app.min.js'))
        .pipe(gulp.dest(paths.buildApp));

    var appStyles = gulp.src('src/styles/css/*.css')
        .pipe(sass.sync({
            outputStyle: 'compressed',
            errLogToConsole: true
        }))
        .pipe(gulp.dest(paths.buildStyles));

    var appImgs = gulp.src(paths.imgSrc)
        .pipe(gulp.dest(paths.buildImgs));

		var appFonts = gulp.src(paths.fontsSrc)
        .pipe(gulp.dest(paths.buildFonts));

		var appVendors = gulp.src(paths.vendorFiles)
		    .pipe(gulp.dest(paths.buildVendor));

    var appMarkup = gulp.src(paths.markupSrc)
        .pipe(gulp.dest(paths.buildApp));

    return gulp.src(paths.index)
        .pipe(plumber())
        .pipe(gulp.dest(paths.build))
        .pipe(inject(appMarkup, {
            relative: true
        }))
        .pipe(inject(appImgs, {
            relative: true
        }))
				.pipe(inject(appVendors, {
						relative: true,
						name: 'vendorInject'
				}))
        .pipe(inject(appStyles, {
            relative: true,
            name: 'stylesInject'
        }))
        .pipe(inject(appFiles, {
            relative: true
        }))
        .pipe(gulp.dest(paths.build));
});


gulp.task('svg-min', function () {
    return gulp.src('src/assets/img/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('build/assets/img'));
});

//IMAGES
gulp.task('images', function() {
    return gulp.src('src/assets/img/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(imagemin({
			interlaced: true
		}))
    .pipe(gulp.dest('build/assets/img'));
});

gulp.task('browser-sync', ['nodemon'], function() {
	browserSync.init({
	 proxy: "localhost:8000",  // local node app address
	 port: 3000,  // use *different* port than above
	 notify: true
 	});
});

gulp.task('nodemon', function (cb) {
		var callbackCalled = false;
		return nodemon({script: './server.js'}).on('start', function () {
				if (!callbackCalled) {
						callbackCalled = true;
						cb();
				}
		});
});

}(require));
