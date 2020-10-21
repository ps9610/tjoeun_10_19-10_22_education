(function(window, document, $){
//section2 notice-rolling
//  1. 처음에는 1번 문구가 보이고, 초기화되고, 다시 2번문구가 보이게 설정하기
//  2. rolling 걸어줄 함수 rollingTextFn 만들어 1번에 걸어주기
//  3. setInterval로 자동으로 무한히 롤링되게 설정
//  4. eq()에 들어갈 변수 설정해서 (0,1) (1,2) (2,3) (3,4) (4,0)의 순서대로 조건걸기

    var cnt = -1;

    function rollingTextFn(){
        
        cnt++;
        if(cnt>3){
            cnt = -1;
        }

        $(".left-notice li").stop().animate({top:24},0).css({zIndex:2});
        // .left-notice > li {height:62px;z-index:2;position:absolute;top:24px;}
        $(".left-notice li").eq(cnt<0? 4:cnt).stop().animate({top:0},0).css({zIndex:1});
        // left-notice > li:nth-child(1) {z-index:1;position:absolute;top:0;}
        $(".left-notice li").eq(cnt+1).stop().animate({top:24},0).animate({top:0},1000).css({zIndex:3});
        // .left-notice > li:nth-child(2) {z-index:3;top:24px;}
    }

      setInterval(rollingTextFn, 2500);

//section3 slide-bg
    $(".promotion-btn").on({
         click:function(e){
             e.preventDefault();

             $(this).toggleClass("addUp");
             $("#section3").stop().slideToggle(500);
        }
    });


})(window, document, jQuery);