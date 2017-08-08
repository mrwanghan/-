(function ($, root) {
    var $scope = $(document.body);
    var $playList = $("footer");
    var controlmanager;
    function render(data) {
        var li = "";
        for(var i = 0; i < data.length; i++){
            li += "<li class='list-name-music'>" + "<span class='state'>" + "</span>" + data[i].song + "<e>" + "&nbsp" + "-" + "&nbsp" + data[i].singer + "</e>" + "</li>";
        }
        $playList.find(".list-name").html(li);
        bindEvent()
    }
    function bindEvent(){
        $playList.find(".close").on("click", function(){
            $playList.removeClass("black");
            $playList.find(".foot").removeClass("show");
        })
        $playList.find(".list-name-music").on("click", function(){
            var index = $(this).index();
            signPlay(index);
            controlmanager.index = index;
            $scope.trigger("play:change", [index, true]);
            setTimeout(function(){
                $playList.removeClass("black");
                $playList.find(".foot").removeClass("show");
                $scope.find(".play-btn").addClass("playing");
            },500)
        })
    }
    function show(controlManager){
        controlmanager = controlManager;
        var index = controlmanager.index;
        $playList.addClass("black");
        $playList.find(".foot").addClass("show");
        if(audioplayer.status == "pause"){
            signStop(index);
        }else{
            signPlay(index);
        }
        
    }
    function signPlay(index){
        $playList.find(".active").removeClass("active");
        $playList.find(".stop").removeClass("stop");
        $scope.find(".list-name-music").eq(index).find(".state").addClass("active");
    }
    function signStop(index){
        $playList.find(".active").removeClass("active");
        $playList.find(".stop").removeClass("stop");
        $scope.find(".list-name-music").eq(index).find(".state").addClass("stop");
    }

    root.playList = {
        render: render,
        show: show,
    }
})(window.Zepto, window.player || (window.player = {}));