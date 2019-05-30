var $menuIsOpen = false;
var $menuCon = $('.menu_con');
var $coverTime = 2000;
var $coverTimer;
var $gameTimer;
var $windowWidth = $(window).width();
var $windowHeight = $(window).height();
var sideAdIsOpen = false;

$(document).ready(function() {
    headerPositionTop();
    menuShowHide();
    clickMarker();
    mapdrag();
    mapRelation();
    sideAdShowHide();
});

function mapRelation(){

    var cp_owl = $("#cp_owl");
    cp_owl.owlCarousel({
        nav:true,
        items : 1,
        dots: true,
        dotsContainer: '.cp_nav ul',
        navText: ["<a href=\"javascript:;\" class=\"left\">left</a>","<a href=\"javascript:;\" class=\"right\">right</a>"],
        onChanged : cp_scroll_callback
    });

    $(document).on('click','.cp_nav li',function(){
        cp_owl.trigger('to.owl.carousel', [$(this).index(), 10]);
    });


    $(document).on('click','.cp_nav li',function(){
        var click_index = $(this).index();
        $('.drag_cover').addClass('close');
    });

    $(document).on('click','.cp_dots_con li',function(){
        var click_index = $(this).index();
        $('.cp_nav li').eq(click_index).trigger('click');
    });
}

//圖片拖曳
function mapdrag(){
    //初始化 map drag
    $('#drag').draggabilly({
        containment: '.drag_overflow'
    })

    //點擊或是滑動的時候 關閉 提示cover
    $(document).on('touchend mouseout', '.drag_map_con', function(e) {
        // $('.drag_cover').removeClass('close');
        // clearInterval($coverTimer);
        // $coverTimer = setInterval(function(){
        //     $('.drag_cover').removeClass('close');
        // },$coverTime);
    });
    
    //點擊結束 或是離開區域的時候 計算時間出現 提示cover
    $(document).on('click touchstart touchmove', '.drag_map_con', function(e) {
        // clearInterval($coverTimer);
        $('.drag_cover').addClass('close');
    });
}

function cp_scroll_callback(event){
    var item_index = event.item.index;
    
    //關閉 map 提示cover
    console.log(1);
    $('.map_dot').removeClass('act');
    $('.map_dot').eq(item_index).addClass('act');
    $('.info_owl_con').removeClass('act');
    $('.info_owl_con').eq(item_index).addClass('act');
    $('.cp_dots_con li').removeClass('act');
    $('.cp_dots_con li').eq(item_index).addClass('act');
}

//當頁面載入完成
$(window).on('load', function () {
    headerPositionTop();
});

$(window).on('scroll', function () {
    headerPositionTop();
    $windowHeight = $(window).height();
});

//當視窗改變尺寸
$(window).on('resize', function () {
    headerPositionTop();
    $windowHeight = $(window).height();

});

//翻牌遊戲
function matchGame(){


    $( ".page").removeClass('act');
    $( ".page.game").addClass('act');

    gameInit();

    //遊戲時間
    var game_time = 30;
    //開始倒數
    var start_time = 2;

    $(".game_timer_block").html(start_time);
    $("#cards").addClass('ready');
    $("#cards").html('<div class="card"><div class="face front"></div><div class="face back"></div></div>');
    
	neusoft.matchingGame.deck.sort(shuffle);
	console.log(neusoft.matchingGame.deck);
	var $card=$(".card");
	for(var i= 0;i<17;i++)
	{
        if($(window).width() <= 640){
            if(i == 4 || i == 8 || i ==13){
                $("#cards").append('<br>');
            }
        }

        $card.clone().appendTo($("#cards"));

    }
    
	$(".card").each(function(index)
	{
        console.log(Math.floor(index/5));
        var game_section = Math.floor(index/5);
        
        if($(window).width() > 640){
            $(this).css({
                "left":(neusoft.matchingGame.cardWidth+10)*(index%6)+"px",
                "top":(neusoft.matchingGame.cardHeight+10)*(Math.floor(index/6))+"px"
            });
        }

		var pattern=neusoft.matchingGame.deck.pop();
		$(this).data("pattern",pattern);
		$(this).find(".back").addClass(pattern);
		$(this).click(selectCard);
    });
    
    var start_timer = setInterval(function(){

        if(start_time == 0){
            
            clearInterval(start_timer);
            $("#cards").removeClass('ready');
            $("#cards").addClass('start');

            $gameTimer = setInterval(function(){ 
        
                $(".game_timer_block").html(game_time);
        
                //取得分數
                console.log('poing:'+checkPoint());
        
                if(game_time != 0){
        
                    if(checkPoint() == 9){
                        gameEnd();
                    }else{
                        game_time--;
                    }
                }else{
                    gameEnd();
                }
            }, 1000);
        }else{
            start_time--;
        }
        $(".game_timer_block").html(start_time);
    },1000)
}

