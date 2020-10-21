(function(window, document, $){

//  이전 슬라이드 prev slide
//  슬라이드를 직접 받는 main slide
//  다음 슬라이드 next slide
// .slide-wrap {position:relative;width:calc(829px*5);left:calc(-829px*2);}
    //- left calc에 곱해진 수가 cnt

var cnt = 0;

//2-1. next
    function nextSlideCountFn(){
        cnt++;
        mainSlideFn();
    }

//2-1. prev
function prevSlideCountFn(){
    cnt--;
    mainSlideFn();
}


//  메인 슬라이드 함수
    function mainSlideFn(){
        $(".slide-wrap").stop().animate({left:-829*cnt},600,function(){
        if(cnt>3){
            cnt=0;
        }
        if(cnt<0){
            cnt=3;
        }
        $(".slide-wrap").stop().animate({left:-829*cnt},0);
        });
        
    };

    $(".left-btn").
    
})(window, document, jQuery);



