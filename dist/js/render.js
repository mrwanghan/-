(function($, root){
    var $scope = $(document.body);
    function renderInfo(data) {
        var html = "<h1 class='song-name'>" + data.song + "</h1>" + 
        "<h3 class='singer-name'>" + data.singer + "</h3>" + 
        "<h3 class='album-name'>" + data.album + "</h3>"
        $scope.find(".song-info").html(html);
    }
    function renderImage(src) {
        var image = new Image();
        image.onload = function() {
            $scope.find(".song-img .img-wrapper img").attr("src", src);
            root.blurImg(image, $scope);
        }
        image.src = src;
    }
    function renderIslike(data) {
        if(data.isLike == true) {
            $scope.find('.like-btn').addClass("liked");
        }else{
            $scope.find('.like-btn').removeClass("liked");
        }
    }

    root.render = function(data) {
        renderInfo(data);
        renderImage(data.image);
        renderIslike(data);
    }


}(window.Zepto,window.player||(window.player = {})))