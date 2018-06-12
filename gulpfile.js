const gulp = require("gulp");
const sass = require("gulp-sass");
const autoprefix = require("gulp-autoprefixer");
const useref = require("gulp-useref");
const uglify = require("gulp-uglify");
const cssnano = require("gulp-cssnano");
const gulpIf = require("gulp-if");
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const cachebust = require("gulp-cache-bust");
const del = require("del");

const paths = {
	root: {
		src: "app/",
		prod: "dist/"
	},
	styles: {
		scss: "app/assets/scss/*.scss",
		dest: "app/assets/css/",
		css: "app/assets/css/*.css",
		prod: "dist/assets/css/"
	},
	scripts: {
		src: "app/assets/js/*.js",
		prod: "dist/assets/js/"
	},
	masks: {
		js: "*.js",
		css: "*.css"
	},
	images: {
		src: "app/assets/img/**/*.+(png|jpg|jpeg|gif|svg)",
		prod: "dist/assets/img/",
		css_src: "app/assets/css/img/**/*.+(png|jpg|jpeg|gif|svg)",
		css_prod: "dist/assets/css/img/"
	},
	html: {
		src: "app/**/*.html",
		prod: "dist/",
		prod_html: "dist/**/*.html"
	}
};

const sassy = () => {
	return gulp
		.src(paths.styles.scss)
		.pipe(sass())
		.pipe(autoprefix())
		.pipe(cssnano())
		.pipe(gulp.dest(paths.styles.prod));
};
sassy.description = "compile, autoprefix and compress that sass!";
gulp.task(sassy);

const scripts = () => {
	return gulp
		.src(paths.scripts.src)
		.pipe(uglify())
		.pipe(gulp.dest(paths.scripts.prod));
};
scripts.description = "copy, compress javascript!";
gulp.task(scripts);

const copyHtml = () => {
	return gulp
		.src(paths.html.src)
		.pipe(useref())
		.pipe(gulpIf(paths.masks.js, uglify()))
		.pipe(gulpIf(paths.masks.css, cssnano()))
		.pipe(gulp.dest(paths.html.prod));
};
copyHtml.description = "copy html, concat & compress javascript and css";
gulp.task(copyHtml);

const minImages = () => {
	return gulp
		.src(paths.images.src)
		.pipe(cache(imagemin()))
		.pipe(gulp.dest(paths.images.prod));
};
minImages.description = "minify images";
gulp.task(minImages);

const minCSSImages = () => {
	return gulp
		.src(paths.images.css_src)
		.pipe(cache(imagemin()))
		.pipe(gulp.dest(paths.images.css_prod));
};
minCSSImages.description = "minify css images";
gulp.task(minCSSImages);

const cacheBuster = () => {
	return gulp
		.src(paths.html.prod_html)
		.pipe(cachebust({}))
		.pipe(gulp.dest(paths.html.prod));
};
cacheBuster.description = "add cache buster args to html";
gulp.task(cacheBuster);

const clean = () => {
	return del([paths.root.prod]);
};
clean.description = "clean the dist folder";
gulp.task(clean);

const build = gulp.series(
	clean,
	sassy,
	scripts,
	copyHtml,
	minImages,
	minCSSImages,
	cacheBuster
);
gulp.task("build", build);
