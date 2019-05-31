
 var winPoint;

var neusoft={};

function gameInit(){
    winPoint = 0;
    neusoft.matchingGame={};
    neusoft.matchingGame.cardWidth=146;
    neusoft.matchingGame.cardHeight=139;
    neusoft.matchingGame.deck=
        [
            "cardA","cardA",
            "cardB","cardB",
            "cardC","cardC",
            "cardD","cardD",
            "cardE","cardE",
            "cardF","cardF",
            "cardG","cardG",
            "cardH","cardH",
            "cardI","cardI",
        ]
}

function shuffle()
{
    return Math.random()>0.5 ? -1 : 1
}
function selectCard() {

    var $fcard=$(".card-flipped");
    if($fcard.length>1)
    {
        return;
    }
    //alert($(this).data("pattern"));
    $(this).addClass("card-flipped");
    var $fcards=$(".card-flipped");
    if($fcards.length==2)
    {
       // checkPattern($fcards);
        setTimeout(function(){
            checkPattern($fcards);
        },300);
    }
}
function checkPattern(cards)
{
    var pattern1 = $(cards[0]).data("pattern");
    var pattern2 = $(cards[1]).data("pattern");

    if(pattern1==pattern2)
    {
        $(cards).removeClass("card-flipped");

        winPoint++;

        $(cards).html('<img src="Content/images/goodjob_icon.png" style="width: 100%;">')
        $(cards).bind("webkitTransitionEnd",function(){});
        setTimeout(function(){
            $(cards).addClass("card-removed");
            $(cards).html()
        }, 500);
        
    }else{
        setTimeout(function(){
            $(cards).removeClass("card-flipped");
            
        }, 1100);
    }
}

function checkPoint(){
    return winPoint;
}