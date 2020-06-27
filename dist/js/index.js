(function ($, player) {
    class MusicPlayer {
        constructor(dom) {
            this.wrap = dom;   // 播放器的容器   用于加载listControl 模块
            this.dataList = []; //获取的数据
            // this.now = 0;    //歌曲索引
            this.indexObj = null;
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
                    this.indexObj = new player.controlIndex(data.length);
                    this.listPlay()
                    this.loadMusic(this.indexObj.index);   //音乐加载
                    this.musicControl();       //控制音乐
                },
                error: () => {
                    console.log('请求失败');
                }
            })
        }
        loadMusic(index) {  //加载音乐
            player.render(this.dataList[index])   //渲染信息
            player.music.load(this.dataList[this.indexObj.index].audioSrc);
            for (let i = 0; i < this.list.musicList.length; i++) {
                const element = this.list.musicList[i];
                element.className = ''
            }
            this.list.musicList[this.indexObj.index].className = 'active'
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
                player.music.status = 'play';
                musicPlayer.loadMusic(this.indexObj.prev());
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
                player.music.status = 'play';
                musicPlayer.loadMusic(this.indexObj.next());
                player.music.play();
            })
            this.controlBtns[4].addEventListener('touchend', () => {
                this.list.wrap.style.transform = `translateY(0px)`
            })
            this.list.close.addEventListener('touchend', () => {
                this.list.wrap.style.transform = `translateY(300px)`
            })
            for (let i = 0; i < this.list.musicList.length; i++) {
                const element = this.list.musicList[i];
                element.addEventListener('touchend', () => {
                    this.indexObj.index = i;
                    player.music.play();
                    this.loadMusic(this.indexObj.index);
                })
            }
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

        listPlay() {
            this.list = player.listControl(this.dataList, this.wrap)
        }
    }


    const musicPlayer = new MusicPlayer(document.getElementById('wrap'));
    musicPlayer.init();




})(window.Zepto, window.player)