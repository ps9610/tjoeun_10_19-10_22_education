;(function(window, document, $){

// 메인 슬라이드 롤링 애니메이션
//  1. 카운트 변수 설정
//  2. 다음(변수가 증가됨) 슬라이드 카운트 함수 생성; 선언적(이름있는) 함수
//      - 증가된 카운트 변수 메인 슬라이드 함수에 전달
//      - 메인 함수 호출();
//  3. 메인 함수( mainSlideFn() ) 만들기
//  4. 카운트 함수( nextSlideCountFn() ) 호출해보기 -> 5번
//  5. 다음 화살 버튼 클릭 이벤트로 카운트 함수 호출하게 만들기

var cnt = 0;// 전역변수, 즉시실행함수 어디든지 쓸 수 있음

var setId = 0; //setInterval에 들어갈 전역변수

var setId2 = 0; //setInterval에 들어갈 전역변수2

//2-1. next
    function nextSlideCountFn(){
        cnt++; //이걸 var cnt = 0이라고 했으면 지역변수
        mainSlideFn(); 
    } 

//2-1. prev
function prevSlideCountFn(){
    cnt--; //이걸 var cnt = 0이라고 했으면 지역변수
    mainSlideFn(); 
} //cnt 감소하면서 main함수 내용 연결함


//  메인 슬라이드 함수 = 애니메이션(카운트 변수를 가져와서 사용)
    function mainSlideFn(){
        // .slide-wrap {position:relative;/* left:calc(-829px*3); */width:/*calc(829px*6) =*/4974px;/* margin-left:-829px; */}
        $(".slide-wrap").stop().animate({ left : -829 * cnt }, 600, function(){//animate:({속성값, 여기서는 left가 됨})
            if(cnt>3){
                cnt=0;
            }
            if(cnt<0){
                cnt=3;
            }//넘어왔던거를 맨앞에꺼로 바뀐다고 써주면 됨(만약에 슬라이드 갯수가 앞, 뒤, 가운데로 배수대로 있으면 완전 자연스럽게 연결)
            $(".slide-wrap").stop().animate({ left : -829 * cnt },0); //이동하는 시간 0 = 순간이동 = 초기화
        }); //if를 next에서 쓰면 넘어가기 전에 앞에꺼로 바껴서 연결되어 보이지 않음

        pageBtnFn(cnt/* >3? 0:cnt 이렇게 쓰기 싫으면 함수에 직접 써*/); /* 일단 cnt가 바뀌고 나서 그 변경된 cnt값이 저장되어야 함수가 실행됨 :페이지버튼(전달인자)*/
    }        
//4-1. next
    $(".next-btn").on({
        click:function(){ //이벤트 리스너 (이벤트할수있는환경)
            //애니메이션이 움직이는 동안에는 클릭을 막는 알고리즘
            //console.log($(".slide-wrap").is(":animated")); <-디버깅
            if( !$(".slide-wrap").is(":animated")){ //is - ~이다. = true가 있을땐 절대로 애니메이션 실행안됨 = false일 때만 실행
        // =if( !$(".slide-wrap").is(":animated" === true)){
        // =if( $(".slide-wrap").is(":animated" === false)){
        // =if( $(".slide-wrap").is(":animated" !== true)){ 
                nextSlideCountFn(); //이벤트 핸들러 (이벤트를함으로써 결과가 나오는 콜백함수)
            }
        clearInterval(setId); //10번
        $(".pause-play-btn").addClass("addPlay");
        var cnt2 = 0; //몇 초 후에 슬라이드 재생하라 할 때 그 초
        setId2 = setInterval(function(){
            cnt2++;
            if ( cnt2>9 ){
                nextSlideCountFn();
                initTimerFn();
                clearInterval(setId2);
                $(".pause-play-btn").removeClass("addPlay");
            }
        },1000);
        // 타이머를 멈추면서 재생버튼이 나오게 하고, cnt2에 조건을 걸어서 setId2를 실행함
        }
    });
//4-2. prev
    $(".prev-btn").on({ //뒤 이벤트 리스너 on(power on할 때 그 의미)
        click:function(){
            //애니메이션이 움직일 때 클릭되지 않게 하는 함수
        if( !$(".slide-wrap").is(":animated")){ //is - ~이다.
            prevSlideCountFn();
        }
        clearInterval(setId); //10번 : 버튼을 누르는 이벤트가 발생하면 prev함수 내용이 연결됨
        $(".pause-play-btn").addClass("addPlay");
        var cnt2 = 0;
        setId2 = setInterval(function(){
            if(cnt2>9){
                nextSlideCountFn();
                $(".pause-play-btn").removeClass("addPlay");
                clearInterval(setId2);
                initTimerFn();
            }

        },1000);

        }
    });


//즉, 사이드함수 2개에  메인 함수 1개를 연결 ->함수 2개를 버튼 2개에 연결해준거임


// 5. <슬라이드 고급단계>
    // - 버튼 4개를 하나로 통합해 배열
    // - 인디게이터(4개) 버튼 클릭 이벤트 - 요소 객체 배열처리 each() 메서드

    //  알고리즘 구현
        // - 첫번째 클릭하면 index 번호 0(슬라이드번호): -819*0
        // - 두번째 클릭하면 index 번호 1(슬라이드번호): -819*1
        // - 세번째 클릭하면 index 번호 2(슬라이드번호): -819*2
        // - 네번째 클릭하면 index 번호 3(슬라이드번호): -819*3 = -819*index번호
    
/*    
    //  each메소드 사용 안하면 이렇게 하나하나 써줘야됨 = 나열형]
    $(".page-btn").eq(0).on({
        click : function(){
            cnt = 0;
            mainSlideFn(); // 메인함수 호출하면서 cnt한테 클릭 된 index번호 전달
        }
    });

    $(".page-btn").eq(1).on({
        click : function(){
            cnt = 1;
            mainSlideFn(); // 메인함수 호출하면서 cnt한테 클릭 된 index번호 전달
        }
    });

    $(".page-btn").eq(2).on({
        click : function(){
            cnt = 2;
            mainSlideFn(); // 메인함수 호출하면서 cnt한테 클릭 된 index번호 전달
        }
    });

    $(".page-btn").eq(3).on({
        click : function(){
            cnt = 3;
            mainSlideFn(); // 메인함수 호출하면서 cnt한테 클릭 된 index번호 전달
        }
    });
*/

//  6. each()로 .page-btn버튼의 요소를 배열처리하여 인덱스 번호를 반환(출력)
$(".page-btn").each(function(index){ // 이벤트 리스너가 없고 콜백함수를 사용할거니까 매개변수 index를 전달
    $(this).on({
        click:function(){
            cnt=index;
            mainSlideFn(); //cnt는 인덱스번호로 저장한 뒤, 메인 함수를 호출
            clearInterval(setId); //10번
            $(".pause-play-btn").addClass("addPlay");// 정지 후 정지 버튼 뜨게 함
            // 변수는 사람, 함수는 버스라고생각하면 됨
            // 버스가 지나가고 나서 사람이 탈 수 없음(변수가 먼저 나와야 함수 실행됨)
        }
    });
});

//  7. 해당 슬라이드 페이지 버튼(인디게이터)에 표시 (addClass)
function pageBtnFn(z){
    /* if(z>3){
        z=0;
    }//근데 이렇게 if문을 쓰면 너무 간단한데 코딩만 늘어나니까 삼항연산자 쓰셈 */
    z>3? z=0 : z;
    //  console.log(z); // 0  1  2  3  0 ... 
    $(".page-btn").removeClass("addPagebtn"); /*  */
    $(".page-btn").eq(z)/* 현재 실행되고 있는 슬라이드 번호 */.addClass("addPagebtn");
}

//  8. 3초 간격으로 다음 슬라이드 카운트 시켜주기 
//  
function initTimerFn(){
    setId = setInterval(nextSlideCountFn,3000); //로딩 후 3초 후 실행
    // 컴터 메모리 번호 안에서 동작하는거라 그 번호에 대한 변수있어야 제어가능 -> 전역변수 만들어줌
    // console.log(setId); //setId 해준이유 : 저 메모리 번호가 랜덤이라 어떤 숫자가 될 지 몰라서 항상 같은 숫자가 대입되라고
} 

initTimerFn(); //로딩 시 바로 실행함

/*
//  9-1. 타이머 중지 / 다시 시작 - toggle변수 이용
var tog = 0; //toggle시 사용할 변수, 내가 0을 멈춘다고 설정한거임

$(".pause-play-btn").on({
    click:function(){   
        
    if (tog == 0){
        tog = 1;
        $(this).addClass("addPlay"); 
        clearInterval(setId);//<=>setInterval    
    } // tog가 0으로 변경되면서 중지 되고 삼각형 아이콘이 추가됨
    else if(tog == 1){
        tog = 0;
        $(this).removeClass("addPlay");
        initTimerFn();
    }
     // tog가 1로 변경되면서 재생되고 일시정지 아이콘이 추가됨 = 자동실행(타이머재실행)
     
         // .pause-play-btn {background:url(../img/main_prom_stop.png)} <-속성 가져와서 여기서 바로 사용할거임
         // var imgName = $(this).stop().css({backgroundImage:"url(./img/main_prom_play.png)"}); //html안에 있는 파일이니까 ../img 아님
             // addClass를 안하면 이렇게 하나하나 써 줘야 됨
    }
})
*/


//  9-2. 클래스가 있으면 중지상태(아이콘 ▶ 나옴) / 없으면 재생상태(아이콘 ⏸ 나옴)
    //  hasClass("addPlay")사용, 있으면 true(1), 없으면 false(0).
    $(".pause-play-btn").on({
        click:function(){
            var x = null;
                x = $(this).hasClass("addPlay"); //논리값으로 나옴
            
                if( x ==false ){ // 처음엔 addPlay 클래스가 없으니까 = 현재 재생중인 상태
                    clearInterval(setId);
                    $(this).addClass("addPlay");
                }
                else if ( x==true ){ //addPlay 클래스 생김 = 현재 일시정지인 상태
                    nextSlideCountFn(); //++ = 해당 함수 (다음 슬라이드)즉시 실행됨
                    initTimerFn(); //플레이 시킴, 함수 무한히 실행됨
                    $(this).removeClass("addPlay"); // ⏸로 다시바뀜
                }
        }
    });

})(window, document, jQuery);

// 10. next, prev, pagebtn 누르면 일시정지되게하기
//10-1. main함수 먼저 호출하고 정지

//둘 다 변수인데 (인자=매개변수=외부에서값을받음)는 함수 정의에 사용되고 
//              인수는 함수의 호출에 사용된다.