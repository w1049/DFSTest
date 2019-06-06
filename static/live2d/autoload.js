$("<link>").attr({href: "/static/live2d/waifu.css", rel: "stylesheet", type: "text/css"}).appendTo('head');
$('body').append('<div class="waifu"><div class="waifu-tips"></div><canvas id="live2d" class="live2d"></canvas><div class="waifu-tool"><span class="fui-home"></span> <span class="fui-chat"></span> <span class="fui-eye"></span> <span class="fui-user"></span> <span class="fui-photo"></span> <span class="fui-info-circle"></span> <span class="fui-cross"></span></div></div>');
$.ajax({url: "/static/live2d/waifu-tips.js", dataType:"script", cache: true, success: function() {
    $.ajax({url: "/static/live2d/live2d.js", dataType:"script", cache: true, success: function() {
        live2d_settings['hitokotoAPI'] = "hitokoto.cn";  // 一言 API
        live2d_settings['modelId'] = 1;                  // 默认模型 ID
        live2d_settings['modelTexturesId'] = 7;          // 默认材质 ID
        live2d_settings['modelStorage'] = false;         // 不储存模型 ID
        live2d_settings['canTurnToAboutPage'] = false;
        live2d_settings['canTurnToHomePage'] = false;
        initModel("/static/live2d/waifu-tips.json");
    }});
}});

