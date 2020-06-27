(function ($, player) {

    class MusicPlayer {
        constructor(dom) {
            this.wrap = dom;   // 播放器的容器   用于加载listControl 模块
            this.dataList = []; //获取的数据
            this.now = 0;    //歌曲索引
            this.rotateTimer = null;    //旋转定时器
            this.deg = 0;  //旋转角度
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
                    this.dataList = data;       //获取的数据
                    this.loadMusic(this.now);   //音乐加载
                    this.musicControl();       //控制音乐
                },
                error: () => {
                    console.log('请求失败');
                }
            })
        }
        loadMusic(index) {  //加载音乐
            player.render(this.dataList[index])   //渲染信息
            player.music.load(this.dataList[this.now].audioSrc);
            //判断播放状态
            if (player.music.status == 'play') {
                this.controlBtns[2].className = 'playing'
                player.music.play();
                this.imgRotate(this.deg)
            }
        }
        musicControl() {  //控制音乐
            //上一首
            this.controlBtns[1].addEventListener('touchend', () => {
                this.deg = 0;
                this.now--;
                this.now = this.now < 0 ? 3 : this.now;
                player.music.status = 'play';
                musicPlayer.loadMusic(this.now);
                player.music.play();
            })
            //开始 暂停
            this.controlBtns[2].addEventListener('touchend', () => {
                if (player.music.status == 'play') {
                    this.controlBtns[2].className = ''
                    this.imgStop()
                    player.music.pause()
                } else {
                    this.controlBtns[2].className = 'playing'
                    this.imgRotate(this.deg)
                    player.music.play()
                }
            })
            //下一首
            this.controlBtns[3].addEventListener('touchend', () => {
                this.deg = 0;
                this.now++;
                this.now = this.now > 3 ? 0 : this.now;
                player.music.status = 'play';
                musicPlayer.loadMusic(this.now);
                player.music.play();
            })
        }
        /**
        * 旋转图片
        * @param {*} deg 角度
        */
        imgRotate(deg) {
            clearInterval(this.rotateTimer);
            this.rotateTimer = setInterval(() => {
                deg = +deg + 0.2;
                this.deg = deg;
                this.record.style.transform = `rotate(${deg}deg)`;
            }, 1000 / 144);
        }
        imgStop() {
            clearInterval(this.rotateTimer)
        }
    }


    const musicPlayer = new MusicPlayer(document.getElementById('wrap'));
    musicPlayer.init();




})(window.Zepto, window.player)