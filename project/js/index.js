/*--LOADING--*/
var loadingRender = (function () {
    var ary = ["icon.png", "zf_concatAddress.png", "zf_concatInfo.png", "zf_concatPhone.png", "zf_course.png", "zf_course1.png", "zf_course2.png", "zf_course3.png", "zf_course4.png", "zf_course5.png", "zf_course6.png", "zf_cube1.png", "zf_cube2.png", "zf_cube3.png", "zf_cube4.png", "zf_cube5.png", "zf_cube6.png", "zf_cubeBg.jpg", "zf_cubeTip.png", "zf_emploment.png", "zf_messageArrow1.png", "zf_messageArrow2.png", "zf_messageChat.png", "zf_messageKeyboard.png", "zf_messageLogo.png", "zf_messageStudent.png", "zf_outline.png", "zf_phoneBg.jpg", "zf_phoneDetail.png", "zf_phoneListen.png", "zf_phoneLogo.png", "zf_return.png", "zf_style1.jpg", "zf_style2.jpg", "zf_style3.jpg", "zf_styleTip1.png", "zf_styleTip2.png", "zf_teacher1.png", "zf_teacher2.png", "zf_teacher3.jpg", "zf_teacher4.png", "zf_teacher5.png", "zf_teacher6.png", "zf_teacherTip.png"];

    //->获取需要操作的元素
    var $loading = $('#loading'),
        $progressEm = $loading.find('.progressEm');
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
                    $progressEm.css('width', step / total * 100 + '%');
                    oImg = null;

                    //->所有图片都已经加载完毕:关闭LOADING,显示PHONE
                    if (step === total) {
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
    var $phone = $('#phone');

    return {
        init: function () {
            $phone.css('display', 'block');
        }
    }
})();


loadingRender.init();