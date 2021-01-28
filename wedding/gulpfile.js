'use strict';
const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify-es').default,
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    iconFont = require('gulp-iconfont'),
    iconFontCss = require('gulp-iconfont-css');

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}

async function iconfont() {
    return src('app/icons/*.svg')
        .pipe(iconFontCss({
            // где будет наш scss файл
            targetPath: '../scss/_icons.scss',
            // пути подлючения шрифтов в _icons.scss
            fontPath: '../fonts/',
            fontName: 'icons'

        }))
        .pipe(iconFont({
            fontName: 'icons',
            formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
            normalize: true,
            fontHeight: 1001
        }))
        .pipe(dest('app/fonts/'));
}

function images() {
    return src('app/images/**/*')
        // .pipe(imagemin(
        //     [
        //         imagemin.gifsicle({ interlaced: true }),
        //         imagemin.mozjpeg({ quality: 75, progressive: true }),
        //         imagemin.optipng({ optimizationLevel: 5 }),
        //         imagemin.svgo({
        //             plugins: [
        //                 { removeViewBox: true },
        //                 { cleanupIDs: false }
        //             ]
        //         })
        //     ]
        // ))
        .pipe(dest('dist/images'))
}

function cleanDist() {
    return del('dist')
}

function styles() {
    return src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/aos/dist/aos.css',
        'app/css/swiper-bundle.min.css',
        'app/scss/**/*.scss'
    ])
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 6 version'],
            grid: true
        }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function scripts() {
    return src([
        'node_modules/aos/dist/aos.js',
        'app/js/swiper-bundle.min.js',
        'app/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

function build() {
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

function watching() {
    watch(['app/scss/**/*.scss'], styles).on('change', browserSync.reload);
    watch(['app/js/**/*.js', '!app/js/main.min.js'], scripts);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;
exports.iconfont = iconfont;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, browsersync, watching)
