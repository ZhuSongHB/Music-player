/**
 *    gulp-uglify             js压缩 不支持es6语法
 *    gulp-strip-debug        去掉调试语句
 *    gulp-htmlclean          html压缩
 *    gulp-less               less编译
 *    gulp-clean-css          css压缩 
 *    gulp-imagemin           image压缩
 *    gulp-connect            服务器
 */
/**
 *          模块化开发
 *  1.渲染页面模块
 *  2.背景高斯模糊模块
 *  3.音乐模块
 *  4.索引控制模块
 *  5.列表切歌模块
 *  6.进度条模块
 *  7.整体模块  整合其他模块
 */
const { series, src, dest, watch } = require('gulp');
const htmlClean = require('gulp-htmlclean');
const less = require("gulp-less");
const cleanCss = require('gulp-clean-css');
const stripDebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');
const imgMin = require('gulp-imagemin');
const connect = require('gulp-connect')
const folder = {
    src: 'src/',
    dist: 'dist/'
}

function html() {
    return src(folder.src + 'html/*')
        .pipe(htmlClean())
        .pipe(dest(folder.dist + 'html/'))
        .pipe(connect.reload())     //重新渲染  (自动刷新页面)
}

function css() {
    return src(folder.src + 'css/*')
        .pipe(less())
        .pipe(cleanCss())
        .pipe(dest(folder.dist + 'css/'))
        .pipe(connect.reload())
}

function js() {
    return src(folder.src + 'js/*')
        // .pipe(stripDebug())
        // .pipe(uglify())
        .pipe(dest(folder.dist + 'js/'))
        .pipe(connect.reload())

}

function images() {
    return src(folder.src + 'images/*')
        .pipe(imgMin())
        .pipe(dest(folder.dist + 'images/'))
}

function server(cb) {
    connect.server({
        port: '1573',     //端口号
        livereload: true   //自动刷新
    })
    cb()
}

watch(folder.src + 'html/', {}, function (cb) {
    html();
    console.log('========================================================================================================');
    cb();
});
watch(folder.src + 'css/', {}, function (cb) {
    css();
    console.log('========================================================================================================');
    cb();
});
watch(folder.src + 'js/', {}, function (cb) {
    js();
    console.log('========================================================================================================');
    cb();
});
exports.default = series(html, css, js, images, server)