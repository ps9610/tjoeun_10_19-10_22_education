(function(window, document, $){
// 1. (>)버튼 누르면 슬라이드가 next로 넘어가고 (<)버튼 누르면 previous 슬라이드로 넘어가게 하기
//1.1 양쪽 슬라이드 함수 총 2개 만들기
// .left-btn .right-btn
//1.2 중앙슬라이드 넘어가는 함수 만들기
//.slide-wrap {position:relative;width:calc(829px*5);margin-left:-829px;}
//1.3 양쪽 슬라이드 함수에 중앙슬라이드 함수 걸기
//1.4 메인 슬라이드 함수 걸려있는 양 쪽 슬라이드 함수를 각 버튼에 클릭이벤트 걸어 놓은 후 넣기

var cnt = 0;

function nextSlideFn(){
    cnt++;
    mainSlideFn();

}

function prevSlideFn(){
    cnt--;
    mainSlideFn();
    
}

// 메인 슬라이드 넘어가는 알고리즘 구상 어려우면 css를 이용하여 수동으로 해보기
//.slide-wrap {position:relative;left:calc(-829px*0);width:calc(829px*4);
    //즉, 왼쪽으로 -829px 이동시키는데 각 슬라이드의 번호만큼 곱해주면 해당 슬라이드가 나옴

function mainSlideFn(){ //중앙 슬라이드가 움직이는 함수를 만들어서 각 버튼선택자에 넣을거라 함수로 만들어줌
    // $(".slide-wrap").stop().animate({left : -829 * 0},600)
    // $(".slide-wrap").stop().animate({left : -829 * 1},600)
    // $(".slide-wrap").stop().animate({left : -829 * 2},600)
    // $(".slide-wrap").stop().animate({left : -829 * 3},600)
    //☝ 이렇게 하면 반복해서 써야되고, 오른쪽 버튼 함수를 또 만들어야 하니까 전역변수 만들고 왼쪽일때, 오른쪽일 때 걸어줄 조건문사용

    $(".slide-wrap").stop().animate({left : -829 * cnt},600,function(){
        if( cnt > 3 ){
            cnt = 0;
        }
        if ( cnt < 0 ){
            cnt = 3;
        }
        $(".slide-wrap").stop().animate({left : -829 * cnt},0);
    });
};

// 버튼에 클릭 이벤트 걸기
// next, prev슬라이드 함수 넣기
$(".left-btn").on({
    click:function(){
        nextSlideFn();
    }
});

$(".right-btn").on({
    click:function(){
        prevSlideFn();
    }
})




})(window, document, jQuery);