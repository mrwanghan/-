(function($, root){
    var $scope = $(document.body),
        curTime,
        lyricSign,
        timeSign,
        lyricTimeNum = [],
        lyricTimeNumMax,
        y = 15.2,
        j = 0;
    function render(lyric){                 //读取音乐文件
        var reg = /\[(.+)\](.+)?/;              //正则匹配歌词的 时间部分 和 内容部分
        var lyricTime = [],
            lyricContent = [],
            lyricTimeMinite = [],
            lyricTimeSecond = [],
            lyricLi = "";
        for(var i = 0; i < lyric.length; i++){
            lyricTime[i] = lyric[i].match(reg)[1];
            lyricContent[i] = lyric[i].match(reg)[2];
            
            lyricTimeMinite[i] = lyricTime[i].split(":")[0];
            lyricTimeMinite[i] = Math.abs(lyricTimeMinite[i]);

            lyricTimeSecond[i] = lyricTime[i].split(":")[1];
            lyricTimeSecond[i] = Math.abs(lyricTimeSecond[i]);

            lyricTimeNum[i] = lyricTimeMinite[i] * 60 + lyricTimeSecond[i];     //歌词时间（以秒为单位）
        }
        lyricTimeNumMax = lyricTimeNum[0];                              
        for(var i = 1; i < lyricTimeNum.length; i++){
            if (lyricTimeNumMax < lyricTimeNum[i] - lyricTimeNum[i - 1]) {
                lyricTimeNumMax = lyricTimeNum[i] - lyricTimeNum[i - 1];
            }
        }
        lyricTimeNumMax = Math.ceil(lyricTimeNumMax);                           //两句歌词最大间隔时间

        for(var i = 0; i < lyricContent.length; i++){
            lyricLi += "<li class='song-lyric-line'>" + lyricContent[i] + "</li>";
        }
        $scope.find(".song-lyric-content").html(lyricLi);
    }
    function show(){                                                            //歌词展示
        function lyricMove(y){
            $scope.find(".song-lyric-content").css({"transform": "translateY("+y+"vh)"});
        }
        $scope.find(".lyric-time").on('DOMNodeInserted',function(){
            curTime = $scope.find(".lyric-time").text(); 
            for(var i = 0; i < 80; i++){
                if(curTime - lyricTimeNum[i] >= 0 && curTime - lyricTimeNum[i] <= lyricTimeNumMax){
                    lyricMove(10 - 5.2*i);
                    $scope.find(".song-lyric-line").removeClass("light");
                    $scope.find(".song-lyric-line").eq(i).addClass("light");
                }
            }
        })
    }
    root.lyric = {
        render: function(data) {
                    render(data.lyric); 
                },
        show: show
    }
}(window.Zepto,window.player||(window.player = {})))