function gameEnd(){

    
    $("#cards").removeClass('start');

    var winpoint = checkPoint();

    if(winpoint >= 0 && winpoint <= 4){
        $(".section_des").html('很可惜!你還要再努力才能當上A7住宅王!');
    }else if(winpoint >= 5 && winpoint <= 8){
        $(".section_des").html('哎唷，你差一點就能當上A7住宅王了!');
        
    }else{
        $(".section_des").html('你成功找對所有住宅<br>你就是A7住宅王!');
    }

    clearInterval($gameTimer);
    $( ".card").unbind( "click" );
    $( ".page").removeClass('act');
    $( ".page.end").addClass('act');
}

function headerPositionTop(){
    var $height = $(window).scrollTop();
    // var windowWidth = $(window).width();
    $windowHeight = $(window).height();
    var maxHeight = 900;

    if($windowWidth <= 640){
        $('.section_kv').css({'height' : $windowHeight +'px'});
        $('.header').css({'top' : $windowHeight +'px'});
        maxHeight = $windowHeight;
        if($height > maxHeight) {
            $('.header').addClass('fixed');
            $('.header').css({'top' : 0 +'px'});
        } else {
            $('.header').removeClass('fixed');
            $('.header').css({'top' : $windowHeight +'px'});
        }
    }

    if($height > maxHeight) {
		$('.header').addClass('fixed');
	} else {
		$('.header').removeClass('fixed');
	}
}

function menuShowHide(){
    
    $menuCon.css({'height': "0px"});

    $(document).on('click','.menu_btn',function(){
        if($menuIsOpen){
            $menuIsOpen = false;
            $menuCon.css({'height': "0px"});
            $('.header').removeClass('act');
            $('.menu_bar a.menu_btn').removeClass('act');
        }else{
            $menuIsOpen = true;
            $menuCon.css({'height': window.innerHeight - 50 + "px"});
            $('.header').addClass('act');
            $('.menu_bar a.menu_btn').addClass('act');
        }
    })
}

function clickMarker(){
    var marker = $('.map_dot');

    $(document).on('click','.map_dot',function(){
        marker.removeClass('act');
        $(this).addClass('act');
        var click_index = $(this).index();
        $('.cp_nav li').eq(click_index).trigger('click');
    });

    $(document).on('touchstart','.map_dot',function(){
        marker.removeClass('act');
        $(this).addClass('act');
        var click_index = $(this).index();
        $('.cp_nav li').eq(click_index).trigger('click');
    })

    $(document).on('click','.map_bg',function(){
        marker.removeClass('act');
        console.log();
    })
    
}

function goToByScroll(id) {
    
    $menuCon.css({'height': "0px"});
    // $menuIsOpen = false;

    $(".menu_btn" ).removeClass('act');

    $(".menu_btn" + "."+ id +"" ).addClass('act');

    // Scroll
    $('html,body').animate({
        scrollTop: $("#" + id).offset().top -50
    }, 'slow');
    
}

//判斷行動裝置
var isMobile;
function isMobileBrowser() {
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //desktop
        if (navigator.userAgent.indexOf('Mac OS X') != -1) {
            //Mac
            isMobile = false;
        } else {
            //PC
            isMobile = false;
        }
    } else {
        isMobile = true;
    }
}


//取得螢幕尺寸
var browserWidth;
var browserHeight;
function getBrowserWidth() {
    browserWidth = $(window).outerWidth();
    browserHeight = $(window).outerHeight();
}

function sideAdShowHide(){

    $(document).on('click','.side_ad .btn_open', function(){
        if(!sideAdIsOpen){
            $('.side_ad').addClass('act');
            sideAdIsOpen = true;
        }
    })

    $(document).on('click','.side_ad .btn_close', function(){
        sideAdIsOpen = false;
        $('.side_ad').removeClass('act');
        // 
    })


    

}