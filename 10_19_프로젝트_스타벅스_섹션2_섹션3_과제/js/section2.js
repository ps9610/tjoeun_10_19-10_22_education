(function(window, document, $){
    //section3 slide-bg
    $(".promotion-btn").on({
        click:function(e){
            e.preventDefault();

            $(this).toggleClass("addUp");
        }
    });
})(window, document, jQuery);