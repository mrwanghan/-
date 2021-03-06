var $ = window.Zepto;
var root = window.player;
var $scope = $(document.body);
var render = root.render;
var processor = root.processor;
var playList = root.playList;
var lyric = root.lyric;
var controlManager = root.controlManager;
var controlmanager;
var audioplayer = new root.audioPlayer();
var songList;
var lock = false;

audioplayer.audio.addEventListener("canplaythrough",function(){
    lock = true;
    console.log("ok")
},false);

// $scope.on(".btn-welcome").on("click", function(){
//     $scope.find("header").css({"display":"none"});
//     $scope.find(".wrapper").css({"visibility":"visible"});
// })
$scope.on("play:change", function(event, index, flag){
    var curSong = songList[index];
    render(curSong);
    lyric.render(curSong);          
    audioplayer.setAudioSource(curSong.audio);
    if(audioplayer.status == "play" || flag){
        if(lock){
            console.log("chenggong1")
            audioplayer.play();
            processor.start();
            lyric.show(); 
        } 
    }
    processor.renderTime(curSong.duration);
})
$scope.find(".play-btn").on("click", function() {
    $scope.find(this).toggleClass("playing")
    //if(lock){
        if(audioplayer.status == "pause"){
            audioplayer.play();
            processor.start();
            lyric.show(); 
        }else{
            audioplayer.pause();
            processor.stop();
        }
    //}
})
$scope.find(".prev-btn").on("click", function() {
    var index = controlmanager.prev();
    $scope.trigger("play:change", index);
})
$scope.find(".next-btn").on("click", function() {
    var index = controlmanager.next();
    $scope.trigger("play:change", index);
})
$scope.find(".like-btn").on("click", function() {
    $scope.find(this).toggleClass("liked");
})
$scope.find(".list-btn").on("click", function() {
    playList.show(controlmanager);
})

function bindTouch(){
    var $sliderPoint = $scope.find(".slider-point");
    var offset = $scope.find(".pro-wrapper").offset();
    var left = offset.left;
    var width = offset.width;
    $sliderPoint.on("touchstart", function(e){
        processor.stop();
    }).on("touchmove", function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1){
            percentage = 1;
        }else if(percentage < 0){
            percentage = 0;
        }
        processor.updata(percentage);
    }).on("touchend",function(e){
        var x = e.changedTouches[0].clientX;
        var percentage = (x - left) / width;
        if(percentage > 1){
            percentage = 1;
        }else if(percentage < 0){
            percentage = 0;
        }
        processor.updata(percentage);
        var index = controlmanager.index;
        var curDuration = songList[index].duration;
        var duration = curDuration * percentage;
        audioplayer.jumToPlay(duration);
        processor.start(percentage);
        lyric.show();           //歌词展示
        $scope.find(".play-btn").addClass("playing");
    })
}

function getData(url, cb) {
    $.ajax({
        url: url,
        type: "GET",
        success: cb,
        error: function(e) {
            console.log(e);
        }
    })
}
function successCb(data) {
    controlmanager = new controlManager(data.length);
    songList = data;
    $scope.trigger("play:change", 0);
    playList.render(data);
    bindTouch();
}

getData("/music-player/dist/mock/data.json", successCb)