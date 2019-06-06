/**
 * 检查是否完成起点/终点放置
 * @returns {Boolean} 是否完成
 */
function check() {
	if (sx == -1) {
		alert("请设置起点!");
		return false;
	} else if (ex == -1) {
		alert("请设置终点!");
		return false;
	}
	return true;
}
/**
 * 使地图向前运行一步
 */
function go() {
	if (!check()) return;
	if (hasBegan == 0) {
		hasBegan = 1;
		state = 0;
		$("#btns1").attr("disabled", true);
		$("#btns2").attr("disabled", true);
		$("#btns3").attr("disabled", true);
		dfs(sx, sy);
		$("#ball").show();
	}
	if (actionList[nowStep][0] == 'M') M(actionList[nowStep][1], actionList[nowStep][2]);
	else B(actionList[nowStep][1], actionList[nowStep][2], actionList[nowStep][3], actionList[nowStep][4]);
	nowStep++;
	if (nowStep >= actionList.length) {
		$("#btn").attr("disabled", true);
		$("#btn").text('已到达');
		$("#btn2").attr("disabled", true);
		$("#btn2").text('到达');
		if (auto == 1) window.clearInterval(timer);
		hasArrived = 1, auto = 0;
	}
}
/**
 * 移动小球 
 * @param {Number} x 移动目标x
 * @param {Number} y 移动目标y
 */
function M(x, y) {
	$("div[posx=" + x + "][posy=" + y + "]").removeClass("Wcolor").addClass("Gcolor");
	$("#ball").css("top", x * siz + deltax);
	$("#ball").css("left", y * siz + deltax);
}
/**
 * 返回时移动小球 
 * @param {Number} nx 当前位置x
 * @param {Number} ny 当前位置y
 * @param {Number} x 移动目标x
 * @param {Number} y 移动目标y
 */
function B(nx, ny, x, y) {
	$("div[posx=" + nx + "][posy=" + ny + "]").addClass("back");
	$("#ball").css("top", x * siz + deltax);
	$("#ball").css("left", y * siz + deltax);
}
/**
 * 设置一个方块的内容
 * @param {String} str 内容字符串
 * @param {Number} x 目标x
 * @param {Number} y 目标y
 * @description 未使用
 */
function setStringForDiv(str, x, y) {
	$("div[posx=" + x + "][posy=" + y + "]").text(str);
}
/**
 * 设置一行的内容
 * @param {String} str 内容字符串
 * @param {Number} x 目标x
 * @description 未使用
 */
function setStringForLine(str, x) {
	$("div[name=\"line\"][posx=" + x + "]").text(str);
}

var hasinverted = false, //是否切换地图颜色
	hasInterested = false; //是否开启liv2d
/**
 * 切换地图颜色(亮色/暗色)
 */
function invertColor() {
	if (!hasinverted) $("#mapcontainer").addClass("inverted grey"), hasinverted = true;
	else $("#mapcontainer").removeClass("inverted grey"), hasinverted = false;
}
$(function () {
	$("[depend=\"1\"]").hide();
	$("[depend=\"2\"]").hide();
	$("#btn3").on("click", function () {
		speed = Number($("#in1").val());
		if (auto == 1) {
			window.clearInterval(timer);
			timer = setInterval("go()", speed);
		}
	});
	$("#btn2").on("click", function () {
		if (hasArrived == 1) return;
		if (auto == 0 && check()) {
			auto = 1;
			timer = setInterval("go()", speed);
			$("#btn2").text('暂停');
		} else if (auto == 1) {
			auto = 0;
			window.clearInterval(timer);
			$("#btn2").text('继续');
		}
	});
	$("#btn7").on("click", function () {
		getRemoteList();
	});
	$("#btns1").on("click", function () {
		state = 1;
	});
	$("#btns2").on("click", function () {
		state = 2;
	});
	$("#btns3").on("click", function () {
		state = 3;
	});
	$("#btn4").on("click", function () {
		maxSize = Number($("#in2").val());
		if (maxSize == 0) return;
		init();
		generateMap();
		$("[depend=\"3\"]").hide();
		$("[depend=\"1\"]").show();
		$("[depend=\"2\"]").show();
	});
	$("#btn5").on("click", function () {
		localLoad($("#in3").val());
	});
	$("#btn6").on("click", function () {
		remoteLoad($("#in3").val());
	});
	$("#defaultbutton").on("click", function () {
		remoteLoad("test1size30");
	});
	$("#debug").on("click", function () {
		setInterval(function () {
			$("#demo").html(
				'dfsEnd=' + dfsEnd + '<br />' +
				'hasBegan=' + hasBegan + '<br />' +
				'hasArrived=' + hasArrived + '<br />' +
				'auto=' + auto + '<br />' +
				'nowStep=' + nowStep + '<br />' +
				'actionList.length=' + actionList.length + '<br />' +
				'state=' + state + '<br />' +
				'speed=' + speed + '<br />' +
				'maxSize=' + maxSize + '<br />' +
				'sx=' + sx + '<br />' +
				'sy=' + sy + '<br />' +
				'ex=' + ex + '<br />' +
				'ey=' + ey
			);
		}, 10);
	});
	$("#hehe").on("click", function () {
		if (!hasInterested) {
			$("body").prepend("<script src=\"/static/live2d/autoload.js\"></script>");
			hasInterested = true;
		}
	});
});