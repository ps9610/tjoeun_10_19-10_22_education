;(function(window, document, $){

var cnt = 0;

var setId = 0;

var setId2 = 0; 

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

//메인 슬라이드 함수
    function mainSlideFn(){
        $(".slide-wrap").stop().animate({ left : -829 * cnt }, 600, function(){
            if(cnt>3){
                cnt=0;
            }
            if(cnt<0){
                cnt=3;
            }
            $(".slide-wrap").stop().animate({ left : -829 * cnt },0); 
            $('.slide').removeClass('addSlide');
            $('.slide').eq(cnt+1).addClass('addSlide');
        }); 
        pageBtnFn(cnt)
    }

//4-1. next
    $(".next-btn").on({
        click:function(){
            if( !$(".slide-wrap").is(":animated") ){
                nextSlideCountFn(); //이벤트 핸들러 (이벤트를함으로써 결과가 나오는 콜백함수)
            }
        timerControlFn();
        }
    });

// 4-3. 터치 스와이프 left
$(".slide-wrap").swipe({
    swipeLeft : function(){ // nextSlide
        if( !$(".slide-wrap").is(":animated")){
            nextSlideCountFn();
            }
            timerControlFn();
    },
    swipeRight : function(){ //prevSlide
        if( !$(".slide-wrap").is(":animated")){
            prevSlideCountFn();
        }
        timerControlFn();
    }
});

//4-2. prev
    $(".prev-btn").on({
        click:function(){
        if( !$(".slide-wrap").is(":animated") ){
            prevSlideCountFn();
        }
        timerControlFn();
        }
    });

//  5. each()로 배열처리, 인덱스 번호출력
$(".page-btn").each(function(index){ // 이벤트 리스너가 없고 콜백함수를 사용할거니까 매개변수 index를 전달
    $(this).on({
        click:function(){
            cnt=index;
            mainSlideFn(); //cnt는 인덱스번호로 저장한 뒤, 메인 함수를 호출
            clearInterval(setId); //10번
            $(".pause-play-btn").addClass("addPlay");
            timerControlFn();
        }
    });
});

//  6. 슬라이드 페이지 버튼 표시 (addClass)
function pageBtnFn(z){

    z>3? z=0 : z;
    
    $(".page-btn").removeClass("addPagebtn");
    $(".page-btn").eq(z).addClass("addPagebtn");
}

//  7. 3초 간격으로 다음 슬라이드 카운트
function initTimerFn(){
    setId = setInterval(nextSlideCountFn,3000); //로딩 후 3초 후 실행
} 

//  8-2. 클래스가 있으면 중지상태(▶)
$(".pause-play-btn").on({
        click:function(){
            var x = null;
                x = $(this).hasClass("addPlay");
            
                if( x ==false ){ 
                    clearInterval(setId);
                    clearInterval(setId2);
                    $(this).addClass("addPlay");
                }
                else if ( x==true ){ 
                    nextSlideCountFn(); 
                    initTimerFn(); 
                    $(this).removeClass("addPlay"); 
                }
        }
    });


// 4-4. 타이머 컨트롤 카운트 함수 
function timerControlFn(){

    clearInterval(setId); 
    clearInterval(setId2);
    $(".pause-play-btn").addClass("addPlay");

        var cnt2 = 0;
        setId2 = setInterval(function(){ 
            cnt2++;
            if( cnt2>9 ){
                nextSlideCountFn(); 
                initTimerFn();
                clearInterval(setId2);
                $(".pause-play-btn").removeClass("addPlay");
            }
            console.log(cnt2);
        },1000);

    }

    $(".promotion-btn").on({
        click:function(e){
            e.preventDefault();

            $(this).toggleClass("addUp"); 
            $("#section3").stop().slideToggle(400,"easeInCubic"); 
        
            if( $(".promotion-btn").hasClass("addUp") ){
                    initTimerFn();
                    $(".pause-play-btn").removeClass("addPlay")
                }
            else {
                clearInterval(setId)
                clearInterval(setId2);
                cnt = 0;
                $(".slide-wrap").stop().animate({ left:-829*cnt },0)
                $(".slide").removeClass("addSlide");
                $(".slide").eq(cnt+1).addClass("addSlide");
                pageBtnFn(cnt);
                $(".pause-play-btn").addClass("addPlay");
            }
        }
    });

})(window, document, jQuery);
