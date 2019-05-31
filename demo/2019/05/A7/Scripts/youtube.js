// mobile
// width: 590px;
// height: 428px;

// pc
// width: 960px;
// height: 532px;

var videoWidth = 960;
var videoHeight = 532;
var scrollposition = $(window).scrollTop();
var video_offset = $('#mark_video').offset();
var map_offset = $('#mark_map').offset();

$(document).ready(function() {
    if($windowWidth <= 640){
        videoWidth = 590;
        videoHeight = 428;
    }
});

$(window).on('scroll', function () {
    $windowHeight = $(window).height();
    scrollposition = $(window).scrollTop();
    video_offset = $('#mark_video').offset();
    map_offset = $('#mark_map').offset();
    scrollPositionToPlay();
});

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('youtubeCon', {
        height: videoWidth,
        width: videoHeight,
        videoId: 'UsCdok4YMhA',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    // event.target.playVideo();
    scrollPositionToPlay();
}

function videoPlay(){
    console.log('play');    
    player.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        // setTimeout(stopVideo, 6000);
        
        done = true;
    }
}
function stopVideo() {
    player.stopVideo();
}

function pauseVideo(){
    player.pauseVideo();
}

function scrollPositionToPlay(){

    console.log('scrollposition:' + scrollposition);

    if($windowWidth > 640){
        if(scrollposition > (video_offset.top - 100) ){
        console.log(11);
            //play video
            
        }
        if(scrollposition > (map_offset.top - 100) || scrollposition < (video_offset.top - 100)){
            pauseVideo();
        }else{
            videoPlay();
        }

    }
}