$(function() {
    window.onscroll = function() {
        var height = $(".header_nav").height();
        if ($(window).scrollTop() > height) {
            $('.header-nav-content').addClass("gsgd_top");
            $('.header-nav').addClass("move-down");

        } else {
            $('.header-nav-content').removeClass("gsgd_top");
            $('.header-nav').removeClass("move-down");
        }
    }
});
var app = new Vue({
    el: '#hachao_app',
    data: {
        navs: false,
        navk: [],
        sousuo_ck: 0,
        sousuo: false,
        tabs: [true, true, false, false],
        tab3s: [true, true, false, false],
        tab4: [true, true, false, false],
        wx_tab: [true, true, false],
        more_s: false,
        more_name: [{
                id: 0,
                name: '更多'
            }, {
                id: 1,
                name: '收缩'
            },

        ],
        sousuo_xq: [{
            id: 0,
            name: '装修公司',
            miaoshu: '输入公司名，查询装修公司的口碑点评'
        }, {
            id: 1,
            name: '问题',
            miaoshu: '输入问题，快速获得专业解答'
        }, {
            id: 2,
            name: '攻略',
            miaoshu: '输入关键词，收获实用装修指南'
        }, {
            id: 3,
            name: '效果图',
            miaoshu: '输入关键词，发现海量美图'
        }, {
            id: 4,
            name: '建材家居',
            miaoshu: '输入商品，找到低价优惠'
        }, {
            id: 5,
            name: '小区',
            miaoshu: '输入小区名，看看邻居的装修方案'
        }],
        tabs_img: [
            "images/d08fc244372a3afd4bd6ac704a1e7365_480.jpg",
            "images/7327911a05015e372f0e06c6abdd3989_480.jpg",
            "images/51d8e3655a614cc597aa5d23331bc2d7_480.jpg",
            "images/0ea9bed2c02397b4b695c2b62678b2bc_480.jpg",
            "images/9f9aa9f0eb32bb820cf27f5f4b63aaef_480.jpg",
        ],
        tabContents: [
            "images/d08fc244372a3afd4bd6ac704a1e7365.jpg",
            "images/7327911a05015e372f0e06c6abdd3989.jpg",
            "images/51d8e3655a614cc597aa5d23331bc2d7.jpg",
            "images/0ea9bed2c02397b4b695c2b62678b2bc.jpg",
            "images/9f9aa9f0eb32bb820cf27f5f4b63aaef.jpg",
        ],
        tabContents2: [
            "images/d08fc244372a3afd4bd6ac704a1e7365_230x160M.jpg",
            "images/7327911a05015e372f0e06c6abdd3989_230x160M.jpg",
            "images/51d8e3655a614cc597aa5d23331bc2d7_230x160M.jpg",
            "images/0ea9bed2c02397b4b695c2b62678b2bc_230x160M.jpg",
            "images/9f9aa9f0eb32bb820cf27f5f4b63aaef_230x160M.jpg",
        ],
        num: 1,
        sousuo_xiala: false,
    },
    methods: {
        enter:function(index) {
            this.navk = [],
                this.navs = true;
            this.navk[index] = true;
        },
        leave:function() {
            this.navs = false;
            this.navk = [];
        },
        sousuo_start:function() {
            this.navs = false;
            this.navk = [];
            this.sousuo = true;
            this.sousuo_xiala_anniu = false;
        },
        sousuo_end:function() {
            this.sousuo = false;
            this.sousuo_xiala_anniu = false;
            this.sousuo_xiala = false;
        },
        tab:function(index) {
            this.tabs = [],
                this.tabs[index] = true;
        },
        tab3:function(index) {
            this.tab3s = [],
                this.tab3s[index] = true;
        },
        tab4s:function(index) {
            this.tab4 = [],
                this.tab4[index] = true;
        },
        wx_tabs:function(index) {
            this.wx_tab = [],
                this.wx_tab[index] = true;
        },
        tab_img:function(index) {
            this.num = index;
        },
        sousuo_xialas:function() {
            this.sousuo_xiala = !this.sousuo_xiala;
        },
        sousuo_xialas_xz:function(index) {
            this.sousuo_xiala = false;
            this.sousuo_ck = index;
        },
        more_s_z:function() {
            this.more_s = !this.more_s;
        }
    }
});