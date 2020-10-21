(function(window,document,$){
    var cnt=-1;

    //공지사항 롤링 슬라이드 상하
    function noticeSlideFn(){
        cnt++; 
        if(cnt>3){
            cnt=-1;
        }
        $(".notice-list li").stop().animate({top:24},0).css({zIndex:2});
        $(".notice-list li").eq(cnt<0?4:cnt).stop().animate({top:0},0).css({zIndex:1}); 
        $(".notice-list li").eq(cnt+1).stop().animate({top:0},1000).css({zIndex:3});
    }

    setInterval(noticeSlideFn, 2500);

//0 1
//1 2
//2 3
//3 4
//4 0

    


    //섹션2의 프로모션 버튼 클릭 이벤트 리스너
    $(".promotion-btn").on({
        click:  function(e){
            e.preventDefault();
            
            $(this).toggleClass("addUp");
            $("#section3").stop().slideToggle(500);
        }
    });


}(window,document,jQuery));