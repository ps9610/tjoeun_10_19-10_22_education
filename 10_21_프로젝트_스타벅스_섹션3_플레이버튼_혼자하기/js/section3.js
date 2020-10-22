(function(window, document, $){

/// 버튼 클릭해서 슬라이드 이전/다음으로 넘어가게 이벤트 걸어주기 ///

// 1. 슬라이드 양 옆으로 움직이는 함수 만들기

var cnt = 0;

var setId = 0;

// 2. 메인 함수 만들어서 옆으로 움직이는 애니메이션 걸어주기
    function mainSlideFn(){
        $(".slide-wrap").stop().animate({ left : -829 * cnt },600,function(){
            if(cnt<0){
                cnt=3;
            }
            if(cnt>3){
                cnt=0;
            }
            $(".slide-wrap").stop().animate({ left : -829 * cnt },0); //✅ 초기화 시켜주는 이유 : 앞으로 돌아가지 않고 바로 이어지게 해주려고
        });
        pageBtnFn(cnt); // 새로운 전역변수를 만들면 함수 바로 위에서 변수 써줌 -> 그래야 실행됨
                        // 어차피 전역변수를 만들어도 cnt값이랑 똑같으니까 cnt써줌(전역변수라 써도 됨)
    }

    function nextSlideFn(){
        cnt++;
        mainSlideFn();
        /*cnt는 증가하고, cnt 수 만큼 왼쪽으로 -829px 움직이는 애니메이션
        을 실행하는 함수 mainSlideFn를 실행하라.*/
    }

    function prevSlideFn(){
        cnt--;
        mainSlideFn();
    }

//  3. 버튼 클릭 이벤트 핸들러 생성
    $(".next-btn").on({
        click:function(){
            if( !$(".slide-wrap").is(":animated") )
            nextSlideFn();
        }
    })

    $(".prev-btn").on({
        click:function(){
            if( !$(".slide-wrap").is(":animated") )
            prevSlideFn();
        }
    })

// 4. 슬라이드가 옆으로 넘어가는 동안에는 클릭안되게 설정해놓기
    // 4-1. is 메소드 사용해서 부정문 만들기
    // 4-2. prev, next 버튼에 함수 걸어주기

// 1번 + 2번 + 3번 + 4번: 사이드함수 2개에 메인함수 1개 연결

/// 인디게이터 JS ///

//  5. 버튼 4개를 배열 처리해서 each요소 사용하기
//  5-1. 라디오 버튼을 클릭하면 메인 슬라이드가 옆으로 오게 하기
//  5-2. eq 이용해서 4개 구현해보기

    //5-1-1. eq 버튼들한테 클릭 이벤트 걸기
    //5-1-2. 메인 슬라이드 함수 넣기 
    
/*
$(".page-btn").eq(0).on({
    click:function(){
        cnt=0;
        mainSlideFn();
    }
});

$(".page-btn").eq(1).on({
    click:function(){
        cnt=1;
        mainSlideFn();
    }
});

$(".page-btn").eq(2).on({
    click:function(){
        cnt=2;
        mainSlideFn();
    }    
});

$(".page-btn").eq(3).on({
    click:function(){
        cnt=3;
        mainSlideFn();
    }
});
*/

//6. each메소드 이용해서 하나의 함수로 설정하기
$(".page-btn").each(function(index){
    $(this).on({
        click:function(){
            cnt = index;
            mainSlideFn();
        }
    })    
});

// ✅ page-btn이 여러개 있음 = each함수
// ✅ function에 index를 매개변수로 걸어서 값을 받아냄
// ✅ 전역변수 cnt = 0이고, mainSlideFn에서 cnt값이 조건이 걸려있으니까 index에 저장시킴

// 7. 해당 슬라이드 버튼에 표시하기
// 7-1. main slide가 돌아간 후, 버튼이 표시가 되어야 함
// 7-2. console.log로 버튼번호 확인 후 주석처리
    // = main slide 마지막 부분에 pageBtnFn를 넣어주고, pagebtn이 여러개니까 매개변수 값 저장해서 불러오기
function pageBtnFn(btnCnt) {
    //현재 페이지버튼이 눌러졌을 때, 초록색이 되어야 함
    btnCnt > 3? btnCnt=0 : btnCnt;
    $(".page-btn").removeClass("addPagebtn");
    $(".page-btn").eq(btnCnt).addClass("addPagebtn");
/*  console.log(btnCnt); // ->버튼을 누르면 1 2 3 4 1 2 3 4...가 나오는데 
                        // 인디게이터 버튼은 0 1 2 3밖에 없으니까 4=0이 되게 삼항연산자를 써줌 */
}


// 8.타이머 함수 설정하기
// 8-1. 3초 간격으로 nextslide가 와야됨 
// 8-2. setInterval를 불러줄 함수 timerFn를 만듦
// 8-3. ✅ 전역변수 setId를 만든 이유 : console.log
            // -> setInterval은 컴퓨터 전체에서 실행되는거라서 꼭 전역변수 세팅해주어야함

function timerFn() {
    setId = setInterval(nextSlideFn,3000);
    console.log(setId);
}

timerFn();

// 9. toggle 이용하여 타이머 중지 / 다시 시작
// 9-1. 변수 t(toggle) 생성
    // t=0, 멈춤 / t=1, 재생
// 9-2. ||버튼에 클릭 이벤트

var t=0;

$(".pause-play-btn").on({
    click:function(){
        if(t == 0){
            t = 1;
            $(this).addClass("addPlayBtn");
            clearInterval(setId);
        }
        else if (t == 1){
            t = 0;
            $(this).removeClass("addPlayBtn");
            timerFn();
        }
    }
})




})(window, document, jQuery);