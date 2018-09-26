// JavaScript Document
var getwxcodestatus = 0;
var weixinlogin = 0;
var user_time = 0;
var weixin_url = '/api/weixin/run.php';
var weixin_skip_url='';

!window.RSAUtilszb && $.getScript('http://static.to8to.com/gb_js/to8torsaszb.js');

!function () {
    var loginBegin = {
            init: function () {
                loginTabChange();//登录初始
            }
        },
        otherLogin = {
            init: function () {
                otBinding();//绑定初始
            }
        },
        userReg = {
            init: function () {
                regDoc();//注册初始
            }
        };
    window.logBegin = loginBegin;
    window.bindBegin = otherLogin;
    window.regBegin = userReg;
}(jQuery);
function loginTabChange() {
    $('.login_tab > ul > li').click(function () {
        var item = $('.login_tab > ul > li'),
            obj = $(this),
            objChangeValue = item.index(obj);
        item.removeClass('on');
        obj.addClass('on')
        $('.login_wrap').hide();
        $('.login_wrap').eq(objChangeValue).show();
        if (obj.attr('id') == 'weixinlogin' && weixinlogin == 0) {
            weixinlogin = 1;
            getwxcode();
        }
    });
    $('.login_select > span').click(function () {
        var obj = $(this);
        obj.parent().find('input').focus();
    });
    $('.login_select > input').keydown(function () {
        $(this).parent().find('span').hide();
    }).bind('blur', function () {
        if ($(this).val() == "") {
            $(this).parent().find('span').show();
        }
    }).focus(function () {
        $(this).parent().removeClass('height_auto').find('.index_check_two').remove();
    });
    $('#reg_form').keyup(function (e) {
        if (e.keyCode == 9) {
            var m = $('#userNum').val();
            if (m != "") {
                $('#userNum').parent().find('span').hide();
            }
        }
    })
    $('.login_text').focus(function () {
        $(this).hide();
        $('#userNum').val(' ').val('').show().focus();
    })
}

function updatecode() {
    var str = '<img src="image/loading.gif" class="loading_gif">'
    $('#img_weixincode').html(str)
    //$('#weixincode').renmove();
    // $('#login_error').show();
    getwxcode();
}

function showhelp() {
    $('.wl_codeLayer').hide();
    $(".wechat_help").show();
    /*$(".wechat_login").hide();
     $(".wechat_help").show();*/
}

function hidehelp() {
    $('.wl_codeLayer').show();
    $(".wechat_help").hide();
}

function showweixincode() {
    getwxcode();
    $(".wechat_help").hide();
    $(".wechat_dengru").show();
    $("#login_nomal").show();
}

function loginCheck(obj) {
    try {
        clickStream.getCvParams('1_12_2_1');
    } catch (e) {

    }
    $('.bderror').remove();
    var a = $('#userName').checkForm({
        className: "index_check",
        content: ["请输入邮箱/手机号/用户名"],
        type: [1],
        checkFormType: obj,
        displayNum: true
    });
    var b = $('#userNum').checkForm({
        className: "index_check",
        content: ["密码不可以为空"],
        type: [1],
        checkFormType: obj,
        displayNum: true
    });

    var codeFlag = $('#userCode').length == 0 ? false : true,
        c;
    if (codeFlag) {
        c = $('#userCode').checkForm({
            className: "index_check",
            content: ["验证码不可以为空"],
            type: [1],
            checkFormType: obj,
            displayNum: true
        });
    }
    // var c = $('#userCode').checkForm({className:"index_check",content:["验证码不可以为空"],type:[1],checkFormType:obj, displayNum:true});
    if (a != 0 || b != 0 || (c != 0 && codeFlag)) {
        return false;
    }

    var password = $.trim($("#userNum").val().toLowerCase());
    var username = $.trim($('#userName').val());
    $('#rsa_userNum').val(rsaString(password));
    $('#rsa_userName').val(rsaString(username))
}

function tuxinLoginCheck(obj) {
    try {
        clickStream.getCvParams('1_12_2_1');
    } catch (e) {

    }
    $('.bderror').remove();
    var a = $('#userName').checkForm({
        className: "index_check",
        content: ["用户名不存在，请核对后重新输入"],
        type: [1],
        checkFormType: obj,
        displayNum: true
    });
    var b = $('#userNum').checkForm({
        className: "index_check",
        content: ["密码不可以为空"],
        type: [1],
        checkFormType: obj,
        displayNum: true
    });

    var codeFlag = $('#userCode').length == 0 ? false : true,
        c;
    if (codeFlag) {
        c = $('#userCode').checkForm({
            className: "index_check",
            content: ["验证码不可以为空"],
            type: [1],
            checkFormType: obj,
            displayNum: true
        });
    }
    // var c = $('#userCode').checkForm({className:"index_check",content:["验证码不可以为空"],type:[1],checkFormType:obj, displayNum:true});
    if (a != 0 || b != 0 || (c != 0 && codeFlag)) {
        return false;
    }

    var password = $.trim($("#userNum").val());
    $("#userNum").val(hex_md5(password));

}
/*跳过此步*/
function next_step()
{
    bindMobile();
}
function otBinding() {
    window.onload = function () {
        $('input[type="text"]').val('');
    };
    $('.reg_form > dl > dd > span').click(function () {
        var obj = $(this);
        obj.parent().find('input').focus();
    });
    $('.reg_form > dl > dd > input').keydown(function () {

        $(this).parent().find('span').hide();
    }).bind('blur', function () {
        if ($(this).val() == "") {
            $(this).parent().find('span').show();
        }
    });
    $('.otl_mm').focus(function () {
        $(this).hide();
        $('#userNum').val(' ').val('').show().focus();
        //$('#userNum').show().focus();
        //$(this).attr('type','password');

    })
    window.onload = function () {
        if ($('.otl_left > dl > dd > input').val() != "") {
            $('.otl_left > dl > dd > span').hide();
        }
    }
}

