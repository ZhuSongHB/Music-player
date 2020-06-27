; (function (root) {
    class Index {
        constructor(len) {
            this.index = 0;  //当前索引
            this.len = len;  //数据长度
        }
        prev() {
            //上一个索引
            return this.get(-1)
        }
        next() {
            //下一个索引
            return this.get(1)
        }
        /**
         * 获取索引
         * @param {*} val 
         */
        get(val) {
            this.index = (this.index + val + this.len) % this.len
            return this.index
        }
    }
    root.controlIndex = Index
})(window.player || (window.player = {}))