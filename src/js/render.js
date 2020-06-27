// 渲染功能 : 图片、音乐信息、是否喜欢
; (function (root) {
    /**
     * 渲染图片
     * @param {*} src 
     */
    function rederImg(src) {
        root.blurImg(src);   //body背景图片  模糊
        const img = document.querySelector('.songImg img')
        img.src = src;
    }
    function rederInfo(data) {    //音乐信息
        const name = document.querySelector('.songInfo .name');
        const singer = document.querySelector('.songInfo .singer');
        const album = document.querySelector('.songInfo .album');
        name.innerHTML = data.name;
        singer.innerHTML = data.singer;
        album.innerHTML = data.album;
    }
    function rederIslike(isLike) {   //是否喜欢
        const isLikeDom = document.querySelector('.control li')
        if (isLike) {
            isLikeDom.className = 'liking'
        } else {
            isLikeDom.className = ''
        }
    }


    root.render = function (data) {
        rederImg(data.image);
        rederInfo(data);
        rederIslike(data.isLike);
    }
})(window.player || (window.player = {}))