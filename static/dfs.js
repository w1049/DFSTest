/**
 * 初始化
 */
function init() {
	vis = Array(maxSize);
	block = Array(maxSize);
	for (var i = 0; i < maxSize; i++) {
		vis[i] = Array.apply(null, Array(maxSize)).map(() => 0);
		block[i] = Array.apply(null, Array(maxSize)).map(() => 0);
	}
}
/**
 * dfs函数
 * @param {Number} x
 * @param {Number} y
 */
function dfs(x, y) {
	if (dfsEnd == 1) return;
	if (x == ex && y == ey) {
		actionList.push(['M', x, y]);
		dfsEnd = 1;
		//console.log('Done');
		return;
	}
	//console.log('hi');
	vis[x][y] = 1;
	actionList.push(['M', x, y]);
	for (var i = 0; i < 4; i++) {
		var nx = x + mx[i];
		var ny = y + my[i];
		//console.log('nx='+nx+',ny='+ny);
		if (dfsEnd == 0 && nx >= 0 && nx < maxSize && ny >= 0 && ny < maxSize && block[nx][ny] == 0 && vis[nx][ny] == 0) {
			dfs(nx, ny);
			if (dfsEnd == 0) actionList.push(['B', nx, ny, x, y]);
		}
	}
}