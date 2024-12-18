
        var historyArr, historyDatd;
        //Statistics start
        chart2 = new Highcharts.Chart('container2', {
            chart: {
                /*backgroundColor: {
                 linearGradient: [30, 0, 500, 500],
                 stops: [
                 [0, 'rgb(54, 215, 128)'],
                 [1, 'rgb(28, 171, 217)']
                 ]
                 }*/
            },
            title: {
                text: 'Recent Seven days History',
                style: {
                    'color': '#a7a7a7',//rgb(11, 203, 157)
                    // 'font-family': '微软雅黑'
                },
                x: -0
            },
            subtitle: {
                //  text: '数据来源:zhihuyanglao.com',
                style: {
                    'font-family': '微软雅黑'
                },
                x: -0
            },
            //colors 是设置折现的颜色依次设置这里总共设置了10条
            colors: ['rgb(255, 105, 105)', '#dadada', '#90ed7d', '#f7a35c', '#8085e9',
                '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'
            ],
            xAxis: {
                //设置横坐标的最大项数，上限
                ceiling: 6,
                categories: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven',],
                tickmarkPlacement: 'on',
                tickLength: 5,
                tickPosition: 'inside',
            },
            yAxis: {
                ceiling: 200,
                // 定义刻度线在坐标轴上的分布的数组
                //tickPositions: [60, 105, 150],
                floor: 40,
                softMax: 200,
                softMin: 40,
                //minRange坐标轴展示的最小范围，整个坐标轴展示的范围将不会小于这个值
                minRange: 80,
                gridLineDashStyle: 'longdash',
                //去除Y标题 设置text：null
                title: {
                    text: null
                },
                categories: ['60', '90', '120'],
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
                // tickPositioner坐标轴刻度计算回调函数，该函数返回值是包含刻度位置的数组，即 tickPositions。
                tickPositioner: function () {
                    var positions = [],
                        tick = Math.floor(this.dataMin), //increment设置Y轴的增量
                        increment = Math.ceil((this.dataMax - this.dataMin) / 4);
                    for (tick; tick - increment <= this.dataMax; tick += increment) {
                        positions.push(tick);
                    }
                    return positions;
                }
            },
            //tooltip数据提示框指的当鼠标悬停在某点上时，以框的形式提示该点的数据
            tooltip: {
                //数据列 y 值得后缀字符串
                valueSuffix: '次/分',
                //shared 表示是否共享
                // shared: true
            },
            //legend右侧图列
            legend: {
                //   //图例说明是包含图表中数列标志和名称的容器
                //   layout: 'vertical',
                //  //表示水平方向
                // 	align: 'center',
                //   //表示垂直方向
                // 	verticalAlign: 'top',
                // itemDistance表示数据项布局的距离
                itemDistance: 20,
                //enabled默认为true false就隐藏
                enabled: true,
                borderWidth: 0,
            },
            credits: {
                enabled: false // 禁用版权信息
            },
            series: [{
                name: 'HeartRate(次/分)',
                data: [70, 72, 73, 84, 62, 60, 76]
            }],
            // navigation显示在导出模块中的按钮和菜单的选项集合。
            navigation: {
                buttonOptions: {
                    //影藏导出按钮
                    enabled: false
                }
            },
            //数据列配置 对数据列的事件操作
            plotOptions: {
                series: {
                    events: {
                        legendItemClick: function () {
                            //获取到点击的那个的元素的索引
                            var i = this.index;
                            //return false时表示点击不允许切换
                            //chart.series[1 - i].visible表示另一个是否可见
                            // 当点击一个的时候如果另一个是可见的点击元素就可以切换，如果另一个是影藏的就不能切换。return false;
                            //当有多条数据列时，通过数组长度来判断把不可见的从数组中一一删除（splice（index，个数，可选添加的项）方法），知道长度为1设置return false;
                            // if(!len==1){
                            // 	return true;
                            // 	arr.splice(this.index,1);
                            // } else{
                            // 	return false;
                            // } 当多条数据列时
                            if (chart.series[1 - i].visible) {
                                console.log("被点击图例的索引：" + i);
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                }
            }
        });
        //Statistics end
        $(".menuMeasure").click(function () {
            //获取当前点击的li对象
            //var $li = $(this);
            //获取当前点击的索引
            //var index = $li.index();
            //$li.addClass("on").siblings().removeClass("on");
            $("#Measure").show();
            $("#Statistics").hide();
        });
        $(".menuStatistics").click(function () {
            $.ajax({
                type: "GET",
                url: '/hr/history',
                dataType: 'json',
                // async: falses使ajax请求同步，当异步请求时，即javascript是非阻塞运行的，
                //  在$.ajax还没运行完console。log可能就执行了，所以控制台会打印Undefined
                //async: false,
                success: function (data) {
                    historyArr = eval(data); //arr是通过ajax从后台获取到的数据
                    //console.log("数据长度:" + arr[0].data.length);
                    historyDatd = historyArr.hrs;
                    for (var k = 0; k < historyDatd.length; k++) {
                        chart2.series[0].data[k].update(historyDatd[k]);
                    }
                    $(".min").html(historyArr.minBpm);
                    $(".max").html(historyArr.maxBpm);
                    $(".avg").html(historyArr.avgBpm);
                },
                error: function (err) {
                    console.log(err);
                }
            });
            $("#Statistics").show();
            $("#Measure").hide();
        });
        // line start
        $(function () {
            $(".menuStatistics").click(function () {
                $(".line").animate({
                    marginLeft: "62.5%"
                }, 500);
            });
        });
        $(function () {
            $(".menuMeasure").click(function () {
                $(".line").animate({
                    marginLeft: "12.5%"
                }, 500);
            });
        });
        $(function () {
            $.ajax({
                type: "GET",
                url: '/user/info',
                dataType: 'json',
                // async: falses使ajax请求同步，当异步请求时，即javascript是非阻塞运行的，
                //  在$.ajax还没运行完console。log可能就执行了，所以控制台会打印Undefined
                //async: false,
                success: function (data) {
                    console.log(data);
                    $(".name").html(data.username);
                },
                error: function (err) {
                    console.log(err);
                }
            });
        });
//line end
    
        var HeartFlag = 1;
        var timer = null,
            arr, stateData;
        //        $.ajax({
        //            type: "GET",
        //            url: '/hr/now',
        //            dataType: 'json',
        //            // async: falses使ajax请求同步，当异步请求时，即javascript是非阻塞运行的，
        //            //  在$.ajax还没运行完console。log可能就执行了，所以控制台会打印Undefined
        //            async: false,
        //            success: function(data) {
        //                arr = eval(data); //arr是通过ajax从后台获取到的数据
        //                console.log("数据长度:" + arr[0].data.length);
        //                for (i = 0; i < arr[0].data.length; i++) {
        //                    console.log("所有数据：" + arr[0].data[i]);
        //                    stateData = parseInt(arr[0].data[i]);
        //                    $('.number').html(stateData);
        //                }
        //            },
        //            error: function(err) {
        //                console.log(err);
        //            }
        //        });
        //实时的展现当前心率
        function activeLastPointToolip(chart) {
            var points = chart.series[0].points;
            //展示更新的数据
            chart.tooltip.refresh(points[points.length - 1]);
        }
        // 所有语言文字相关配置都设置在 lang 里
        Highcharts.setOptions({
            lang: {
                resetZoom: 'Reset',
                resetZoomTitle: 'ResetZoom'
            },
            global: {
                //useUT表示用国际时间
                useUTC: false
            }
        });
        //Measure start
        chart = new Highcharts.Chart('container', {
            chart: {
                backgroundColor: {
                    linearGradient: [30, 0, 500, 500],
                    stops: [
                        [0, 'rgb(255, 255, 255)'],
                        [1, 'rgb(255, 255, 255)']
                    ]
                },
                //  表示绘图区域的背景颜色，plotBackgroundColor: 'rgba(15, 188, 219, 1)',
                //  borderRadius:10,
                //  borderColor:'rgba(41, 210, 240, 0.63)',
                //  borderWidth:1,
                //margin 设置绘图区域距离边框的距离
                // margin: [60, 0, 25, 30],
                marginBottom: 30,
                //表示线条的样式为曲线
                type: 'spline',
                //zoomType表示缩放方式
                zoomType: 'x',
                //resetZoomButton表示选择缩放后出现的按钮，允许用户重置缩放比例。
                resetZoomButton: {
                    //设置重置缩放按钮的位置
                    position: {
                        x: -5,
                        y: 5
                    },
                    //表示相对与整个图表
                    relativeTo: 'chart'
                },
                animation: Highcharts.svg,
                events: {
                    //当数据加载时触发
                    load: function () {
                        // set up the updating of the chart each second
                        var series = this.series[0],
                            chart = this;
                        $("#start").click(function () {
                            if (HeartFlag == 1) {
                                timer = setInterval(function () {
                                    HeartFlag = 2;
                                    $.ajax({
                                        type: "GET",
                                        url: '/hr/now',
                                        dataType: 'json',
                                        // async: falses使ajax请求同步，当异步请求时，即javascript是非阻塞运行的，
                                        //  在$.ajax还没运行完console。log可能就执行了，所以控制台会打印Undefined
                                        async: false,
                                        success: function (data) {
                                            //arr = eval(data); //arr是通过ajax从后台获取到的数据
                                            //stateData=arr[0];
                                            stateData = data;
                                        },
                                        error: function (err) {
                                            // 未连接到服务器，随机生成随机数，做演示用；
                                            var test = Math.floor(Math.random()*40)+60;
                                            stateData = 
                                                {
                                                    signal : test,
                                                    bpm : test
                                                }
                                            console.log(err);
                                            console.log("未连接到服务器，随机生成随机数，做演示用");
                                        }
                                    });
                                    var x = (new Date()).getTime(), // current time
                                        y = stateData.signal,
                                        z = stateData.bpm;
                                    series.addPoint([x, y], true, true);
                                    //实时心率展示
                                    $('.number').html(z);
                                    //实时展示数据提示框
                                    activeLastPointToolip(chart);
                                }, 1000);
                            }
                        });
                    }
                }
            },
            title: {
                text: '心率',
                style: {
                    'color': '#fff',
                    'font-family': '微软雅黑',
                },
                //对标题的定位
                //  align:'left',
                //  y:25,
                x: -0
            },
            subtitle: {
                style: {
                    'font-family': '微软雅黑'
                },
                x: -0
            },
            //colors 是设置折现的颜色依次设置这里总共设置了10条
            colors: ['#fff', '#c7c650', '#90ed7d', '#f7a35c', '#8085e9',
                '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'
            ],
            xAxis: {
                visible: false,
                //type:'datetime'表示等间隔时间轴
                type: 'datetime',
                labels: {
                    overflow: 'justify'
                },
                //tickLength表示刻度线长度
                tickLength: 3,
                //tickmarkPlacement表示刻度线的位置
                tickmarkPlacement: 'on',
                tickPosition: 'inside',
                // dateTimeLabelFormats:{
                //   hour: '%H : %M'
                // } dateTimeLabelFormats时间轴标签的格式化字符串
                // endOnTick: false
            },
            yAxis: {
                // 定义刻度线在坐标轴上的分布的数组
                //tickPositions: [60, 105, 150],
                //gridLineDashStyle线条样式
                visible: false,
                gridLineDashStyle: 'longdash',
                //去除Y标题 设置text：null
                title: {
                    text: null
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }],
            },
            //tooltip数据提示框指的当鼠标悬停在某点上时，以框的形式提示该点的数据
            tooltip: {
                ////tooltip数据保留的小数位
                valueDecimals: 0,
                //数据列 y 值得后缀字符串
                valueSuffix: '',
                //shared 表示是否共享
                // shared: true
            },
            //legend右侧图列
            legend: {
                //   //图例说明是包含图表中数列标志和名称的容器
                //layout: 'vertical',
                //  //表示水平方向
                align: 'center',
                //   //表示垂直方向
                verticalAlign: 'middle',
                // itemDistance表示数据项布局的距离
                y: -45,
                x: -30,
                //enabled默认为true false就隐藏
                enabled: true,
                borderWidth: 0,
            },
            credits: {
                enabled: false // 禁用版权信息
            },
            series: [{
                name: '信号',
                data: (function () {
                    // generate an array of random data 生成随机数据的数组
                    var data = [],
                        time = (new Date()).getTime(), //获取当前系统
                        i;
                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000, //这里设置i=-19是为了第一个点为当前时间的前19秒将X轴分成20份，即最右边那份是当前时间。
                            y: 0 //
                        });
                    }
                    return data;
                }())
            }],
            // navigation显示在导出模块中的按钮和菜单的选项集合。
            navigation: {
                buttonOptions: {
                    //影藏导出按钮
                    enabled: false
                }
            },
            //数据列配置 对数据列的事件操作
            plotOptions: {
                series: {
                    events: {
                        legendItemClick: function () {
                            return false;
                        }
                    },
                    color: 'red'
                },
                //spline曲线图
                spline: {
                    lineWidth: 1.5,
                    states: {
                        hover: {
                            lineWidth: 2
                        }
                    },
                    //marker表示是否显示点
                    marker: {
                        enabled: false
                    },
                    //pointInterval表示数据点间隔
                    //pointInterval: 3600000, // one hour
                    //表示数据的起点
                    //  pointStart: Date.UTC(2017, 4, 24, 0, 0, 0)
                }
            }
        });
        //Measure end
        //点击停止测量start
        $("#start").click(function () {
            if (HeartFlag == 2) {
                clearInterval(timer);
                HeartFlag = 1;
                window.open("/result_page?bpm=" + stateData.bpm);
            }
            //$("#start").removeAttr("disabled","true").attr("style","background:rgb(11, 203, 157)");
        });
        //点击停止测量end
        //菜单start
        $(".menu1").click(function () {
            //  alert("nihao");
            //if(parseInt($(".border").css("left"))<0){
            $(".border").animate({
                left: "30px"
            }, 500);
            $(".border").animate({
                left: "0px"
            }, 400);
            $(".border3").click(function () {
                $(".border").animate({
                    left: "-280px"
                }, 400);
            });
        });
        $(".exit").click(function () {
            $(".border").animate({
                left: "30px"
            }, 500);
            $(".border").animate({
                left: "-280px"
            }, 400);
        });
  //菜单栏弹出框end
