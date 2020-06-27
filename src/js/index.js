

(function ($, player) {

    class MusicPlayer {
        constructor(dom) {
            this.wrap = dom;   // 播放器的容器   用于加载listControl 模块
            this.dataList = []; //获取的数据
            this.now = 0;    //歌曲索引
        }
        init() {
            this.getDom();  //获取元素
            this.getData('../mock/data.json'); //获取数据
        }
        getDom() {
            this.record = document.querySelector('.songImg img')   //图片
            this.controlBtns = document.querySelectorAll('.control li')  //底部按钮
        }
        getData(url) {
            $.ajax({
                url: url,
                method: 'get',
                success: (data) => {
                    this.dataList = data;
                    this.loadMusic(this.now)
                },
                error: () => {
                    console.log('请求失败');
                }
            })
        }
        loadMusic(index) {  //加载音乐
            player.render(this.dataList[index])   //渲染信息


        }
    }


    const musicPlayer = new MusicPlayer(document.getElementById('wrap'));
    musicPlayer.init();




})(window.Zepto, window.player)