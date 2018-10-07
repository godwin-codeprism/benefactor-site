$(window).on('load', init);
$(window).resize(function () {
    init('resize');
    $('.icon-inner-block').hide();
})
$(window).scroll(function () {
    init('scroll');
    navControl();
    iconBlocksDisplay($(window).scrollTop());
})

function init(cmd) {
    if (cmd == "resize" || cmd == "scroll") {
        $('.blurbox:eq(0)').length > 0 ? setBlurClip() : false;
        $('#home-styles').length > 0 ? setTimeout(function(){homeStyles($('#home-styles'))},600) : false;
    } else if (typeof cmd == "object") {
        $('.blurbox:eq(0)').length > 0 ? setBlurClip() : false;
        $('#home-styles').length > 0 ? homeStyles($('#home-styles')) : false;
        String.prototype.splice = function (idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };
        $('.gallery-img-block').click(openModal);
        $('form:eq(0)').hasClass('home-style-form') ? false : $('form:eq(0)').submit(submitForm);
        homeStylesInit();
    }
}

function iconBlocksDisplay(w) {
    if (w > 400) {
        $('.icon-inner-block').show();
    }
}

function navControl() {
    if ($(window).scrollTop() > 20) {
        $('nav').removeClass('navbar-trans');
    } else {
        $('nav').addClass('navbar-trans');
    }
}
window.setBlurClip = function () {
    var elm = $('.blurbox:eq(0)');
    var _top = Math.round(elm.offset().top) - $(window).scrollTop();
    var _left = Math.round(elm.offset().left);
    var _bottom = Math.round(700 - (elm.offset().top + elm.height())) + $(window).scrollTop();
    var _right = Math.round(elm.offset().left);
    var clipPath = 'inset(' + _top + 'px ' + _right + 'px ' + _bottom + 'px ' + _left + 'px)';
    var clip = 'rect(' + Math.round(elm.offset().top - $(window).scrollTop()) + 'px ' + Math.round(elm.offset().left + elm.width()) + 'px ' + (Math.round(elm.offset().top + elm.height()) - $(window).scrollTop()) + 'px ' + elm.offset().left + 'px)';
    $('.blurbox-background:eq(0)').css({
        //'clip-path': clipPath,
        'clip': clip
    });
}

function openModal(e) {
    var src = $(this).find('img').attr('src');
    var src_xl = src.splice(src.length - 4, 0, "_xl");
    var image_xl = new Image();
    image_xl.src = src_xl;
    image_xl.onload = function () {
        $('.image-model img').removeClass('potrait_img_landscape');
        $('.image-model img').removeClass('landscape_img_landscape');
        $('.image-model img').removeClass('landscape_img');
        $('.image-model img').removeClass('potrait_img');
        if ($(window).width() < $(window).height()) {
            if (this.width < this.height) {
                $('.image-model img').addClass('potrait_img');
            } else {
                $('.image-model img').addClass('landscape_img');
            }
        } else {
            if (this.width < this.height) {
                $('.image-model img').addClass('potrait_img_landscape');
            } else {
                $('.image-model img').addClass('landscape_img_landscape');
            }
        }
    }
    $('.image-model img').attr('src', src_xl);
    $('.image-model').removeClass('image-model-hidden');
}

window.scrollToForm = function () {
    $('html, body').animate({
        scrollTop: $('#inputname').offset().top - 210
    }, 500);
    setTimeout(function () {
        $('#inputname').focus()
    }, 500);
}

window.submitForm = function (e) {
    e.preventDefault();
    if (grecaptcha.getResponse().length > 0) {
        $('[type="submit"]').addClass('disabled');
        $('#recaptcha_msg').hide();
        var data = {};
        var rawData = JSON.parse(JSON.stringify($(this).serializeArray()));
        rawData.forEach(function (element) {
            data[element.name] = element.value;
        }, this);
        $.ajax({
            type: "POST",
            url: "./endpoints/send-mail.php",
            dataType: 'text',
            data: {
                myData: JSON.stringify(data)
            },
            complete: function (r) {
                if (r.responseText == "ok") {
                    $('.form-hide').show();
                    $('.form-hide').css('display', 'flex');
                } else {
                    $('#recaptcha_msg').html("Some thing went wrong! Please try again.");
                    $('#recaptcha_msg').show();
                    $('[type="submit"]').removeClass('disabled');
                }
            }
        })
    } else {
        $('#recaptcha_msg').show();
    }


}