(function(window, document, $){

//  이전 슬라이드 prev slide
//  슬라이드를 직접 받는 main slide
//  다음 슬라이드 next slide
  
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
        // .slide-wrap {position:relative;/* left:calc(-829px*3); */width:/*calc(829px*6) =*/4974px;/* margin-left:-829px; */}
        $(".slide-wrap").stop().animate({ left : -829 * cnt }, 600, function(){
            if(cnt>2){
                cnt=0;
            }
            if(cnt<0){
                cnt=2;
            }
            $(".slide-wrap").stop().animate({ left : -829 * cnt },0);
        }); 
    }        

//4-1. next
    $(".left-btn").on({
        click:function(){
            nextSlideCountFn();
        }
    });
//4-2. prev
    $(".right-btn").on({
        click:function(){
            prevSlideCountFn();
        }
    });
    
})(window, document, jQuery);