function checkOtform(obj) {
    var loginway = $("#loginway").val();
    try {
        if (loginway == '1')//qq
        {
            var ptag = '1_12_2_4';
        }
        if (loginway == '2')//weibo
        {
            var ptag = '1_12_2_3';
        }
        if (loginway == '4')//weixin
        {
            var ptag = '1_12_2_2';
        }
        clickStream.getCvParams(ptag);
    } catch (e) {

    }

    $('.bderror').remove();
    var a = $('#userName').checkForm({
        className: "index_check",
        content: ["请输入邮箱/手机号/用户名"],
        type: [1],
        checkFormType: obj,
        displayNum: true
    });
    var b = $('#userNum').checkForm({
        className: "index_check",
        content: ["密码不可以为空"],
        type: [1],
        checkFormType: obj,
        displayNum: true
    });
    if (a != 0 || b != 0) {
        return false;
    }
}


//获取二维码
function getwxcode() {
    $.ajax({
        async: true,
        type: "GET",
        dataType: 'jsonp',
        url: weixin_url,
        data: {action: 'createQrcode', cookie_id: 'test', data: 'createWxCode', type: 0},
        success: function (res) {
            if (res.code == 0) {
                $('#login_error').hide();
                $('.wl_font').show();
                setCookie('qrcode_id', res.qrcode_id, 90);
                var heaimg = new Image();
                heaimg.src = res.url;
                heaimg.onload = function () {
                    var img = '<img src="' + res.url + '" id="weixincode" width="140" height="140"><i></i>';                    
                    $("#img_weixincode").html(img);  
                    $("#new_img_weixincode .loading_gif ").remove();
                    $("#new_img_weixincode").append(img);                 
                }

                qrcodeSession(res.qrcode_id);
                $("#weixincode").attr('src', res.url);
                $(".wechat_login_success").hide();
                $("#login_nomal").show();
                getwxcodestatus = 0;
                getwxstatus(res.qrcode_id);
            }
        }
    });

}   

