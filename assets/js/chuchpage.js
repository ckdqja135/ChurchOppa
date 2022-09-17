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
                pagination();
                $('.pagination li:first-child').addClass("disabled");
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

    function shareTwitter(){
		// var sendText = window.location.href.split('/')[5];
		let sendText = "교회 추천합니다.";
		//var sendUrl = "www.mysoftwiz.com/en/openVacanciesDetail/"+seq; // 전달할 URL
		window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + window.location.href);
		// window.open("https://twitter.com/intent/tweet?&url=" + makeUrl());
	}
	function shareFacebook(){
		let url = encodeURIComponent(window.location.href);
		window.open("http://www.facebook.com/sharer/sharer.php?&u=" + url);
	}
	function shareLink(){
		//var sendUrl = "www.mysoftwiz.com/en/openVacancies/"+seq;
		var textArea = document.createElement("textarea");
		document.body.appendChild(textArea);

		textArea.value = window.location.href;

		textArea.select();

		document.execCommand('copy');
		document.body.removeChild(textArea);

		alert("The link has been copied.");
	}

    function refresh() {
        $("#tablediv").load(window.location.href + " #tablediv>*", "");
        inquiry_board();
        pagination();
    }

    function pagination() {
		var req_num_row=5;
		var tr = $('.board tr');
		var total_num_row = tr.length;
        console.log("total_num_row", total_num_row)
		var num_pages = 0;
		if(total_num_row % req_num_row ==0){
			num_pages = total_num_row / req_num_row;
		}
		if(total_num_row % req_num_row >=1){
			num_pages = total_num_row / req_num_row;
			num_pages++;
			num_pages = Math.floor(num_pages++);
		}


    $('.pagination').append(`<li class="page-item disabled"><a class="page-link prev">Previous</a></li>`);

    for(var i=1; i<=num_pages; i++) {
        $('.pagination').append(`<li class="page-item"><a class="page-link ${i}">${i}</a></li>`);
        $('.pagination li:nth-child(2)').addClass("active");
        $('.pagination a').addClass("pagination-link");
    }

    $('.pagination').append(`<li class="page-item disabled"><a class="page-link next">Next</a></li>`);

		tr.each(function(i) {
            $(this).hide();
            if(i+1 <= req_num_row) {
                tr.eq(i).show();
            }
		});

    $('.pagination a').click('.pagination-link', function(e) {
        e.preventDefault();
        tr.hide();
        var page=$(this).text();
        var temp=page-1;
        var start=temp*req_num_row;
        var current_link = temp;

        console.log("page", page, "start", start, "temp", temp)

    $('.pagination li').removeClass("active");
        $(this).parent().addClass("active");

        for(var i=0; i< req_num_row; i++){
            tr.eq(start+i).show();
        }

        if(temp >= 1){
            $('.pagination li:first-child').removeClass("disabled");
        } else {
            $('.pagination li:first-child').addClass("disabled");
        }
            
		});

        $('.page-link prev').click(function(e){
            e.preventDefault();
            $('.page-link 1 pagination-link').click();
            $('.page-link prev li:first-child').removeClass("active");
        });

        $('.page-link next').click(function(e){
            e.preventDefault();
            $('.page-link next li:last-child').removeClass("active");
        });
	}

    window.pagination = pagination;
    window.refresh = refresh;
    window.shareTwitter = shareTwitter;
    window.shareFacebook = shareFacebook;
    window.shareLink = shareLink;
    window.likeEvent = likeEvent;
    // window.likeevent2 = likeevent2;
    window.initButton = initButton;
    window.inquiry_board = inquiry_board;
    window.create_board = create_board;
})(window);