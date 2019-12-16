import MusicType from "@/assets/data/musictype.json"    // 所有线路  
// 请求参数 
var state = ['运行', '空闲', '报警'];           // 状态描述
var colors = ["green", "gray", "red"]; // 状态颜色 

// 获取Echarts 所需的对象
function GetList(datalist1) {

    // var datalist = [];
    // var obj = { id: '11e9de67-3436-556c-8f92-0242ac110004', name: '7线', list: one };
    // datalist.push(obj);
    // var obj1 = { id: '11e9de6b-3543-9333-8f92-0242ac110004', name: '6线', list: two };
    // datalist.push(obj1);
    // var obj2 = { id: '11e9f165-e3a4-80d0-8f92-0242ac110004', name: '下缸体(8线)', list: three };
    // datalist.push(obj2);
    // var obj3 = { id: '11e9ef34-cfe8-153c-8f92-0242ac110004', name: '歧管L2', list: four };
    // datalist.push(obj3); 
    return GetEchartsObj(datalist1);
}
// 返回 Echarts 所需要的对象
function GetEchartsObj(datalist) {
    // 
    var y = [];         // Y轴
    var series = [];    // 内容
    MusicType.currentType.forEach(tmp => {
        // 形成Y轴
        y.push(tmp.name);
        // 数据添加到那条线
        var num = y.indexOf(tmp.name);
        // 遍历所有产品 
        datalist.filter(df => df.name === tmp.name).forEach(f => {
            // 
            var start = null;
            var end = null;
            var CurrentTime = null;
            var CurrentState = 0;
            var FirstTime = null;
            // 遍历每一个线路
            if (tmp.name == '6线') {
                // console(sortBykey(f.list, 'time'));
            }
            sortBykey(f.list, 'time').forEach((item, index) => {
                
                // 判断使用颜色
                var intstate = GetState(item['al'] * 1, item['rs'] * 1);
                // 当前数据时间
                CurrentTime = getdatastr(new Date(item['time']));
                // 第一条
                if (index === 0) {
                    start = CurrentTime;
                    CurrentState = intstate;
                    FirstTime = CurrentTime;
                }
                // 是否添加数据
                var tf = false;
                // 
                if (CurrentState === intstate && (new Date(CurrentTime).getTime() - f.intervals * 1000) === (new Date(FirstTime)).getTime()) {
                    end = CurrentTime;
                } else {
                    tf = true;
                }

                // 最后一条 
                if (index === f.list.length - 1) {
                    tf = true;
                }
                // 时间间隔不相等
                if ((new Date(CurrentTime).getTime() - f.intervals * 1000) !== (new Date(FirstTime)).getTime()) {
                    tf = true;
                }
                // 状态不相等
                if (CurrentState !== intstate) {
                    tf = true;
                }
                // 最后一条
                if (index === f.list.length - 1 && CurrentState !== intstate) {
                    series.push({
                        itemStyle:
                        {
                            normal: {
                                color: colors[CurrentState]  //条形颜色
                            }
                        },
                        name: f.name + ' ' + state[CurrentState],   // 悬浮时显示的名字
                        value: [num, FirstTime, CurrentTime==null?'1':CurrentTime] //0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
                    });
                }
                // 添加数据
                if (tf && index !== 0) {
                    if(end==null){end =start}
                    series.push({ 
                        itemStyle:
                        {
                            normal: {
                                color: colors[CurrentState]  //条形颜色 
                            },
                            emphasis: { label: { show: true } }
                        },
                        name: f.name + ' ' + state[CurrentState],   // 悬浮时显示的名字
                        value: [num, start, end] //0,1,2代表y轴的索引，后两位代表x轴数据开始和结束
                    });
                    start = end;
                    CurrentState = intstate;
                }
                // 定义上次时间
                FirstTime = CurrentTime;
            });
        });

    });
    // 返回数据
    var result = {
        y: y,
        series: series,
        state: state,
        colors: colors,
        datalist:datalist
    }
    return result;

}
// 对象集合排序
function sortBykey(ary, key) {
    return ary.sort(function (a, b) {
        let x = a[key] 
        let y = b[key]
        return x < y ? -1 : x < y ? 1 : 0;
    })
}
// 状态
function GetState(al, rs) {
    var intstate = 0;
    if (al * 1 !== 0) {
        return  2;
    } else if (rs * 1 === 3 && al * 1 === 0) {
        return  0;
    } else {
        return  1;
    }
}
// 返回时间
function getdatastr(date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + getzf(date.getDate()) + ' ' + getzf(date.getHours()) + ':' + getzf(date.getMinutes()) + ':' + getzf(date.getSeconds());
}
// 补0
function getzf(num) {
    if (parseInt(num) < 10) {
        num = "0" + num;
    }
    return num;
}
function GetStartTime() {
    return getdatastr(new Date(new Date().getTime() - 1 * 60 * 60 * 1000));
}
function GetEndTime() {
    return getdatastr(new Date());
}
var one = [
    {
        "time": "2019-12-03 14:19:00",
        "s1": 850,
        "f1": 380,
        "l1": 153,
        "t1": 2,
        "sn": 166,
        "op": 1,
        "rs": 3,
        "pn": 1108,
        "mpn": 8,
        "o": 0,
        "at": 39152,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:05",
        "s1": 840,
        "f1": 51,
        "l1": 15663,
        "t1": 2,
        "sn": 170,
        "op": 1,
        "rs": 3,
        "pn": 1102,
        "mpn": 8,
        "o": 0,
        "at": 42560,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:10",
        "s1": 0,
        "f1": 0,
        "l1": 2806,
        "t1": 1,
        "sn": 195,
        "op": 1,
        "rs": 3,
        "pn": 9001,
        "mpn": 8,
        "o": 0,
        "at": 49232,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:15",
        "s1": 6801,
        "f1": 6500,
        "l1": 7193,
        "t1": 1,
        "sn": 208,
        "op": 1,
        "rs": 3,
        "pn": 802,
        "mpn": 8,
        "o": 0,
        "at": 52688,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:20",
        "s1": 6803,
        "f1": 6500,
        "l1": 1803,
        "t1": 1,
        "sn": 212,
        "op": 1,
        "rs": 3,
        "pn": 802,
        "mpn": 8,
        "o": 0,
        "at": 59408,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:25",
        "s1": 6802,
        "f1": 6500,
        "l1": 8468,
        "t1": 1,
        "sn": 216,
        "op": 1,
        "rs": 3,
        "pn": 802,
        "mpn": 8,
        "o": 0,
        "at": 62688,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:30",
        "s1": 0,
        "f1": 30000,
        "l1": 63,
        "t1": 4,
        "sn": 238,
        "op": 1,
        "rs": 3,
        "pn": 9001,
        "mpn": 8,
        "o": 0,
        "at": 69280,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:35",
        "s1": 6001,
        "f1": 0,
        "l1": 267,
        "t1": 4,
        "sn": 250,
        "op": 1,
        "rs": 3,
        "pn": 803,
        "mpn": 8,
        "o": 0,
        "at": 72544,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:40",
        "s1": 6003,
        "f1": 0,
        "l1": 3350,
        "t1": 10,
        "sn": 282,
        "op": 1,
        "rs": 3,
        "pn": 804,
        "mpn": 8,
        "o": 0,
        "at": 79152,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:45",
        "s1": 6001,
        "f1": 1600,
        "l1": 391,
        "t1": 10,
        "sn": 283,
        "op": 1,
        "rs": 3,
        "pn": 804,
        "mpn": 8,
        "o": 0,
        "at": 82432,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:50",
        "s1": 7999,
        "f1": 2000,
        "l1": 1896,
        "t1": 5,
        "sn": 315,
        "op": 1,
        "rs": 3,
        "pn": 805,
        "mpn": 8,
        "o": 0,
        "at": 89040,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:55",
        "s1": 8000,
        "f1": 286,
        "l1": 466,
        "t1": 5,
        "sn": 327,
        "op": 1,
        "rs": 3,
        "pn": 805,
        "mpn": 8,
        "o": 0,
        "at": 92368,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    }
];
var two = [
    {
        "time": "2019-12-03 14:19:00",
        "s1": 866,
        "f1": 0,
        "l1": 6357,
        "t1": 2,
        "sn": 163,
        "op": 1,
        "rs": 3,
        "pn": 1108,
        "mpn": 8,
        "o": 0,
        "at": 8976,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:05",
        "s1": 844,
        "f1": 360,
        "l1": 4106,
        "t1": 2,
        "sn": 166,
        "op": 1,
        "rs": 3,
        "pn": 1108,
        "mpn": 8,
        "o": 0,
        "at": 12384,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:10",
        "s1": 850,
        "f1": 360,
        "l1": 186,
        "t1": 2,
        "sn": 176,
        "op": 1,
        "rs": 3,
        "pn": 1108,
        "mpn": 8,
        "o": 0,
        "at": 19264,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:15",
        "s1": 850,
        "f1": 360,
        "l1": 186,
        "t1": 2,
        "sn": 181,
        "op": 1,
        "rs": 3,
        "pn": 1108,
        "mpn": 8,
        "o": 0,
        "at": 22624,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:20",
        "s1": 850,
        "f1": 296,
        "l1": 184,
        "t1": 2,
        "sn": 189,
        "op": 1,
        "rs": 3,
        "pn": 801,
        "mpn": 8,
        "o": 0,
        "at": 29504,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:25",
        "s1": 850,
        "f1": 360,
        "l1": 184,
        "t1": 2,
        "sn": 193,
        "op": 1,
        "rs": 3,
        "pn": 1108,
        "mpn": 8,
        "o": 0,
        "at": 32912,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:30",
        "s1": 852,
        "f1": 0,
        "l1": 795,
        "t1": 2,
        "sn": 205,
        "op": 1,
        "rs": 3,
        "pn": 1108,
        "mpn": 8,
        "o": 0,
        "at": 39808,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:35",
        "s1": 850,
        "f1": 360,
        "l1": 178,
        "t1": 2,
        "sn": 208,
        "op": 1,
        "rs": 3,
        "pn": 1108,
        "mpn": 8,
        "o": 0,
        "at": 43200,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:40",
        "s1": 6298,
        "f1": 6300,
        "l1": 5874,
        "t1": 1,
        "sn": 243,
        "op": 1,
        "rs": 3,
        "pn": 802,
        "mpn": 8,
        "o": 0,
        "at": 50016,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:45",
        "s1": 6302,
        "f1": 6300,
        "l1": 2462,
        "t1": 1,
        "sn": 247,
        "op": 1,
        "rs": 3,
        "pn": 802,
        "mpn": 8,
        "o": 0,
        "at": 53520,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:50",
        "s1": 6303,
        "f1": 6286,
        "l1": 2110,
        "t1": 1,
        "sn": 248,
        "op": 1,
        "rs": 3,
        "pn": 802,
        "mpn": 8,
        "o": 0,
        "at": 56976,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:55",
        "s1": 0,
        "f1": 0,
        "l1": 144,
        "t1": 4,
        "sn": 270,
        "op": 1,
        "rs": 3,
        "pn": 9001,
        "mpn": 8,
        "o": 0,
        "at": 63856,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    }
];
var three = [
    {
        "time": "2019-12-03 14:19:00",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 0,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:05",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 0,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:10",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 1,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:15",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 0,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:20",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 0,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:25",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 3,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:30",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 0,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:35",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 0,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:40",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 0,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:45",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 0,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:50",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 0,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:55",
        "s1": 0,
        "f1": 0,
        "l1": 1,
        "t1": 0,
        "sn": 26,
        "op": 1,
        "rs": 0,
        "pn": 1,
        "mpn": 1,
        "o": 0,
        "at": 95344,
        "alm": "",
        "al": 0,
        "sr": 100,
        "fr": 100
    }
];
var four = [
    {
        "time": "2019-12-03 14:19:00",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:05",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:10",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:15",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:20",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:25",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:30",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:35",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:40",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:45",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:50",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    },
    {
        "time": "2019-12-03 14:19:55",
        "s1": 0,
        "f1": 0,
        "l1": 10,
        "t1": 16,
        "sn": 0,
        "op": 1,
        "rs": 0,
        "pn": 1122,
        "mpn": 1122,
        "o": 0,
        "at": 7352,
        "alm": "1,emergency stop",
        "al": 1,
        "sr": 100,
        "fr": 100
    }
]
export { GetList };