//将微信qrcode_id存入session加密
function qrcodeSession(qrcode_id) {
    $.ajax({
        async: true,
        type: "POST",
        dataType: 'jsonp',
        url: "//www.to8to.com/new_login.php",
        data: {action: 'addQrcodeSession', qrcode_id: qrcode_id}
    });
}
//获取微信扫码状态
function getwxstatus(qrcode_id) {
    //获取来源链接
    function getReferrer(){
        var ref = '';
        if (document.referrer.length > 0) {
            ref =  document.referrer;
        } else {
            if (opener) {
                ref = opener.location.href;
            };
        }
        return ref;
    }
    $.ajax({
        async: true,
        type: "GET",
        dataType: 'jsonp',
        url: weixin_url,
        data: {action: 'getScanState', cookie_id: 'test', qrcode_id: qrcode_id},
        timeout: 5000, //ajax请求超时时间修改为5秒，减缓php进程数过高的问题
        success: function (data, textStatus) {
            if (data.code == "0") {
                $("#login_nomal").hide();
                $('.wl_font').hide();
                $(".wechat_login_success").hide();
                $("#login_success").show();
                /*getwxuser(qrcode_id);*/
                var res = data;
                var referer = getReferrer();
                if( ( res.user.openid == undefined ) || ( !res.user.openid ) || ( res.user.unionID == undefined )  || !res.user.unionID || ( res.user.qid == undefined ) || !res.user.qid ){
                    window.location.href = '/new_login.php';
                } else {
                    //业主确定登录
                    weixin_skip_url= '/loginfromweixin/callback.php?referer=' + encodeURIComponent(referer) + '&user_name=' + encodeURI(res.user.nickname) + '&open_id=' + res.user.openid + '&qrcode_id=' + res.user.qid + '&header_url=' + res.user.pic_header_url + '&unionID=' + res.user.unionID;
                    window.location.href = weixin_skip_url;
                }

            }
            if (data.code == '405') {
                getwxcodestatus = getwxcodestatus + 1;
                // 减少了每次请求的时间，对应的请求次数要增加
                if (getwxcodestatus > 39) {
                    $("#login_nomal").hide();
                    $(".wechat_login_success").hide();
                    $("#login_error").show();
                } else {
                    getwxstatus(qrcode_id);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //if(textStatus=="timeout"){ 
            getwxcodestatus = getwxcodestatus + 1;
            // 减少了每次请求的时间，对应的请求次数要增加
            if (getwxcodestatus > 39) {
                $(".wechat_login_success").hide();
                $("#login_error").show();
                $('.wl_font').hide();
                $('#login_nomal').hide();
            } else {
                getwxstatus(qrcode_id);
            }

            //}      
        }
    });

}


//获取用户信息
function getwxuser(qrcode_id) {
    $.ajax({
        async: true,
        type: "GET",
        dataType: 'jsonp',
        url: weixin_url,
        data: {action: 'getLoginState', cookie_id: 'test', qrcode_id: qrcode_id},
        timeout: 5000,     //ajax请求超时时间修改为5秒 减轻php进程压力
        success: function (res) {
            if (res.code == "405") {
                // 减少了每次请求的时间，对应的请求次数要增加
                if (user_time > 23) {
                    $(".wechat_login_success").hide();
                    $('.wl_font').hide();
                    $("#login_error").show();
                }
                else {
                    user_time = user_time + 1;
                    getwxuser(qrcode_id);
                }
            }
            if (res.code == "0") {
                var referer = jQuery('input[name=referer]').val();
                window.location.href = '/loginfromweixin/callback.php?referer=' + encodeURIComponent(referer) + '&user_name=' + encodeURI(res.user.nickname) + '&open_id=' + res.user.openid + '&qrcode_id=' + res.user.qid + '&header_url=' + res.user.pic_header_url + '&unionID=' + res.user.unionID;
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //if(textStatus=="timeout"){
            // 减少了每次请求的时间，对应的请求次数要增加
            if (user_time > 23) {
                $(".wechat_login_success").hide();
                $('.wl_font').hide();
                $("#login_error").show();
            }
            else {
                user_time = user_time + 1;
                getwxuser(qrcode_id);
            }

            //}      
        }
    });

}

//验证组件
!function () {
    $.fn.checkForm = function (settings) {
        settings = $.extend({}, $.checkForm.defaults, settings);
        if (settings.type.length == 0) {
            return false;
        }
        var cf = {};
        cf.fn = {};
        cf.fn.regType = [/^13[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|16[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}|19[0-9]{1}[0-9]{8}$/, /^([0-9]+)$/, /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/, /^([0-9.]+)$/, /^[0-9]{5,}$/, /^((0\d{2,3})(-)?)?(\d{7,8})(-(\d{3,}))?$|^13[0-9]{1}[0-9]{8}$|14[0-9]{1}[0-9]{8}$|15[0-9]{1}[0-9]{8}$|18[0-9]{1}[0-9]{8}$|17[0-9]{1}[0-9]{8}$/, /^[1-9]\d{0,7}(\.\d{1,2})?$/, /^[1-9][0-9]{0,3}$/, /^\d{1,4}(\.\d{1})?$/, /^(([1-9]\d{0,6})|0)(\.\d{1})?$/, /^[A-Za-z0-9]{8,20}$/, /^((0\d{2,3})(-)?)?(\d{7,8})(-(\d{3,}))?$/, /^[a-z]([a-z0-9]*[-_]?[a-z0-9]+)*@([a-z0-9]*[-_]?[a-z0-9]+)+[\.][a-z]{2,3}([\.][a-z]{2})?$/i, /^[a-zA-Z0-9_\u4e00-\u9fa5]{4,15}$/, /^[a-zA-Z0-9_\-\(\)（）\u4e00-\u9fa5]{2,40}$/];//0:手机。1：纯数字。2：EMAIL。3：数字加.。4：QQ号。5:手机或固话。6.价格。7.面积（<=10000）8.预算（0.1万-9999.9万）。9.清单价格（0.1元-999.9万）。10.字母数字(8-20)。11.固定电话。12.邮件地址。13.中英文，数字及_。14.公司名称。
        cf.fn.obj = this;
        cf.fn.str = '';
        cf.fn.count = 0;
        cf.fn.obj.focus(function () {
            cf.fn.str = '';
            $.fn.prototype.removeWrongText($(this), settings.parCls, settings);
        });
        if (!settings.checkFormType) {
            cf.fn.obj.blur(function () {
                $.fn.prototype._check(cf, settings, $(this));
            });
        } else if (settings.checkFormType && settings.checkType == "text") {
            var g = $.fn.prototype._check(cf, settings, $(this));
            return g;
        } else if (settings.checkFormType && settings.checkType == "select") {
            var g = $.fn.prototype._check(cf, settings, $(this));
            return g;
        }
    };
    $.fn.prototype = {
        _check: function (cf, settings, blurObj) {
            cf.fn.str = '';
            cf.fn.str += '<div class="' + settings.className + '"><' + settings.labl + ' class="' + settings.lablClass + '"></' + settings.labl + '>';
            //blurObj.parent().find('div.'+settings.className+'').remove();
            if (blurObj.parent().find('div.' + settings.className + '').length != 0) {
                return false;
            }
            var cfPos = [];
            if (settings.displayNum && $(settings.checkFormType).parent().find('div.' + settings.className + '').length == 1) {
                return;
            }
            for (var i = 0; i < settings.type.length; i++) {
                if (settings.type[i] == 1 && settings.checkType == "text" && settings.content[0] != "" && (blurObj.val() == "" || (blurObj[0].type == "select-one" && blurObj.val() == "0"))) {
                    cf.fn.str += '' + settings.content[0] + '</div>';
                    $.fn.prototype.addWrongText(blurObj, settings.parCls, cf.fn.str, settings.checkType);
                    cf.fn.count = 1;

                } else if (settings.type[i] == 2 && settings.checkType == "text" && blurObj.val() != "") {
                    var result = false;
                    if (typeof settings.reg == "object" && !settings.moreReg) {
                        result = $.fn.prototype.checkWordLen(settings.reg.len, settings.reg.range, blurObj.val());
                    } else if (typeof settings.reg == "number" && !(blurObj.val().match(cf.fn.regType[settings.reg]) == null)) {
                        result = true;
                    } else if (typeof settings.reg == "object" && settings.moreReg) {
                        var moreRegResult = false;
                        for (var i = 0; i < settings.reg.length; i++) {

                            if (blurObj.val().match(cf.fn.regType[settings.reg['' + i + '']]) != null) {
                                moreRegResult = true;
                            }
                        }
                        if (moreRegResult == true) {
                            result = true;
                        }

                    }

                    if (!result) {
                        cf.fn.str += "" + settings.content[1] + '</div>';
                        $.fn.prototype.addWrongText(blurObj, settings.parCls, cf.fn.str, settings.checkType);
                        cf.fn.count = 1;
                    }
                } else if (settings.type[i] == 1 && settings.checkType == "select" && blurObj.find('option:selected').attr('value') == "") {
                    cf.fn.str += "" + settings.content[0] + '</div>';
                    $.fn.prototype.addWrongText(blurObj, settings.parCls, cf.fn.str, settings.checkType);
                    cf.fn.count = 1;
                }
                ;
            }
            ;
            if (cf.fn.count != 1) {
                return 0;
            }
        },
        checkWordLen: function (maxLen, range, val) {
            var len;
            len = val.length;
            if (!range) {
                if (maxLen < len) {
                    return false;
                }
            } else {
                if (len > range.dmax || len < range.dmin) {
                    return false;
                }
            }

            return true;
        },
        addWrongText: function (obj, cls, str, chkType) {
            if (!cls) { //未传class
                obj.parent().addClass('height_auto');
                obj.parent().append(str);
            } else {
                obj.parents(cls).addClass('height_auto');
                obj.parents(cls).append(str);
            }

            if (chkType != 'select') {
                obj.css('border-color', '#ff6767');
            }
        },
        removeWrongText: function (obj, cls, settings) {
            if (!cls) { //未传class
                obj.parent().removeClass('height_auto');
                obj.parent().find('div.' + settings.className + '').remove();
            } else {
                obj.parents(cls).removeClass('height_auto');
                obj.parents(cls).find('div.' + settings.className + '').remove();
            }
        }
    };
    // 默认值
    $.checkForm = {
        defaults: {
            calssName: "checkFormDefault", //报错字符串的class
            content: [], //报错内容数组
            type: [], //报错类型，1为空，2其他错
            reg: "", //报错类型2时候的正则表达式
            moreReg: false,
            checkType: "text",//检测类型
            labl: 'em',//错误提示的标签
            lablClass: '',//错误提示的标签的类名
            parCls: ''//错误提示所加父元素的标示
        }
    };
}(jQuery);

function regDoc() {
    var flag = $('.reg_tab > ul > li').eq(1).hasClass('on');
    $('input.reg_text').focus(function () {
        $(this).hide().prev().hide();
        $(this).next().val('1').show().val('').focus().next().show();
    });
    if (!flag) {//个人注册
        window.onload = function () {
            $('input[type="text"]').val('').next('span').show();
            $('input[type="password"]').val('1').val('');
        }
    }
    //微信注册dom操作
    $('.reg-td-phone').click(function(){
        $('.login_wrap,.weixin-reg-box').hide();
        $('.login_wrap').eq(0).show();
    })
    $('.new-wechat-login').click(function(){
        $('.login_wrap').hide();
        $('.weixin-reg-box').show();
    })
    $('.td-help-span').on('mouseover',function(){
        $('.reg-td-point').hide();
        $('#new_img_weixincode').addClass('reg-help-on');
    })
    $('.td-help-span').on('mouseout',function(){
        $('.reg-td-point').show();
        $('#new_img_weixincode').removeClass('reg-help-on');
    })   
    //微信注册dom操作  end
    $('.reg_tab > ul > li').click(function () {
        var item = $('.reg_tab > ul > li'),
            obj = $(this),
            objChangeValue = item.index(obj);
        item.removeClass('on');
        obj.addClass('on');
        $('.weixin-reg-boxer').hide();//新的微信注册页所加
        if (objChangeValue == 0) {//不改变第一个切换的显示隐藏状态
            $('.login_wrap').eq(1).hide();
            $('.login_wrap').eq(2).hide();   
            $('.weixin-reg-boxer').show();
        }else{
            $('.login_wrap').eq(1).hide();
            $('.login_wrap').eq(2).hide();       
            $('.login_wrap').eq(objChangeValue).show();
        }
        $('.bderror').remove();
    });
    $('input[type="text"], input[type="password"]').placeholder({oLabel: 'span'});
    $('input[type="text"]').focus(function () {
        $(this).parent().removeClass('height_auto').find('.index_check').remove();
    });

    var radioSelect = $('.company_user > dl > dd.cu_layer_one > label');
    radioSelect.find('input').click(function () {
        var rsValue = radioSelect.index($(this).parent());
        radioSelect.find('input').attr('checked', false);
        $(this).prop('checked', true);


    })
    $('.company_user > dl > dd > label').click(function () {
        var obj = $(this);
        obj.parent().find('input').focus();
    });
    $('.company_user > dl > dd > input').keydown(function () {
        $(this).parent().find('label').hide();
    }).bind('blur', function () {
        if ($(this).val() == "") {
            $(this).parent().find('label').show();
        }
    });

    //显示隐藏验证码
    $('.send_auto').click(function () {
        var authCode = $('.auth_code'),
            email = $('#emailAndPhone'),
            tip = email.parent().find('.index_check').length;

        if (authCode.is(':hidden')) {
            if (email.val() != '' && tip == 0) {
                authCode.show();
                $('.authCodeText').focus();
            } else if (tip == 0) {
                addWrongTip({targ: '#emailAndPhone', tip: '请输入手机号码'});
                //email.focus();
            }
        } else {
            authCode.hide();
        }
    });

    checkRegInfo();
    recordValueChg();


    //提交
    $('.btn_login').on('click', function () {
        mitRegData();
    });

    //回车自动提交
    $('#reg_form input').on('keydown', function (event) {
        var event = event || window.event,
            code = event.keyCode,
            targ = $(event.target || event.srcElement);

        if (code == 13) {
            $('.btn_login').trigger('click');
            targ.blur();
            if (targ.parent().find('.index_check').length != 0) {
                targ.css('border-color', '#ff6767');
            }
        }
    });
}

function mitRegData() {
    var rslt = checkNullFn();
    if (!rslt) {
        return false;
    }

    $('#reg_form').find('input:focus').trigger('blur');
    if ($('#reg_form').find('div.index_check').length == 0) {
        regObj.chgFlag = 1;
        checkRepeatAndWrong({num: 0, val: 1, mit: 1});
    }
}


var regObj = {chgFlag: 0};

//记录value变化的函数，防止重复验证
function recordValueChg() {
    $('#emailAndPhone, #userName, #autoCode').on('change', function () {
        regObj.chgFlag = 1;
    });
}


function checkNullFn() {
    var obj = $('#reg_form').find('.btn_login').parent();
    var a = $('#emailAndPhone').checkForm({
        className: "index_check",
        content: ["请输入手机号"],
        type: [1],
        checkFormType: obj
    });
    var b = $('#userName').checkForm({className: "index_check", content: ["用户名不可以为空"], type: [1], checkFormType: obj});
    var c = $('#useNum').checkForm({className: "index_check", content: ["密码不可以为空"], type: [1], checkFormType: obj});
    var d = $('#autoCode').checkForm({className: "index_check", content: ["验证码不可以为空"], type: [1], checkFormType: obj});
    if ($('#useNum').parent().find('.index_check').length) {
        $("#useNum").parent().css("margin", "0 auto 2px");
    } else {
        $("#useNum").parent().css("margin", "0 auto 20");
    }
    if (c != 0) {
        $('#useNum').prev('input').css('border-color', '#ff6767');
    }
    if (a == 0 && b == 0 && c == 0 && d == 0) {
        return true;
    }

}

//检测重复与错误
function checkRepeatAndWrong(obj) {
    var sendData = null;
    if (obj.num == 0 && obj.val != '' && regObj.chgFlag == 1) {
        sendData = {
            email_mobile: rsaString($('#emailAndPhone').val()),
            username: rsaString($('#userName').val()),
            yzm: $('#autoCode').val(),
            ajax_reg_check: 1
        };
        $.ajax({
            type: 'post',
            url: '//www.to8to.com/reg/reg_new.php',
            data: sendData,
            dataType: 'json',
            success: function (res) {
                var flag = true;
                if (res.email_mobile.data == -1) {//手机或邮箱失败
                    if ($('#emailAndPhone').siblings('.index_check').length == 0) {
                        addWrongTip({targ: '#emailAndPhone', tip: res.email_mobile.message});
                    }
                    flag = false;
                }

                if (res.username.data == -1) {//用户名失败
                    if ($('#userName').siblings('.index_check').length == 0) {
                        addWrongTip({targ: '#userName', tip: res.username.message});
                    }
                    flag = false;
                }

                if (res.yzm.data == -1) {//验证码输入错误
                    if ($('#autoCode').siblings('.index_check').length == 0) {
                        addWrongTip({targ: '#autoCode', tip: res.yzm.message});
                    }
                    flag = false;
                }
                // 如果手机或用户名等存在问题，需要每次都重新验证
                if (flag) {
                    regObj.chgFlag = 0;
                }

                if (flag && obj.mit == 1) {//需要提交

                    $('#ras_emailAndPhone').val(rsaString($('#emailAndPhone').val()));
                    $('#rsa_userName').val(rsaString($('#userName').val()));
                    $('#ras_useNum').val(rsaString($('#useNum').val().toLowerCase()));

                    $('#reg_form').submit();
                }
            }
        });
    }
}

// 返回加密后的字段
function rsaString(str) {
    return encodeURIComponent(RSAUtilszb.encryptfun(str));
}

//检测邮箱或手机重复
function checkMailRepeat(obj) {
    var f = $('#emailAndPhone').checkForm({
        className: "index_check",
        content: ["请输入手机号码", "手机号码错误"],
        type: ['', 1],
        reg: [0, 1],
        moreReg: true,
        checkFormType: obj
    });
    checkRepeatAndWrong({num: f, val: $('#emailAndPhone').val()});
}

//检测用户名重复
function checkUserRepeat(obj) {
    var b = $('#userName').checkForm({
        className: "index_check",
        content: ["用户名不可以为空", '用户名由中英文、数字及"_"组成，4-15位字符'],
        type: ['', 2],
        reg: 13,
        checkFormType: obj
    });
    if (b === 0) {
        var e = $('#userName').val().match(/^[0-9]+$/) ? 1 : 0;
        if (e == 1) {
            addWrongTip({targ: '#userName', tip: '用户名不能为纯数字'});
        }
        checkRepeatAndWrong({num: e, val: $('#userName').val()});
    }
}

//检测验证码
function checkAuthCode(obj) {
    var a = $('#autoCode').checkForm({
        className: "index_check",
        content: ["验证码不可以为空"],
        type: [''],
        checkFormType: obj
    });
    checkRepeatAndWrong({num: a, val: $('#autoCode').val()});
}

//注册检测
function checkRegInfo() {
    $('#reg_form').find('div.index_check').remove();
    $('#emailAndPhone').blur(function () {
        checkMailRepeat(this);
    });
    $('#userName').blur(function () {
        checkUserRepeat(this);
    });

    var c = $('#useNum').checkForm({
        className: "index_check",
        content: ["密码不可为空"],
        type: [''],
        checkFormType: $('#useNum')
    });

    $("#useNum").focus(function () {
        $(this).parent().css("margin-bottom", "20px");
    });

    $("#useNum").blur(function () {
        var _this = $(this);
        var useNum = _this.val();

        // 不得含有换行，至少8位，至少含有 数字，特殊字符， 字母 中的任意两个
        var pregRule = /^(?!.*\n)(?:(?=.*\d)(?=.*\W)|(?=.*\d)(?=.*[A-Za-z])|(?=.*\W)(?=.*[A-Za-z])).{8,}$/;
        if (useNum) {

            if (!pregRule.test(useNum)) {
                _this.css('border-color', 'rgb(255, 103, 103)');
                _this.parent().find(".index_check").remove();
                _this.parent().append('<div class="index_check"><em class=""></em>密码至少8位，必须包含字母、数字、特殊字符中的任意两种</div>');
                _this.parent().css("margin", "0 auto 2px");
                return false;
            } else {
                _this.parent().css("margin", "0 auto 20px");
                _this.parent().find(".index_check").remove();
            }

            useNum = String(useNum);
            var useFirst = useNum.substring(0, 1);
            var usearr = useNum.split(useFirst);
            var usrStrNum = usearr.length - 1;
            if (useNum.length == usrStrNum) {
                _this.css('border-color', 'rgb(255, 103, 103)');
                _this.parent().find(".index_check").remove();
                _this.parent().append('<div class="index_check"><em class=""></em>密码字符不能完全一致</div>');
                _this.parent().css("margin", "0 auto 2px");
                return false;
            } else {
                _this.parent().css("margin", "0 auto 20px");
                _this.parent().find(".index_check").remove();
            }
        } else {
            //_this.parent().css("margin","0 auto 20px");
            _this.parent().css("margin-bottom", "20px");
            _this.parent().find(".index_check").remove();
        }

    });
    //防止弱密码，插件已经不能满足条件
    // var c = $('#useNum').checkForm({
    //     className: "index_check",
    //     content: ["密码不可以为空", "密码太弱，请重新设定", "密码瞎写"],
    //     type: ['', 2],
    //     moreReg: true,
    //     reg: [15, 16],
    //     moreContent: true
    // });

    $('#autoCode').blur(function () {
        checkAuthCode(this);
    });
    $('#as_service').click(function () {
        var xx = $(this).parents('.safe').next();
        if ($(this).is(':checked')) {
            xx.click(function () {
                mitRegData();
            });
        } else {
            xx.unbind('click');
        }
        xx.toggleClass('btn_login_no');
    });
}

//添加错误提示
function addWrongTip(obj) {
    var str = '<div class="index_check"><em></em>' + obj.tip + '</div>';
    $(obj.targ).css('border-color', '#ff6767').parent().addClass('height_auto').find('.index_check').remove().end().append(str);
}

function companyRegCheck(obj) {
    $('#sl_service').bind('change', chkServicePro);
    var a = $('#cu_company').checkForm({
        className: "index_check",
        content: ["公司名称不可以为空", '公司名称由中英文、数字及"-"、"_"、"()"、"（）"组成的2-40位字符'],
        type: [1, 2],
        reg: 14,
        checkFormType: obj,
        displayNum: true
    });
    var b = $('#cu_username').checkForm({
        className: "index_check",
        content: ["联系人不可以为空"],
        type: [1],
        checkFormType: obj,
        displayNum: true
    });
    var c = $('#cu_phone').checkForm({
        className: "index_check",
        content: ["手机号码不可以为空", "手机号错误，请重新输入"],
        type: [1, 2],
        reg: 0,
        checkFormType: obj,
        displayNum: true
    });
    var d = $('#cu_email').checkForm({
        className: "index_check",
        content: ["邮箱不可以为空", "邮箱错误，请重新输入"],
        type: [1, 2],
        reg: 2,
        checkFormType: obj,
        displayNum: true
    });
    var e = $("#shen").checkForm({
        className: "index_check",
        content: ["请选择所在城市"],
        type: [1],
        checkFormType: obj,
        displayNum: true,
        checkType: "select"
    });
    if (e == 0) {
        var f = $("#city").checkForm({
            className: "index_check",
            content: ["请选择所在城市"],
            type: [1],
            checkFormType: obj,
            displayNum: true,
            checkType: "select"
        });
    }
    if (f == 0) {
        var g = $("#town").checkForm({
            className: "index_check",
            content: ["请选择所在城市"],
            type: [1],
            checkFormType: obj,
            displayNum: true,
            checkType: "select"
        });
    }
    if (a == 0 && b == 0 && c == 0 && d == 0 && e == 0 && f == 0 && g == 0) {
        if (chkServicePro()) {
            $(".company_reg").submit();
        }
    }
}

function chkServicePro() {
    var g = $('#sl_service').prop('checked');
    if (!g && $('.ic_service').length != 1) {
        var str = '<div class="index_check ic_service"><em></em>请阅读服务协议</div>'
        $('.safe_login').after(str)
    } else if (g) {
        $('.ic_service').remove();
        return true;
    }
}


function checkSubmitEmail(val) {
    if (!val.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
        return false;
    }
    return true;
}

function checkSubmitMobil(val) {

    if (!val.match(/^1[3|4|5|7|8][0-9]\d{4,8}$/)) {
        return false;
    }
    return true;
}

//申请成功弹窗
function regSuccessBox() {
    var successStr = '<div class="dlzc_box"><div class="mod_pagetip"><span class="mod_pagetip_ico"><em class="ico_tip_ok"></em></span><div class="mod_pagetip_bd"><div class="mod_pagetip_title">提交申请成功！</div><div class="mod_pagetip_info">土巴兔客服将于1-3个工作日与您联系</div></div></div></div>';
    $('.window_box').windowBox({
        width: 460,
        title: "提示",
        wbcStr: successStr
    });
}

function checkdata(obj, type) {
    var value = obj.val();
    if (type == "email") {

    } else if (type == "mobile") {


    } else if (type == 'username') {


    }
}

function getImgCheck(reqtype,phone){
    var authPhone=encodeURIComponent(phoneEncrypt(phone));
    $('#bind_passport')[0].src = '//mobileapi.to8to.com/index.php?callback=getBack&model=Item&action=GetCaptcha&platForm=2&uid=0&reqtype='+reqtype+'&bindType=1&authPhone='+authPhone+'&version=2.5&v=' + new Date().getTime();
}
//手机号加密
function phoneEncrypt(phone){
    var newRsadata = RSAUtilszb.encryptfun(phone + ',' + (Math.ceil(Math.random()*10)) + ',' + Math.random());
    return encodeURIComponent(newRsadata);
}
//绑定手机号码
function bindMobile(){
   var uid=0;
    var str =
        '<form id="checkPhoneForm">' +
            '<div class="box_mobileverify my_box_mobileverify">' +
            '<div class="mod_form">' +
            '<div class="form_line">' +
            '<label for="" class="label">手机号</label>' +
            '<div class="element" style="width:73.4%;">' +
            '<div class="text_wrap">' +
            '<input type="text" name="moblie" id="ck_phone" class="text">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="form_line">' +
            '<label for="" class="label">短信验证码</label>' +
            '<div class="element" style="width:73.4%;">' +
            '<div class="text_wrap clear code_wrap">' +
            '<input type="text" id="ck_phone_code" name="yzm" class="text text_code">' +
            '<input type="hidden" name="agree_code" value="">' +
            '<a href="javascript:;" class="code_lnk" id="send_msg">获取短信验证码</a>' +
            '<span class="code_lnk" style="display:none;" id="countDown"><span>120</span>秒后重新获取</span>' +
            '</div>' +
            '<div class="reset_content_mobile mobile_step2" style="display:block;">' +
            '<div class="mobile_code">' +
            '<div class="yzbox" id="div_mathcode" style="display:none;">' +
            '<div class="yzboxa">' +
            '<div class="yzboxa01">' +
            '<div class="s1">' +
            '<img src="" id="bind_passport" class="passport">' +
            '</div>' +
            '<div class="s2">' +
            '<a class="up_img_check" href="javascript:;" >看不清？</a>'+
            '</div>' +
            '</div>' +
            '<div class="yzboxa02">' +
            '<div class="s2">' +
            '<input type="text" value="" maxlength="4" class="yzboxa01inp" id="bind_txt_mathcode" name="bind_txt_mathcode">' +
            '<input type="button" class="yzboxa01but" value="确认" id="bind_btn_mathcode"><br/>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="yzboxb"></div>' +
            '<em class="s"></em>' +
            '<em class="bors"></em>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="form_line">' +
            '<div class="element"><input type="submit" class="btn_org" value="提交"></div><br/>' +
            '</div>' +
            '<div class="form_line" style="margin-top: 18px;">' +
            '<p style="padding:0px 36px;font-size: 12px;color:gray;">* 根据国家互联网信息办公室发布的《移动互联网应用程序信息服务管理规定》，自2016年8月20日起，注册用户需基于移动电话号码等真实身份信息进行实名认证</p>' +
            '<p style="padding:0px 36px;font-size: 12px;color:gray;">* 绑定手机可以提高账号的安全性，方便找回密码</p>' +
            '</div>' +
            '<em class="ee" style="margin: 1px -3px 3px 84px;"></em>' +
            '<span class="yuyin" style="width: 240px;display: none;">收不到短信验证码？试试<font ><a href="javascript:void(0)" style="color:#FF6600;" id="yuyins">接听语音验证码</a></font>吧！</span><br>' +
            '<span class="yuyin" style="width:240px;margin:100px 1px -4px 104px;" id="yis" ></span>' +
            '</div>'+
            '</div>' +
            '</form>';
    $('.window_box').windowBox({
        width: 525,
        title: "绑定手机号",
        wbcStr: str
    });

    $('.window_box_close').removeProp('onclick');
    $('.window_box_close').on('click',function(){
        if( confirm("未进行实名认证将不能使用其他功能哦，确定要退出吗？") ){
            window_box_close();
            setTimeout(function(){
                window.location.href = '/new_login.php';
            }, 2000 );
        }
    });
    $('#send_msg').on('click',function(){
        var chkArr = [{id:'#ck_phone', info:[{reg:[0],tip:'请输入手机号码'}, {reg:[/^1[3456789][0-9]{1}[0-9]{8}$/], tip: '请输入正确手机号码'}], parCls: '.element'}];
        var result = simplifyCheck2(chkArr);
        if(result)
        {
            getImgCheck(4,$('input[name=moblie]').val());
            $('#div_mathcode').show();
        }
    });

    $('.up_img_check').on('click', function(){
        getImgCheck(4,$('input[name=moblie]').val());
    });

    var cf_check_hk = 1;
    $('#bind_btn_mathcode').click(function () {
        if(!cf_check_hk){
           // return;
        }
        var chkArr = [{id:'#ck_phone', info:[{reg:[0],tip:'请输入手机号码'}, {reg:[/^1[3456789][0-9]{1}[0-9]{8}$/], tip: '请输入正确手机号码'}], parCls: '.element'}];
        var result = simplifyCheck2(chkArr);
        if( result )
        {
            cf_check_hk = 0;
            var imgCode = $('#bind_txt_mathcode').val();
            var phone = $('input[name=moblie]').val();

            if (imgCode == '') {
                $('#bind_txt_mathcode').focus();
            } else {
                $.ajax({
                    url: '//mobileapi.to8to.com/index.php',
                    type: 'get',
                    dataType: 'jsonp',
                    jsonpCallback: 'getBackFunc',
                    data: {
                        model: 'Item',
                        action: 'BindMobile',
                        version: 2.5,
                        to8to_auth: '',
                        platForm: 2,
                        uid: uid,
                        imgCode:imgCode,
                        authPhone:phoneEncrypt(phone),
                        step:4,
                        msgType:0,
                        reqtype:4
                    },
                    async: false,
                    success: function(data){
                        cf_check_hk = 1;
                        if( data.data.code == 1 ) {
                            $('#div_mathcode').hide();
                            //$('.yuyin').show();
                            $('.ee').show();
                            $('#send_msg').hide();
                            $('#yis').show();
                            $('#countDown').find('span').html(120).end().show();
                            msCountDown();
                            $('input[name=agree_code]').val( data.data.data.phone);
                            getImgCheck(4,$('input[name=moblie]').val());
                        } else {
                            getImgCheck(4,$('input[name=moblie]').val());
                            alert(data.data.msg.content);
                            $('#bind_txt_mathcode').focus();
                        }
                    },
                    error: function(err){
                        cf_check_hk = 1;
                        console.log(err);
                    }
                });
            }
        }
    });

    function msCountDown() {
        var countDown = $('#countDown'),
            span = countDown.find('span'),
            mSecond = span.html();

        if(mSecond > 0) {
            mSecond--;
            span.html(mSecond);
            timeCountDown = setTimeout(arguments.callee, 1000);
        } else {
            clearTimeout(timeCountDown);
            $('#countDown').hide();
            $('#send_msg').show();
        }
    }

    $(".yuyin a").mousemove(function(){
        $(".yuyin a").css('color','#01AF63');
    });

    $(".yuyin a").mouseout(function(){
        $(".yuyin a").css('color','#FF6600');
    });
    $('#yuyins').click(function (){
        var chkArr = [{id:'#ck_phone', info:[{reg:[0],tip:'请输入手机号码'}, {reg:[/^1[3456789][0-9]{1}[0-9]{8}$/], tip: '请输入正确手机号码'}], parCls: '.element'}];
        var result = simplifyCheck2(chkArr);
        if( result )
        {
            var imgCode = $('#bind_txt_mathcode').val();
            var phone = $('input[name=moblie]').val();
            $.ajax({
                url: '//mobileapi.to8to.com/index.php',
                type: 'get',
                dataType: 'jsonp',
                jsonpCallback: 'getBackFunc',
                data: {
                    model: 'Item',
                    action: 'BindMobile',
                    version: 2.5,
                    to8to_auth: '',
                    platForm: 2,
                    uid: uid,
                    imgCode:imgCode,
                    authPhone:phoneEncrypt(phone),
                    step:1,
                    msgType:1,
                    reqtype:4
                },

                async: false,
                success: function(data){
                    if( data.data.code == 1 ) {
                        $('#yis').html('电话拨打中...请留意接听稍后的来电');
                        $('input[name=agree_code]').val( data.data.data.phone);
                    } else {
                        $('#yis').html('<font  id="ypf">'+data.data.msg.content+'</font>');
                    }
                }
            });
        }
    });

    var cf_check_hk = 1;
    $('#checkPhoneForm').on('submit', function() {
        var chkArr = [{id: '#ck_phone_code', info: [{reg: [0], tip: '请输入验证码'}]}];
        var result = simplifyCheck2(chkArr);
        if( result ) {
            if( !cf_check_hk ) {
                return false;
            }
            cf_check_hk = 0;
            var msgCode = $('#ck_phone_code').val();
            var phone = $('input[name=moblie]').val();
            var agreeCode = $('input[name=agree_code]').val();
            var requestdata={
                model: 'Item',
                action: 'BindMobile',
                version: 2.5,
                to8to_auth: '',
                platForm: 2,
                uid: uid,
                msgCode:msgCode,
                authPhone:phoneEncrypt(phone),
                agreeCode:agreeCode,
                step:6,
                reqtype:4
            };
            $.ajax({
                url: '//mobileapi.to8to.com/index.php',
                type: 'get',
                dataType: 'jsonp',
                jsonpCallback: 'getBackFunc',
                data: requestdata,
                async: false,
                success: function(data){
                    cf_check_hk = 1;
                    if( data.data.code == 1 )//未注册
                    {
                        window_box_close();
                        $('#bindmobile').val(phone);
                        $('#reg_form').submit();
                    }
                    else if(data.data.code == 10202)//已注册
                    {
                        hasBindMobilePrompt(requestdata,data.data.data.username,phone);
                    }
                    else
                    {
                        alert(data.data.msg.content);
                        return false;
                    }
                },
                error: function(err){
                    cf_check_hk = 1;
                    console.log(err);
                }
            });
        }
        return false;
    });
}
function errorBombBox( title, content ) {
                var str = '<div class="mod_pagetip mod_pagetip_noinfo my_pagetip" style="padding: 60px 0 40px"><div class="my_pagetip_bd clear">' +
                    '<span class="mod_pagetip_ico" style="padding-left: 125px;"><em class="ico_tip_warn"></em></span>' +
                    '<div class="mod_pagetip_bd" style="  padding-top: 6px;"><div class="mod_pagetip_title">'+title+'</div>' +
                    '<p class="my_pagetip_title" style="max-width: 324px;">'+content+'</p></div></div><div class="mod_pagetip_btn my_pagetip_btn" style="margin-top:10px;text-align:center;">' +
                    '<a href="javascript:;" style="display:inline-block;float:none;width:24px" onclick="window_box_close();"  class="btn_yes">确定</a></div></div>';
                $('.window_box').windowBox({
                    width: 480,
                    showTitle: 'none',
                    wbcStr: str
                });
}

function hasBindMobilePrompt(requestdata,username,phone){
            window_box_close();
            var str ='<div class="box_c" style="line-height: 1.8;font-size: 14px;color:#666;text-align: center;"><img style="margin-left: 55px;" src="image/icon_tip.png" alt=""/><h3 style="font-size: 18px;color:#333;font-weight: normal;margin-bottom:5px;">温馨提示</h3><p>您输入的手机号已经绑定以下账号上了：</p><p >用户名：'+username+'</p>\
                <p><em style="color:#f36f20;margin-right:5px;">&bull;</em>您可以点击”登录已有账号“，通过手机号码直接登录原有账号</p>\
                <p><em style="color:#f36f20;margin-right:5px;">&bull;</em>如果您仍然需要将手机号码绑定在该账号上请点击“继续绑定”</p>\
                <a href="javascript:;" id="continueBind" class="" style="display: inline-block;height:38px;line-height:38px;min-width:103px;margin-top:20px;padding:0 5px;color:#f36f20;border:1px solid #f36f20;">继续绑定</a>\
                <a href="javascript:;" data-username="'+phone+'" id="stopBind" class=" btn-orange" style="display: inline-block;height:38px;line-height:38px;min-width:103px;margin-top:20px;margin-left:8px;padding:0 5px;color:#fff;background-color:#f36f20;border:1px solid #f36f20;">登录已有账号</a>\
            </div>';
            $('.window_box').windowBox({
                width: 668,
                height: 395,
                title: "",
                wbcStr: str
            });
            $('.window_box_close').removeProp('onclick');
            $('.window_box_close').on('click',function(){
                if( confirm("未进行实名认证将不能使用其他功能哦，确定要退出吗？") ){
                    window_box_close();
                    setTimeout(function(){
                        window.location.href = '/new_login.php';
                    }, 2000 );
                }
            });
            /*登录已有帐号*/
            $('#stopBind').on('click',function(){
                var username=$(this).attr('data-username');
                window_box_close();
                setTimeout(function(){
                    window.location.href =  '/new_login.php?urlUsername='+username;
                }, 2000 );
            });
            /*继续绑定*/
            requestdata.step=7;
            $('#continueBind').on('click',function()
            {
                if(confirm('点击“确定”，您的手机号码将与之前的帐号解绑，并绑定在当前的新帐号上。'))
                {
                    $.ajax({
                        url: '//mobileapi.to8to.com/index.php',
                        type: 'get',
                        dataType: 'jsonp',
                        jsonpCallback: 'getBackFunc',
                        data: requestdata,
                        async: false,
                        success: function(data){
                            if( data.data.code == 1 )
                            {
                                window_box_close();
                                $('#bindmobile').val(phone);
                                $('#reg_form').submit();
                            }
                            else {
                                alert(data.data.msg.content);
                                return false;
                            }
                        },
                        error: function(err){
                            console.log(err);
                        }
                    });
                }
            });
}

//区域选项去除 当前市
$(function () {
    window.switchCity = function(){
        var t_city = $('#city').val()+'市';
        changeTown('shen','city','town');
        $('#town option').each(function(){
            if ($(this).text() === t_city) {
                $(this).remove();
            }
        })
    }
})
