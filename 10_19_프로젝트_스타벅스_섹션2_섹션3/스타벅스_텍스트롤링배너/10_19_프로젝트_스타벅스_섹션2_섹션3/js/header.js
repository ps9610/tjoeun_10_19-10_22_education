(function($){

    //마우스 이벤트
    //메인버튼 이벤트 
    //마우스 클릭 이벤트 동작
    //마우스 오버시 동작
    //키보드 접근시 동작 
    // $("선택자").on({}); 
    // $("선택자").one({}); 
    // $("선택자").off({}); 

    $(".main-btn").on({
        mouseenter:function(){  //mouseenter = mouseover
            //버튼 효과 배경 색상 글자
            $(".main-btn").removeClass("addMainbtn"); //모든 메인버튼 추간된 클래스 삭제
            $(this).addClass("addMainbtn"); //현재(this) current만 추가 클래스(addClass())
            //서브메뉴의 슬라이드 다운 업 효과(애니메이션)
            $(".sub").stop().slideUp(0);
            $(this).next().stop().slideDown(500,"swing");

        },
        focusin:function(){
           //버튼 효과 배경 색상 글자
           $(".main-btn").removeClass("addMainbtn"); //모든 메인버튼 추간된 클래스 삭제
            $(this).addClass("addMainbtn"); //현재(this) current만 추가 클래스(addClass())            
        },
    });


    //마우스가 #nav를 떠나면 mouseleave = mouseout
    $("#nav").on({
        mouseleave:function(){
            $(".sub").stop().slideUp(500);
            $(".main-btn").removeClass("addMainbtn");
        }
    });







    //메인 버튼 클릭 링크 이동
    //each() 메소드 활용 버튼 배열 처리
    // $(".main-btn").each();
    $(".main-btn").each(function(index){
        $(this).on({
            click:  function(){
                if(index==0){
                    location.href="https://www.starbucks.co.kr/coffee/index.do"; 
                }
                else if(index==1){
                    location.href="https://www.starbucks.co.kr/menu/index.do";
                }
                else if(index==2){
                    location.href="https://www.starbucks.co.kr/store/index.do";
                }
                else if(index==3){
                    location.href="https://www.starbucks.co.kr/responsibility/index.do";
                }
                else if(index==4){
                    location.href="https://www.starbucks.co.kr/whats_new/index.do";
                }
                else if(index==5){
                    //_self
                    // location.href="https://www.starbucks.co.kr/whats_new/index.do";
                    //_blank
                    window.open("https://www.starbucks.co.kr/whats_new/index.do");
                }
            }
        });
    });

    /*
    //each() 메소드 실무에 적용하기
    //.main-btn 버튼 6개  배열 자동화(0~5) 
    $(".main-btn").each(); //1 each() 이치 달기
    $(".main-btn").each(function(){}); //2 이치에 콜백함수 달기
    $(".main-btn").each(function(){ //3 콜백함수 공간벌리기

    });

    $(".main-btn").each(function(index){ //4 콜백함수 index(매개변수) 이벤트  넣기

    });

    $(".main-btn").each(function(index){ //5 클릭 이벤트 리스너 
        $(this).on({
            click: function(){
                console.log(index);  //핸들러 인덱스번호 콜백
            }
        });
    });

    $(".main-btn").each(function(index){ //5 클릭 이벤트 리스너 조건문 핸들러 수행 콜백
        $(this).on({
            click: function(){
                if(index==0){
                    location.href = "url";
                }
                else if(index==1){
                    location.href = "url";
                }
                else if(index==2){
                    location.href = "url";
                }
                :                
            }
        });
    });


*/



/*
    $(".main-btn").eq(0).on({
        click:function(){
            //BOM
            // window.location.href="https://www.starbucks.co.kr/coffee/index.do";
            location.href="https://www.starbucks.co.kr/coffee/index.do";
        }
    });

    $(".main-btn").eq(1).on({
        click:function(){
            location.href="https://www.starbucks.co.kr/menu/index.do";
        }
    });

    $(".main-btn").eq(2).on({
        click:function(){
            location.href="https://www.starbucks.co.kr/store/index.do";
        }
    });

    $(".main-btn").eq(3).on({
        click:function(){
            location.href="https://www.starbucks.co.kr/responsibility/index.do";
        }
    });

    $(".main-btn").eq(4).on({
        click: function(){
            location.href="https://www.starbucks.co.kr/msr/index.do";
        }
    });

    $(".main-btn").eq(5).on({
        click:  function(){
            location.href="https://www.starbucks.co.kr/whats_new/index.do";
        }
    });


*/



})(jQuery);