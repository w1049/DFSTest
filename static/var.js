var siz = 40, //方块大小(px)
    ballsiz = 20, //小球大小(px)
    speed = 150, //默认自动运行速度
    maxSize = 0, //地图大小(方块)
    sx = -1, //起点x
    sy = -1, //起点y
    ex = -1, //终点x
    ey = -1, //终点y
    mx = [-1, 1, 0, 0], //x方向移动
    my = [0, 0, -1, 1], //y方向移动
    timer, //自动计时器
    deltax = (siz - ballsiz) / 2.0, //小球在方块内相对坐标
    vis, //已经过数组(dfs)
    block, //障碍数组(dfs)
    dfsEnd = 0, //1:dfs已结束
    hasBegan = 0, //1:已开始地图运行
    hasArrived = 0, //1:小球已到达终点
    auto = 0, //1:当前正在自动运行
    nowStep = 0, //地图运行步数
    state = 0, //当前设置状态 1:障碍 2:起点 3:终点
    mapdata, //地图数据
    mapjson, //地图数据
    actionList = []; //地图运行各步列表