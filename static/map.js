/**
 * 设置某处为障碍
 * @param {Number} x 目标x
 * @param {Number} y 目标y
 */
function setBlock(x, y) {
	block[x][y] = 1;
	$("div[posx=" + x + "][posy=" + y + "]").removeClass("Wcolor").addClass("Rcolor");
}
/**
 * 取消某处障碍
 * @param {Number} x 目标x
 * @param {Number} y 目标y
 */
function removeBlock(x, y) {
	block[x][y] = 0;
	$("div[posx=" + x + "][posy=" + y + "]").removeClass("Rcolor").addClass("Wcolor");
}
/**
 * 切换某处障碍状态(有/无)
 * @param {Number} x 目标x
 * @param {Number} y 目标y
 */
function toggleBlock(x, y) {
	//console.log(x + " " + y);
	if (block[x][y] == 1) removeBlock(x, y);
	else setBlock(x, y);
}
/**
 * 生成地图
 */
function generateMap() {
	if (siz * maxSize > $("#maincontainer").width() * 0.8) {
		siz = $("#maincontainer").width() * 0.8 / maxSize;
		ballsiz = 0.5 * siz;
		deltax = (siz - ballsiz) / 2.0;
	}
	var tmp = "<div id=\"Big\" class=\"float\" style=\"height:" + siz * maxSize + "px;width:" + siz * maxSize + "px;border:1px solid;position:relative;\">";
	tmp += "<div id=\"ball\" class=\"ball Bcolor\" style=\"height:" + ballsiz + "px;width:" + ballsiz + "px;left:" + deltax + "px;top:" + deltax + "px;\"></div>";
	for (var i = 0; i < maxSize; i++) {
		tmp += "<div name=\"line\" posx=" + i + " style=\"height:" + siz + "px;width:" + siz * maxSize + "px;\">";
		for (var j = 0; j < maxSize; j++) tmp += "<div name=\"cell\" class=\"cell Wcolor\" posx=" + i + " posy=" + j + " style=\"height:" + siz + "px;width:" + siz + "px;font-size:" + siz * 0.8 + "px;\" onclick=\"clickDiv(this)\"></div>";
		tmp += "</div>";
	}
	tmp += "</div>";
	$("#mapcontainer").prepend(tmp);
	$("#ball").hide();
}
/**
 * 设置起点
 * @param {Number} x 目标x
 * @param {Number} y 目标y
 */
function setS(x, y) {
	$("div[posx=" + sx + "][posy=" + sy + "]").text('');
	$("div[posx=" + x + "][posy=" + y + "]").text('S');
	sx = x;
	sy = y;
}
/**
 * 设置终点
 * @param {Number} x 目标x
 * @param {Number} y 目标y
 */
function setE(x, y) {
	$("div[posx=" + ex + "][posy=" + ey + "]").text('');
	$("div[posx=" + x + "][posy=" + y + "]").text('E');
	ex = x;
	ey = y;
}
/**
 * 点击div时触发, 改变div状态
 * @param {*} obj div对象
 */
function clickDiv(obj) {
	var x = Number($(obj).attr("posx")),
		y = Number($(obj).attr("posy"));
	//console.log(x+' '+y);
	//console.log('x='+x+',y='+y+',sx='+sx+',sy='+sy+',ex='+ex+',ey='+ey);
	if ((x == sx && y == sy) || (x == ex && y == ey)) return;
	//console.log('choose');
	if (state == 1)
		toggleBlock(x, y);
	else if (state == 2 && block[x][y] == 0)
		setS(x, y);
	else if (state == 3 && block[x][y] == 0)
		setE(x, y);
}
/**
 * TheMap对象构造函数
 * @constructor
 */
function TheMap() {
	this.size = maxSize;
	this.sx = sx;
	this.sy = sy;
	this.ex = ex;
	this.ey = ey;
	this.blist = [];
	for (var i = 0; i < maxSize; i++) {
		for (var j = 0; j < maxSize; j++) {
			//console.log(i+' '+j);
			//console.log(block[i][j]);
			if (block[i][j] == 1) {
				this.blist.push([i, j]);
			}
		}
	}
}
/**
 * 将地图保存为对象存入mapdata与mapjson
 */
function save() {
	mapdata = new TheMap();
	mapjson = JSON.stringify(mapdata);
}
/**
 * 从mapdata中读取地图
 */
function load() {
	$("#Big").remove();
	maxSize = mapdata.size;
	sx = mapdata.sx;
	sy = mapdata.sy;
	ex = mapdata.ex;
	ey = mapdata.ey;
	generateMap();
	$("div[posx=" + sx + "][posy=" + sy + "]").text('S');
	$("div[posx=" + ex + "][posy=" + ey + "]").text('E');
	init();
	for (var i = 0; i < mapdata.blist.length; i++)
		setBlock(mapdata.blist[i][0], mapdata.blist[i][1]);
	$("[depend=\"3\"]").hide();
	$("[depend=\"1\"]").show();
	$("[depend=\"2\"]").show();
}
/**
 * 将mapjson中的地图保存在localStorage中
 * @param {String} id 地图ID
 */
function localSave(id) {
	save();
	window.localStorage.setItem(id, mapjson);
}
/**
 * 从localStorage中读取mapjson并加载
 * @param {String} id 地图ID
 */
function localLoad(id) {
	mapjson = window.localStorage.getItem(id);
	if (mapjson == null) {
		$("#demo").text('"' + id + '"不存在');
		return false;
	}
	mapdata = JSON.parse(mapjson);
	load();
	return true;
}
/**
 * 从服务器中读取mapjson并加载
 * @param {String} id 地图ID
 */
function remoteLoad(id) {
	$.ajax({
		url: "/json",
		method: "POST",
		async: true,
		data: {
			"jsonId": id
		},
		success: function (result) {
			//$("code").text(result);
			mapdata = JSON.parse(result);
			if (mapdata.code != 0) {
				$("#demo").text(mapdata.message);
				return false;
			} else {
				load();
				return true;
			}
		}
	});
}
/**
 * 获取服务器地图列表
 */
function getRemoteList() {
	$.ajax({
		url: "/getlist",
		method: "POST",
		async: true,
		success: function (result) {
			var res = JSON.parse(result);
			$("#demo").html(res.list.replace(/\n/g, '<br />'));
		}
	});
}