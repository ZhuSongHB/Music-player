; (function (root) {
    /**
   * 
   * @param {*} data 请求的数据
   * @param {*} wrap 存放数据的容器
   */
    function listControl(data, wrap) {

        const list = document.createElement('div'),
            dl = document.createElement('dl'),
            dt = document.createElement('dt'),
            close = document.createElement('div'),
            musicList = [];//存放歌曲对应的dom

        list.className = 'list';
        dt.innerHTML = '播放列表';
        close.className = 'close';
        close.innerHTML = '关闭';

        dl.appendChild(dt)
        data.forEach((item, index) => {
            const dd = document.createElement('dd');
            dd.innerHTML = item.name;
            dl.appendChild(dd);
            musicList.push(dd)
        });
        list.appendChild(dl);
        list.appendChild(close);
        wrap.appendChild(list);

        return {
            wrap: list,
            close: close,
            musicList: musicList
        }
    }
    root.listControl = listControl;
})(window.player || (window.player = {}))