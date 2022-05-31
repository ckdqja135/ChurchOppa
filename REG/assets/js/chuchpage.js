(function (window) {

    // var startingNumber = 0;

    // function AddValue()
    // {
    // startingNumber++;
    // $(this).text(startingNumber);
    // }
    // 모달 입력 값 가져오기
    function getData() {
        let title = $("#recipient-title").val().trim(); 
        let content = $("#message-text").val();
        $('#reviewModal').modal("hide");
        $(".modal-backdrop").remove();
        console.log("title", title, "content", content);
    }

    // 모달 입력 값 초기화
    function initButton() {
        $("#recipient-title").val("");
        $("#message-text").val("");
        $("#id").val("");
        $("#pw").val("");
    }

    $(document).ready(function () {
        // 테이블 클릭시 페이지 이동.
        $('.table').on('click', () => {
            let link = '/Board';
            location.href = link;
        })

        // 좋아요 버튼 클릭 이벤트.
        $("[id^=like]").on('click', function(e){
            var id = $(this).attr("id"); 
            var number = id.replace("like", "");
            e.stopPropagation();

            if($(`#heart${number}`).hasClass("liked")){
                $(`#heart${number}`).html('<i class="fa fa-heart-o" aria-hidden="true"></i>');
                $(`#heart${number}`).removeClass("liked");
            }else{
                $(`#heart${number}`).html('<i class="fa fa-heart" aria-hidden="true"></i>');
                $(`#heart${number}`).addClass("liked");
            }
        });
    });

    // window.liked = liked;
    window.getData = getData;
    window.initButton = initButton;
})(window);