(function (window) {
    // 모달 입력 값 초기화
    function initButton() {
        $("#recipient-title").val("");
        $("#message-text").val("");
        $("#id").val("");
        $("#pw").val("");
        $('#replyId').val("");
        $('#replyPassword').val("");
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

    
        // 날짜나 달에 1의 자리만 있을 경우 0을 붙여주는 함수.
        function day_month_format(n) {
            return (n < 10 ? '0' : '') + n;
        }

        // function inquiry_board() {
        //     let church_no = window.church_data[0].ChurchNo;
        //     console.log("church_no", church_no)
        //     $.ajax({
        //         url : '/ajax/inquiry_board',
        //         type : "POST",
        //         data : church_no,
        //         success : function(result) {
        //             for(let i = 0; i < result.length; i++) {
        //                 let str = ` <tr>
        //                     <td><h6>${result[i].BoardTitle}</h6></td>
        //                     <td><h6>${result[i].BoardID}</h6></td>
        //                     <td><h6>${result[i].BoardRegDate}</h6></td>
        //                     <td><h6>${result[i].BoardHits}</h6></td>
        //                     <td>
        //                         <button class="likebtn" id="like1">
        //                             <span id = heart><i class="fa fa-heart-o" aria-hidden="true" ></i> ${result[i].BoardLike} </span>
        //                         </button>
        //                     </td>
        //                 </tr>`;
        //                 church_board.append(str);
        //             }
        //             // console.log("얘는 왜 실행?")
        //         },
        //         error : function(request,status,error) {
        //             console.log(request+"\n",status,"\n",error, "\n")
        //         }
        //     });
        //     // return church_data;
        // }

        function create_board() {
            //  오늘 날짜 포맷 만들기.
            var date = new Date();
            var month = day_month_format(date.getMonth()+1); //months (0-11)
            var day = day_month_format(date.getDate()); //day (1-31)
            var year = date.getFullYear();
            var date_format =  year + "-" + month + "-" + day;

            var board_data = {
                church_no : window.church_data[0].ChurchNo,
                board_title : $('#recipient-title').val().trim(),
                board_content : $('#message-text').val(),
                board_reg : date_format,
                board_like : 0,
                board_hits : 0,
                board_id : $('#replyId').val().trim(),
                board_pw : $('#replyPassword').val().trim(),
            };
            $.ajax({
                url : '/ajax/create_board',
                type : "POST",
                data : board_data,
                success : function(result) {
                    console.log(result);
                    $('#reviewModal').modal("hide");
                    $(".modal-backdrop").remove();
                    initButton();
                    inquiry_board();
                    // console.log("얘는 왜 실행?")
                },
                error : function(request,status,error) {
                    console.log(request+"\n",status,"\n",error, "\n")
                }
            });
            // return church_data;
        }
        window.initButton = initButton;
        window.create_board = create_board;
})(window);