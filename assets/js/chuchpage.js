(function (window) {
    function likeEvent() {
        let heartSpan = document.querySelectorAll('.icon');
        
        for(let i = 0; i< heartSpan.length; i++) {
            $(heartSpan[i]).on('click', function(e){
                if(heartSpan[i].classList.value == "icon like-default") {
                    heartSpan[i].classList.value = "icon like-fill";
                    heartSpan[i].firstChild.classList.value = "fa fa-heart";
                    e.stopPropagation();
                } else {
                    heartSpan[i].classList.value = "icon like-default";
                    heartSpan[i].firstChild.classList.value = "fa fa-heart-o";
                    e.stopPropagation();
                }
            });
        }
    }

    $( "button[id*='like']" ).click(function() {
        console.log($(this).attr('id'));
    })

    // function likeevent2()  {
    //     var btn1 = document.querySelectorAll('btn like');
    //     var btn2 = document.querySelectorAll('btn dislike');
    //     console.log("btn1", btn1)
    //     // btn1.addEventListener('click', function() {
          
    //     //     if (btn2.classList.contains('red')) {
    //     //       btn2.classList.remove('red');
    //     //     } 
    //     //   this.classList.toggle('green');
          
    //     // });
        
    //     // btn2.addEventListener('click', function() {
          
    //     //     if (btn1.classList.contains('green')) {
    //     //       btn1.classList.remove('green');
    //     //     } 
    //     //   this.classList.toggle('red');
          
    //     // });
        
        
    // }

    // 모달 입력 값 초기화
    function initButton() {
        $("#recipient-title").val("");
        $("#message-text").val("");
        $("#id").val("");
        $("#pw").val("");
        $('#replyId').val("");
        $('#replyPassword').val("");
    }

    // 게시판 조회하기.
    function inquiry_board() {
        let _church_no = window.church_data[0].ChurchNo;
        $.ajax({
            url : '/ajax/inquiry_board',
            type : "POST",
            data : {
                church_no : _church_no
            },
            success : function(result) {
                let church_board = $('.board');
                for(let i = 0; i < result.length; i++) {
                    let str = ` 
                                <tr >
                                    <td id="title" style="cursor: pointer;" ><a onclick="move_link('/board/', ${result[i].BoardNo})"><h6>${result[i].BoardTitle}</h6></td>
                                    <td id="id"><h6>${result[i].BoardID}</h6></td>
                                    <td id="Regdate"><h6>${result[i].BoardRegDate}</h6></td>
                                    <td id="hits"><h6>${result[i].BoardHits}</h6></td>
                                    <td>
                                        <button class="likebtn" id="like${i}" onclick="likeEvent()">
                                            <span id = heart${i} class="icon like-default"><i class="fa fa-heart-o" aria-hidden="true" ></i> ${result[i].BoardLike} </span>
                                        </button>   
                                    </td>
                                </tr>`;
                    church_board.append(str);
                }
                // console.log("얘는 왜 실행?")
            },
            error : function(request,status,error) {
                console.log(request+"\n",status,"\n",error, "\n")
            }
        });
        // return church_data;
    }
    // 날짜나 달에 1의 자리만 있을 경우 0을 붙여주는 함수.
    function day_month_format(n) {
        return (n < 10 ? '0' : '') + n;
    }

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
            board_pw : sha256($('#replyPassword').val().trim()),
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
                $(".board").empty();
                inquiry_board();
                // console.log("얘는 왜 실행?")
            },
            error : function(request,status,error) {
                console.log(request+"\n",status,"\n",error, "\n")
            }
        });
        // return church_data;
    }
    window.likeEvent = likeEvent;
    // window.likeevent2 = likeevent2;
    window.initButton = initButton;
    window.inquiry_board = inquiry_board;
    window.create_board = create_board;
})(window);