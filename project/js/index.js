/*--String.prototype--*/
~function (pro) {
    function queryURLParameter() {
        var reg = /([^?=&#]+)=([^?=&#]+)/g,
            obj = {};
        this.replace(reg, function () {
            obj[arguments[1]] = arguments[2];
        });
        return obj;
    }

    pro.queryURLParameter = queryURLParameter;
}(String.prototype);


/*--LOADING--*/
var loadingRender = (function () {
    var ary = ["icon.png", "zf_concatAddress.png", "zf_concatInfo.png", "zf_concatPhone.png", "zf_course.png", "zf_course1.png", "zf_course2.png", "zf_course3.png", "zf_course4.png", "zf_course5.png", "zf_course6.png", "zf_cube1.png", "zf_cube2.png", "zf_cube3.png", "zf_cube4.png", "zf_cube5.png", "zf_cube6.png", "zf_cubeBg.jpg", "zf_cubeTip.png", "zf_emploment.png", "zf_messageArrow1.png", "zf_messageArrow2.png", "zf_messageChat.png", "zf_messageKeyboard.png", "zf_messageLogo.png", "zf_messageStudent.png", "zf_outline.png", "zf_phoneBg.jpg", "zf_phoneDetail.png", "zf_phoneListen.png", "zf_phoneLogo.png", "zf_return.png", "zf_style1.jpg", "zf_style2.jpg", "zf_style3.jpg", "zf_styleTip1.png", "zf_styleTip2.png", "zf_teacher1.png", "zf_teacher2.png", "zf_teacher3.jpg", "zf_teacher4.png", "zf_teacher5.png", "zf_teacher6.png", "zf_teacherTip.png"];

    //->获取需要操作的元素
    var $loading = $('#loading'),
        $progressBox = $loading.find('.progressBox');
    var step = 0,
        total = ary.length;

    return {
        init: function () {
            $loading.css('display', 'block');

            //->循环加载所有的图片,控制进度条的宽度
            $.each(ary, function (index, item) {
                var oImg = new Image;
                oImg.src = 'img/' + item;
                oImg.onload = function () {
                    step++;
                    $progressBox.css('width', step / total * 100 + '%');
                    oImg = null;

                    //->所有图片都已经加载完毕:关闭LOADING,显示PHONE
                    if (step === total) {
                        if (page === 0) return;
                        window.setTimeout(function () {
                            $loading.css('display', 'none');
                            phoneRender.init();
                        }, 2000);
                    }
                }
            });
        }
    }
})();

/*--PHONE--*/
var phoneRender = (function () {
    var $phone = $('#phone'),
        $listen = $phone.children('.listen'),
        $listenTouch = $listen.children('.touch'),
        $details = $phone.children('.details'),
        $detailsTouch = $details.children('.touch'),
        $time = $phone.children('.time');

    var listenMusic = $('#listenMusic')[0],
        detailsMusic = $('#detailsMusic')[0],
        musicTimer = null;

    //->detailsMusicFn:播放自我介绍的音频,并且计算音频播放的进度
    function detailsMusicFn() {
        detailsMusic.play();
        musicTimer = window.setInterval(function () {
            var curTime = detailsMusic.currentTime,
                minute = Math.floor(curTime / 60),
                second = Math.floor(curTime);
            minute < 10 ? minute = '0' + minute : null;
            second < 10 ? second = '0' + second : null;
            $time.html(minute + ':' + second);

            //->音频播放完成
            if (curTime === detailsMusic.duration) {
                window.clearInterval(musicTimer);
                closePhone();
            }
        }, 1000);
    }

    //->closePhone:关闭当前的PHONE区域展示下一个区域
    function closePhone() {
        detailsMusic.pause();
        $phone.css('transform', 'translateY(' + document.documentElement.clientHeight + 'px)').on('webkitTransitionEnd', function () {
            $phone.css('display', 'none');
        });
        messageRender.init();
    }

    return {
        init: function () {
            $phone.css('display', 'block');
            listenMusic.play();

            //->给LISTEN中的TOUCH绑定单击事件:移动端的单击事件使用CLICK会存在一个300MS的延迟,我们需要使用touchstart/touchmove/touchend来进行模拟,Zepto中的singleTap就是封装好的一个操作方法
            $listenTouch.singleTap(function () {
                $listen.css('display', 'none');
                listenMusic.pause();

                $details.css('transform', 'translateY(0)');
                $time.css('display', 'block');
                detailsMusicFn();
            });

            //->给DETAILS中的TOUCH绑定单击事件
            $detailsTouch.singleTap(closePhone);
        }
    }
})();


/*--MESSAGE--*/
var messageRender = (function () {
    return {
        init: function () {

        }
    }
})();

var urlObj = window.location.href.queryURLParameter(),
    page = parseFloat(urlObj['page']);

if (page === 0 || isNaN(page)) {
    loadingRender.init();
}

if (page === 1) {
    phoneRender.init();
}
