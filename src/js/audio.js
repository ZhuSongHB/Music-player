; (function (root) {
    class AudioManage {
        constructor() {
            this.audio = new Audio(); //创建一个audio实例
            this.status = 'pause';     //默认状态暂停
        }
        load(src) {
            //加载音乐
            this.audio.src = src;
            this.audio.load();   //加载
        }
        play() {
            //播放音乐
            this.audio.play();
            this.status = 'play';
        }

        pause() {
            //暂停音乐
            this.audio.pause();
            this.status = 'pause';
        }
        /**
         * //当音乐结束时
         * @param {*} fn 回调  当音乐结束时执行
         */
        end(fn) {
            this.audio.onended = fn;
        }
        /**
         * 调到需要的位置
         * @param {*} time   需要的时间 
         */
        playTo(time) {
            this.audio.currentSrc = time;  //单位  s
        }
       
    }
    root.music = new AudioManage();
})(window.player || (window.player = {}))