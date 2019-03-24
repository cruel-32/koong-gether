const { src, dest, series, parallel, watch, lastRun } = require('gulp');
const 
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csscomb = require('gulp-csscomb'),
    cssmin = require('gulp-cssmin'),
    browsersync = require("browser-sync").create(),
    origin = "scss",
    project = "./";

const css = () => src([`${origin}/*.{scss,sass}`], {since: lastRun(css)})
    .pipe(sass.sync().on('error', sass.logError))
    // .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(csscomb({
        configPath: 'hint/.csscomb.json'
    }))
    .pipe(cssmin())
    .pipe(dest(`${project}`))
    .pipe(browsersync.stream());;


const browserSyncInit = (done)=>{
    browsersync.init({
        index:'쿵실이 - 트게더.html',
        server: {
            baseDir: `./`,
        },
        port: 7777
    },(err,bs)=>{
        // console.log('err : ', err);
        // console.log('server : ', bs.options.get('server'));
        // console.log('urls : ', bs.options.get('urls'));
    });
    done();
}

const watcher = () => {
    watch([`${origin}/*.{scss,sass.css}`], css).on('change', browsersync.reload);
}

exports.default = series(css, parallel(browserSyncInit, watcher) );