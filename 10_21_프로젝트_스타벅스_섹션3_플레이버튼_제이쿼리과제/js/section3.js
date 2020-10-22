(function(window, document, $){
    //1. 버튼을 클릭하여 이전슬라이드, 메인슬라이드, 다음슬라이드로 움직이게 하기

    var cnt = 0;
    var setId = 0;


    function nextSlideFn(){
        cnt++;
        mainSlideFn();
    }
    
    function prevSlideFn(){
        cnt--;
        mainSlideFn();
    }

    function mainSlideFn(){
        $(".slide-wrap").stop().animate({left : -829 * cnt},600,function(){ // 콜백함수 : 6초동안 -829px만큼 가고 나서 끝 -> 바로 다음 함수 시작
            if( cnt>3 ){
                cnt=0;
            }
            if( cnt<0 ){
                cnt=3;
            }
            $(".slide-wrap").stop().animate({left: -829 * cnt},0) //0초의 간격으로 움직임 = 움직이지 않음 = 조건문 적용 받지 않는 것처럼 보임   
        });
        pageBtnFn(cnt);
    }
    
    $(".next-btn").on({
        click:function(){
            if(!$(".slide-wrap").is(":animated")){
                nextSlideFn();
            }
        }
    })
    
    $(".prev-btn").on({
        click:function(){
            if(!$(".slide-wrap").is(":animated")){
                prevSlideFn();
            }
        }
    })
    
    // 2. 슬라이드 움직이는 동안에는 버튼클릭기능 정지
    // 2.1 만약 슬라이드랩이 애니메이션 하고 있지 않으면, 다음 슬라이드로 넘어가는 클릭 효과를 주어라.
    // 2.2 = 👇 슬라이드가 애니메이션 중이면 다음으로 넘어가는 클릭효과를 주지 말아라) 
    
    //3. 페이지버튼 누르면 해당 슬라이드 움직이기
    //3-1. 페이지 버튼 많음 = each메소드 활용 가능
            //3-1-1. function처럼 each메소드 똑같이 걸어주고 안에 매개변수 써줌
            //3-1-2. this 선택자 이용해서 원하는 함수이벤트 걸어줌


    $(".page-btn").each(function(index){
        $(this).on({
            click : function(){
                cnt = index;
                mainSlideFn();
            }
        });
    })

    //4. 페이지버튼 누르면 해당 버튼 활성화(색 표시)
    function pageBtnFn(z){
        z > 3? z=0 : z;
        $(".page-btn").removeClass("addPagebtn")
        $(".page-btn").eq(z).addClass("addPagebtn")
    }

    //5. 3초 간격으로 슬라이드 타이머 걸기
    function initTimerFn(){
        setId = setInterval(nextSlideFn, 3000)
    }

    initTimerFn();

    //6. 일시정지 / 정지 버튼 기능 넣기
    $(".pause-play-btn").on({
        click : function(){
            var x = null;
                x = $(this).hasClass("addPlay"); // 처음상태는 재생중인 상태임

            if( x == false ){   //멈췄으니까 ▶ 떠야함
                clearInterval(setId);
                x = $(this).addClass("addPlay");
            }
            else if( x == true ){  //다시 실행하면 ⏸ 떠야함
                initTimerFn();
                x = $(this).removeClass("addPlay");
                nextSlideFn();
            }

        }
    });

    //7. next, prev, pagebtn 중 한개라도 누르면 슬라이드 정지
})(window, document, jQuery);

