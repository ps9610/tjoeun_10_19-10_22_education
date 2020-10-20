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

//2-1. next
    function nextSlideCountFn(){
        cnt++; //이걸 var cnt = 0이라고 했으면 지역변수
        mainSlideFn(); 
    }

//2-1. prev
function prevSlideCountFn(){
    cnt--; //이걸 var cnt = 0이라고 했으면 지역변수
    mainSlideFn(); 
}


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
            $(".slide-wrap").stop().animate({ left : -829 * cnt },0);
        }); //if를 next에서 쓰면 넘어가기 전에 앞에꺼로 바껴서 연결되어 보이지 않음
    }        
//4-1. next
    $(".next-btn").on({
        click:function(){
            nextSlideCountFn();
        }
    });
//4-2. prev
    $(".prev-btn").on({
        click:function(){
            prevSlideCountFn();
        }
    });







})(window, document, jQuery);