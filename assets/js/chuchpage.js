(function (window) {
    // 테이블 클릭시 모달 창 열리도록 추가.
    $('.table').on('click', () => {
        $('#reviewModal').modal('show');
    })

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

    window.getData = getData;
    window.initButton = initButton;
})(window);