(function (window) {
    $(document).ready(function(){
        get_board();
        var reply_count = 0; //원래 DB에 저장하고 저장 아이디 번호를 넘겨줘야 하는데 DB 없이 댓글 소스만 있어 DB 에서 아이디 증가하는것처럼 스크립트에서 순번을 생성
            // check = true;//삭제 되면 체크값을 true로 변경
            // //댓글 삭제
            // if(check){
            //     //삭제하면서 하위 댓글도 삭제
            //     var prevTr = $(this).parent().parent().next(); //댓글의 다음

            //     while(prevTr.attr("reply_type")=="sub"){//댓글의 다음이 sub면 계속 넘어감
            //         prevTr = prevTr.next();
            //         prevTr.prev().remove();
            //     }
            //     //마지막 리플 처리
            //     if(prevTr.attr("reply_type") == undefined){
            //         prevTr = $(this).parent().parent();
            //         prevTr.remove();
            //     }
            //     $(this).parent().parent().remove(); 
            // }
            $('.event-dropdown').on('show.bs.dropdown', function () {   
                console.log("메뉴가 열리기 전 이벤트!");  
            });  
            // dropdown 메뉴가 보이기 직후에 호출되는 이벤트  
            $('.event-dropdown').on('shown.bs.dropdown', function () {    
                console.log("메뉴가 열린 후 이벤트!");  
            });  
            // dropdown 메뉴가 사라지기 직전에 호출되는 이벤트  
            $('.event-dropdown').on('hide.bs.dropdown', function () {   
                console.log("메뉴가 닫히기 전 이벤트!");  
            });  
            // dropdown 메뉴가 사라진 직후에 호출되는 이벤트  
            $('.event-dropdown').on('hidden.bs.dropdown	', function () {    
                console.log("메뉴가 닫힌 후 이벤트!");  
            });
    });
    var status = false; //수정과 대댓글을 동시에 적용 못하도록
        //댓글 수정 취소
        $(document).on("click","button[name='reply_modify_cancel']", function(){
            //원래 데이터를 가져온다.
            var r_type = $(this).attr("r_type");
            var r_content = $(this).attr("r_content");
            var r_writer = $(this).attr("r_writer");
            var reply_id = $(this).attr("reply_id");
            var reply;
            //자기 위에 기존 댓글 적고 
            if(r_type=="main"){
                reply = 
                    '<tr reply_type="main">'+
                    '   <td width="820px">'+
                    r_content+
                    '   </td>'+
                    '   <td width="100px">'+
                    r_writer+
                    '   </td>'+
                    '   <td width="100px">'+
                    '       <input type="password" id="reply_password_'+reply_id+'" style="width:100px;" maxlength="10" placeholder="패스워드"/>'+
                    '   </td>'+
                    '   <td align="center">'+
                    '       <button name="reply_reply" reply_id = "'+reply_id+'">댓글</button>'+
                    '       <button name="reply_modify" r_type = "main" reply_id = "'+reply_id+'">수정</button>      '+
                    '       <button name="reply_del" reply_id = "'+reply_id+'">삭제</button>      '+
                    '   </td>'+
                    '</tr>';
            }else{
                reply = 
                    '<tr reply_type="sub">'+
                    '   <td width="820px"> → '+
                    r_content+
                    '   </td>'+
                    '   <td width="100px">'+
                    r_writer+
                    '   </td>'+
                    '   <td width="100px">'+
                    '       <input type="password" id="reply_password_'+reply_id+'" style="width:100px;" maxlength="10" placeholder="패스워드"/>'+
                    '   </td>'+
                    '   <td align="center">'+
                    '       <button name="reply_modify" r_type = "sub" reply_id = "'+reply_id+'">수정</button>'+
                    '       <button name="reply_del" reply_id = "'+reply_id+'">삭제</button>'+
                    '   </td>'+
                    '</tr>';
            }
            
            var prevTr = $(this).parent().parent();
            //자기 위에 붙이기
            prevTr.after(reply);
            //자기 자신 삭제
            $(this).parent().parent().remove(); 
            status = false;
        });

        // 삭제 버튼 클릭 시 이벤트
        $(document).on("click","button[name='reply_del']", function (){
            comment_idx = $(this).attr("reply_id");
            comment_pw = "reply_password_"+comment_idx;
            delete_comment_show_event(comment_idx);
        });

        //대댓글 입력창
        $(document).on("click","button[name='reply_reply']",function(){ //동적 이벤트
            if(status){
                alert("수정과 대댓글은 동시에 불가합니다.");
                return false;
            }

            status = true;
            $("#reply_add").remove();
            var reply_id = $(this).attr("reply_id");
            var last_check = false;//마지막 tr 체크

            //입력받는 창 등록
            var replyEditor = 
                '<tr id="reply_add" class="reply_reply">'+
                '   <td width="820px">'+
                '       <textarea name="reply_reply_content" rows="3" cols="50"></textarea>'+
                '   </td>'+
                '   <td width="100px">'+
                '       <input type="text" name="reply_reply_writer" style="width:100%;" maxlength="10" placeholder="작성자"/>'+
                '   </td>'+
                '   <td width="100px">'+
                '       <input type="password" name="reply_reply_password" style="width:100%;" maxlength="10" placeholder="패스워드"/>'+
                '   </td>'+
                '   <td align="center">'+
                '       <button name="reply_reply_save" reply_id="'+reply_id+'">등록</button>'+
                '       <button name="reply_reply_cancel">취소</button>'+
                '   </td>'+
                '</tr>';

            var prevTr = $(this).parent().parent().next();

            //부모의 부모 다음이 sub이면 마지막 sub 뒤에 붙인다.
            //마지막 리플 처리
            if(prevTr.attr("reply_type") == undefined){
                prevTr = $(this).parent().parent();
            }else{
                while(prevTr.attr("reply_type")=="sub"){//댓글의 다음이 sub면 계속 넘어감
                    prevTr = prevTr.next();
                }
                if(prevTr.attr("reply_type") == undefined){//next뒤에 tr이 없다면 마지막이라는 표시를 해주자
                    last_check = true;
                }else{
                    prevTr = prevTr.prev();
                }
            }

            if(last_check){//마지막이라면 제일 마지막 tr 뒤에 댓글 입력을 붙인다.
                $('#reply_area tr:last').after(replyEditor);    
            }else{
                prevTr.after(replyEditor);
            }
        });

        //대댓글 등록
        $(document).on("click","button[name='reply_reply_save']",function(){
            var reply_reply_writer = $("input[name='reply_reply_writer']");
            var reply_reply_password = $("input[name='reply_reply_password']");
            var reply_reply_content = $("textarea[name='reply_reply_content']");
            var reply_reply_content_val = reply_reply_content.val().replace("\n", "<br>"); //개행처리
            
            // null 검사
            if(reply_reply_writer.val().trim() == ""){
                alert("이름을 입력하세요.");
                reply_reply_writer.focus();
                return false;
            }

            if(reply_reply_password.val().trim() == ""){
                alert("패스워드를 입력하세요.");
                reply_reply_password.focus();
                return false;
            }

            if(reply_reply_content.val().trim() == ""){
                alert("내용을 입력하세요.");
                reply_reply_content.focus();
                return false;
            }

            //값 셋팅
            var objParams = {
                board_id        : $("#board_id").val(),
                parent_id       : $(this).attr("reply_id"), 
                depth           : "1",
                reply_writer    : reply_reply_writer.val(),
                reply_password  : sha256(reply_reply_password.val().trim()),
                reply_content   : reply_reply_content_val
            };
            
            var reply_id;

            //ajax 호출
            /*
            $.ajax({
                url         :   "/board/reply/save",
                dataType    :   "json",
                contentType :   "application/x-www-form-urlencoded; charset=UTF-8",
                type        :   "post",
                async       :   false, //동기: false, 비동기: ture
                data        :   objParams,
                success     :   function(retVal){
                    if(retVal.code != "OK") {
                        alert(retVal.message);
                    }else{
                        reply_id = retVal.reply_id;
                    }
                },
                error       :   function(request, status, error){
                    console.log("AJAX_ERROR");
                }
            });
            */

            reply_id = reply_count++;//DB에 저장했다 하고 순번을 생성

            var reply = 
                '<tr reply_type="sub">'+
                '   <td width="820px"> → '+
                reply_reply_content_val+
                '   </td>'+
                '   <td width="100px">'+
                reply_reply_writer.val()+
                '   </td>'+
                '   <td width="100px">'+
                '       <input type="password" id="reply_password" style="width:100px;" maxlength="10" placeholder="패스워드"/>'+
                '   </td>'+
                '   <td align="center">'+
                '       <button name="reply_modify" r_type = "sub" reply_id = "'+reply_id+'">수정</button>'+
                '       <button name="reply_del" reply_id = "'+reply_id+'">삭제</button>'+
                '   </td>'+
                '</tr>';
            var prevTr = $(this).parent().parent().prev();

            prevTr.after(reply);
            $("#reply_add").remove();
            status = false;
        });

        //대댓글 입력창 취소
        $(document).on("click","button[name='reply_reply_cancel']",function(){
            $("#reply_add").remove();
            status = false;
        });

        // 댓글 index
        var comment_idx;
        // 작성자 비밀번호
        var comment_pw;

    //댓글 삭제
    function del_comment(comment_id) {
        //패스워드와 인덱스 넘겨 삭제를 한다.
        //값 셋팅
        var objParams = {
                reply_pw         : sha256($(`#reply_password_${comment_id}`).val().trim()),
                reply_idx        : comment_idx
        };

        if($(`#reply_password_${comment_id}`).val().trim() == '') {
            jQuery.noConflict();
            $('#nullModal').modal('show');
        } else {
            //ajax 호출
            $.ajax({
                url         :   "/ajax/delete_comment",
                type        :   "post",
                data        :   objParams,
                success     :   function(result){
                    if(result.affectedRows > 0) {
                        jQuery.noConflict();
                        $('#confirmModal').modal('hide');
                        $('#DeleteModal').modal('show');
                    } else {
                        jQuery.noConflict();
                        $('#confirmModal').modal('hide');
                        $('#FailModal').modal('show');
                    }
                },
                error       :   function(request, status, error){
                    console.log("AJAX_ERROR");
                }
            });
        }
    }

    //댓글 수정 저장
    $(document).on("click","button[name='reply_modify']", function(){
        comment_idx = $(this).attr("reply_id");
        modify_form_show(comment_idx);
        // null 체크
        // if($("#reply_modify_password_"+reply_id).val().trim() == ""){
        //     alert("패스워드를 입력하세요.");
        //     $("#reply_modify_password_"+reply_id).focus();
        //     return false;
        // }

        // if($("#reply_modify_content_"+reply_id).val().trim() == ""){
        //     alert("내용을 입력하세요.");
        //     $("#reply_modify_content_"+reply_id).focus();
        //     return false;
        // }
        // //DB에 업데이트 하고
        // //ajax 호출 (여기에 댓글을 저장하는 로직을 개발)
        // var reply_content = $("#reply_modify_content_"+reply_id).val().replace("\n", "<br>"); //개행처리
        // var r_type = $(this).attr("r_type");
        // var parent_id;
        // var depth;

        // if(r_type=="main"){
        //     parent_id = "0";
        //     depth = "0";
        // }else{
        //     parent_id = $(this).attr("reply_id");
        //     depth = "1";
        // }

        // //값 셋팅
        // var objParams = {
        //     board_id        : $("#board_id").val(),
        //     parent_id       : parent_id, 
        //     depth           : depth,
        //     reply_writer    : $("#reply_modify_writer_"+reply_id).val(),
        //     reply_password  : $("#reply_modify_password_"+reply_id).val(),
        //     reply_content   : reply_content
        // };
        // /*
        // $.ajax({
        //     url         :   "/board/reply/update",
        //     dataType    :   "json",
        //     contentType :   "application/x-www-form-urlencoded; charset=UTF-8",
        //     type        :   "post",
        //     async       :   false, //동기: false, 비동기: ture
        //     data        :   objParams,
        //     success     :   function(retVal){
        //         if(retVal.code != "OK") {
        //             alert(retVal.message);
        //         }else{
        //             reply_id = retVal.reply_id;
        //         }
        //     },
        //     error       :   function(request, status, error){
        //         console.log("AJAX_ERROR");
        //     }
        // });
        // */
        // //수정된댓글 내용을 적고
        // if(r_type=="main"){
        //     reply = 
        //         '<tr reply_type="main">'+
        //         '   <td width="820px">'+
        //         $("#reply_modify_content_"+reply_id).val()+
        //         '   </td>'+
        //         '   <td width="100px">'+
        //         $("#reply_modify_writer_"+reply_id).val()+
        //         '   </td>'+
        //         '   <td width="100px">'+
        //         '       <input type="password" id="reply_password_'+reply_id+'" style="width:100px;" maxlength="10" placeholder="패스워드"/>'+
        //         '   </td>'+
        //         '   <td align="center">'+
        //         '       <button name="reply_reply" reply_id = "'+reply_id+'">댓글</button>'+
        //         '       <button name="reply_modify" r_type = "main" reply_id = "'+reply_id+'">수정</button>      '+
        //         '       <button name="reply_del" reply_id = "'+reply_id+'">삭제</button>      '+
        //         '   </td>'+
        //         '</tr>';
        // }else{
        //     reply = 
        //         '<tr reply_type="sub">'+
        //         '   <td width="820px"> → '+
        //         $("#reply_modify_content_"+reply_id).val()+
        //         '   </td>'+
        //         '   <td width="100px">'+
        //         $("#reply_modify_writer_"+reply_id).val()+
        //         '   </td>'+
        //         '   <td width="100px">'+
        //         '       <input type="password" id="reply_password_'+reply_id+'" style="width:100px;" maxlength="10" placeholder="패스워드"/>'+
        //         '   </td>'+
        //         '   <td align="center">'+
        //         '       <button name="reply_modify" r_type = "sub" reply_id = "'+reply_id+'">수정</button>'+
        //         '       <button name="reply_del" reply_id = "'+reply_id+'">삭제</button>'+
        //         '   </td>'+
        //         '</tr>';
        // }
        
        // var prevTr = $(this).parent().parent();
        // //자기 위에 붙이기
        // prevTr.after(reply);

        // //자기 자신 삭제
        // $(this).parent().parent().remove(); 

        // status = false;
        
    });

    // 댓글 수정 함수
    function correct_comments(comment_idx) {
        var status = false; //수정과 대댓글을 동시에 적용 못하도록
        var check = false;
        // var reply_idx = $(this).attr("reply_id");
        var r_type = $(this).attr("r_type");
        var reply_password = sha256($(`#reply_password_${comment_idx}`).val().trim());
        var comment_content = $(`#comment_content_${comment_idx}`).val();

        console.log("comment_content", comment_content, reply_password)
        //패스워드와 아이디를 넘겨 패스워드 확인
        //값 셋팅
        var objParams = {
            reply_pw  : reply_password,
            reply_idx       : comment_idx,
            reply_content   : comment_content
        };

        if($(`#reply_password_${comment_idx}`).val().trim() == '') {
            jQuery.noConflict();
            $('#nullModal').modal('show');
        } else {
            //ajax 호출
            $.ajax({
                url         :   "/ajax/correct_comments",
                type        :   "post",
                data        :   objParams,
                success     :   function(result){
                    if (result.affectedRows > 0) {
                        console.log(result)
                        jQuery.noConflict();
                        $('#confirmModal').modal('hide');
                        $('#correctModal').modal('show');
                        $(`#comment_content_${comment_id}`).attr('readonly', true);
                        $(`#reply_password_${comment_id}`).hide();
                        $(`#modify_btn_${comment_id}`).hide();
                        $(`#cancel_btn_${comment_id}`).hide();
                    } else {
                        jQuery.noConflict();
                        $('#confirmModal').modal('hide');
                        $('#FailModal').modal('show');
                    }
                },
                error       :   function(request, status, error){
                    console.log("AJAX_ERROR", request, status, error);
                }
            });

            check = true;//패스워드가 맞으면 체크값을 true로 변경
            if(status){
                alert("수정과 대댓글은 동시에 불가합니다.");
                return false;
            }

            // if(check){
            //     status = true;
            //     //자기 위에 댓글 수정창 입력하고 기존값을 채우고 자기 자신 삭제
            //     var txt_reply_content = comment_content; //댓글내용 가져오기
            //     if(r_type=="sub"){
            //         txt_reply_content = txt_reply_content.replace("→ ","");//대댓글의 뎁스표시(화살표) 없애기
            //     }

            //     var txt_reply_writer = $(this).parent().prev().prev().html().trim(); //댓글작성자 가져오기
                
            //     //입력받는 창 등록
            //     var replyEditor = 
            //         '<tr id="reply_add" class="reply_modify">'+
            //         '   <td width="820px">'+
            //         '       <textarea name="reply_modify_content_'+reply_id+'" id="reply_modify_content_'+reply_id+'" rows="3" cols="50">'+txt_reply_content+'</textarea>'+ //기존 내용 넣기
            //         '   </td>'+
            //         '   <td width="100px">'+
            //         '       <input type="text" name="reply_modify_writer_'+reply_id+'" id="reply_modify_writer_'+reply_id+'" style="width:100%;" maxlength="10" placeholder="작성자" value="'+txt_reply_writer+'"/>'+ //기존 작성자 넣기
            //         '   </td>'+
            //         '   <td width="100px">'+
            //         '       <input type="password" name="reply_modify_password_'+reply_id+'" id="reply_modify_password_'+reply_id+'" style="width:100%;" maxlength="10" placeholder="패스워드"/>'+
            //         '   </td>'+
            //         '   <td align="center">'+
            //         '       <button name="reply_modify_save" r_type = "'+r_type+'" reply_id="'+reply_id+'">등록</button>'+
            //         '       <button name="reply_modify_cancel" r_type = "'+r_type+'" r_content = "'+txt_reply_content+'" r_writer = "'+txt_reply_writer+'" reply_id="'+reply_id+'">취소</button>'+
            //         '   </td>'+
            //         '</tr>';
            //     var prevTr = $(this).parent().parent();
            //     //자기 위에 붙이기
            //     prevTr.after(replyEditor);
                
            //     //자기 자신 삭제
            //     $(this).parent().parent().remove(); 
            //     status = false;
            // }
        }
    }
        
    // 게시판 상세조회.
    function get_board() {
        var _board_no = window.location.href.split('/')[4];
        $.ajax({
            url : '/ajax/board_detail',
            type : "POST",
            data : {
                board_no : _board_no
            },
            success : function(result) {
                let board_body = $(".modal-body");
                if (result) {
                    console.log("result", result)
                    var str = `
                    <h2 class="board_title"> ${result[0].boardTitle} </h2>
                    <h2 class="hits"> ${result[0].boardHits}</h2>

                    <div class="form-group">
                        <div class="input-group" style="display:none">
                            <span class="input-group-text">비밀번호 입력</span> 
                            <form><input type="password" class="form-control" id="writer_pw" autoComplete="off"></form>
                        </div>

                        <button type="button" class="btn btn-primary float-right" id="cancel_btn" onclick="correct_cancel_event()" style="margin:10px; display:none">취소</button>
                        <button type="button" class="btn btn-primary float-right" id="correct_btn" onclick="correct_borad_event();" style="margin:10px; display:none">수정</button>
                        <button type="button" class="btn btn-primary float-right" id="delete_btn" onclick="delete_confirm();" style="margin:10px; display:none">삭제</button>
                        <textarea type="text" class="board-form-control" id="board-content" readonly="true">${result[0].boardContent}</textarea> 
                        <label for="message-text" class="write_id" id="writer_id">${result[0].writerId}</label>
                        <br />
                        <h7 class="reg_date">${result[0].BoardRegDate}</h7>
                    </div>
                    `
                }
                // style="border:none; background:transparent; resize:none; height:400px;"
                board_body.append(str);
                get_board_comment(_board_no);
            },
            error : function(request,status,error) {
                console.log(request+"\n",status,"\n",error, "\n")
            }
        });
    }

    // 댓글 조회하기.
    function get_board_comment(_board_no) {
        $.ajax({
            url : '/ajax/get_board_comment',
            type : "POST",
            data : {
                board_idx : _board_no
            },
            success : function(result) {
                console.log("result", result)
                for (let i = 0; i < result.length; i++) {
                    var reply = 
                        '<tr reply_type="main">'+
                        '   <td width="800px" style="word-break:break-all">'+
                        `     <textarea type="text" class="comment-form-control" id="comment_content_${result[i].CommentId}" readonly="true">${result[i].CommentContent}</textarea>`+
                        '   </td>'+
                        '   <td width="100px">'+
                        result[i].WriterId+
                        '   </td>'+
                        '   <td width="200px">'+
                        '       <form><input type="password" id="reply_password_'+result[i].CommentId+'" style="width:100px;" maxlength="10" placeholder="패스워드" autoComplete="off"/></form>'+
                        `       <button type="button" class="btn btn-danger" id="delete_btn_${result[i].CommentId}" onclick="del_comment(${result[i].CommentId});">삭제</button>` +
                        `       <button type="button" class="btn btn-warning" id="modify_btn_${result[i].CommentId}" onclick="correct_comments(${result[i].CommentId});">수정</button>` +
                        `       <button type="button" class="btn btn-success" id="cancel_btn_${result[i].CommentId}" onclick="comment_cancel_event(${result[i].CommentId});">취소</button>` +
                        '   </td>'+
                        '   <td width="300px">'+
                        '       <button name="reply_reply" type="button" class="btn btn-primary" reply_id = "'+result[i].CommentId+'">댓글</button>'+
                        '       <button name="reply_modify" type="button" class="btn btn-warning" r_type = "main" reply_id = "'+result[i].CommentId+'"">수정</button>'+
                        '       <button name="reply_del" type="button" class="btn btn-danger" reply_id = "'+result[i].CommentId+'">삭제</button>'+
                        '   </td>'+
                        '</tr>';
                    if($('#reply_area').contents().size()==0){
                        $('#reply_area').append(reply);
                    } else {
                        $('#reply_area tr:last').after(reply);
                    }
                    $(`#reply_password_${result[i].CommentId}`).hide();
                    $(`#delete_btn_${result[i].CommentId}`).hide();
                    $(`#cancel_btn_${result[i].CommentId}`).hide();
                    $(`#modify_btn_${result[i].CommentId}`).hide();
                }
            },
            error : function(request,status,error) {
                console.log(request+"\n",status,"\n",error, "\n")
            }
        });
        // return church_data;
    }
    //댓글 저장
    function insert_comment () {
            //null 검사
            if($("#reply_writer").val().trim() == ""){
                alert("이름을 입력하세요.");
                $("#reply_writer").focus();
                return false;
            }
            
            if($("#reply_password").val().trim() == ""){
                alert("패스워드를 입력하세요.");
                $("#reply_password").focus();
                return false;
            }

            if($("#reply_content").val().trim() == ""){
                alert("내용을 입력하세요.");
                $("#reply_content").focus();
                return false;
            }

            var reply_content = $("#reply_content").val().replace("\n", "<br>"); //개행처리
            var reply_id;
            //ajax 호출 (여기에 댓글을 저장하는 로직을 개발)
            
            //값 셋팅
            var objParams = {
                board_id        : window.location.href.split('/')[4],
                parent_id       : "0",  
                depth           : "0",
                reply_writer    : $("#reply_writer").val().trim(),
                reply_password  : sha256($("#reply_password").val().trim()),
                reply_content   : reply_content,
                reply_like      : 0
            };
            
            //ajax 호출 (여기에 댓글을 저장하는 로직을 개발)
            $.ajax({
            url         :   "/ajax/board_comment",
            type        :   "post",
            data        :   objParams,
            success     :   function(result){
            if(result.length > 0) {
                console.log(result)
                reply_id = result.insertId; 

            var reply_area = $("#reply_area");
            var reply = 
                '<tr reply_type="main">'+
                '   <td width="800px" style="word-break:break-all">'+
                reply_content+
                '   </td>'+
                '   <td width="100px">'+
                $("#reply_writer").val()+
                '   </td>'+
                '   <td width="100px">'+
                '       <form><input type="password" id="reply_password_'+reply_id+'" style="width:100px;" maxlength="10" placeholder="패스워드" autoComplete="off"/></form>'+
                `       <button type="button" class="btn btn-danger" id="delete_btn_${reply_id}" onclick="del_comment(${reply_id});">삭제</button>` +
                `       <button type="button" class="btn btn-warning" id="modify_btn_${reply_id}" onclick="correct_comments(${reply_id});">수정</button>` +
                `       <button type="button" class="btn btn-success" id="cancel_btn_${reply_id}" onclick="comment_cancel_event(${reply_id});">취소</button>` +
                '   </td>'+
                '   <td width="300px">'+
                '       <button name="reply_reply" type="button" class="btn btn-primary" reply_id = "'+reply_id+'">댓글</button>'+
                '       <button name="reply_modify" type="button" class="btn btn-warning" r_type = "main" reply_id = "'+reply_id+'">수정</button>'+
                '       <button name="reply_del" type="button" class="btn btn-danger" reply_id = "'+reply_id+'" onclick="delete_comment_show_event();">삭제</button>'+
                '   </td>'+
                '</tr>';

                if($('#reply_area').contents().size()==0){
                    reply_area.append(reply);
                } else {
                    $('#reply_area tr:last').after(reply);
                }

                //댓글 초기화
                $("#reply_writer").val("");
                $("#reply_password").val("");
                $("#reply_content").val("");
                $(`#reply_password_${reply_id}`).hide();
                $(`#delete_btn_${reply_id}`).hide();
                $(`#cancel_btn_${reply_id}`).hide();
                $(`#modify_btn_${reply_id}`).hide();
            }
        },
            error       :   function(request, status, error){
                console.log("AJAX_ERROR");
            }
        });
    }
    // 설정 - 수정 메뉴 선택 시
    function correct_board_button_event() {
        $('#board-content').attr('readonly', false);
        $('#cancel_btn').show();
        $('#correct_btn').show();
        $('.input-group').show();
        $('#settings').hide();
    }

    // 게시글 수정 이벤트 -> 수정 버튼 클릭 이벤트.
    function correct_borad_event() {
         //값 셋팅
        var objParams = {
            board_id        : window.location.href.split('/')[4],
            writer_password  : sha256($("#writer_pw").val().trim()),
            board_content   : $('#board-content').val().trim()
        };
        if($("#writer_pw").val().trim() == '') {
            jQuery.noConflict();
            $('#nullModal').modal('show');
        } else {
            //ajax 호출 (여기에 댓글을 저장하는 로직을 개발)
            $.ajax({
                url         :   "/ajax/correct_borad",
                type        :   "POST",
                data        :   objParams,
                success     :   function(result){
                if(result.affectedRows > 0) {
                    jQuery.noConflict();
                    $('#confirmModal').modal('hide');
                    $('#correctModal').modal('show');
                    $('#board-content').attr('readonly', true);
                    $('#cancel_btn').hide();
                    $('#correct_btn').hide();
                    $('.input-group').hide();
                    $('#settings').show();
                } else {
                    jQuery.noConflict();
                    $('#confirmModal').modal('hide');
                    $('#FailModal').modal('show');
                }
            },
                error       :   function(request, status, error){
                    console.log("AJAX_ERROR");
                }
            });
        }
    }

    // 수정 취소 버튼 이벤트
    function correct_cancel_event() {
        $('#board-content').attr('readonly', true);
        $('#correct_btn').hide();
        $('#cancel_btn').hide();
        $('.input-group').hide();
        $('#delete_btn').hide();
        $('#settings').show();
    }

     // 댓글 취소 버튼 이벤트
    function comment_cancel_event(commentId) {
        $(`#reply_password_${commentId}`).hide();
        $(`#delete_btn_${commentId}`).hide();
        $(`#cancel_btn_${commentId}`).hide();
        $(`#modify_btn_${commentId}`).hide();
    }

    // 설정 - 삭제 메뉴 클릭 이벤트.
    function delete_board_button_event() {
        $('#delete_btn').show();
        $('#cancel_btn').show();
        $('.input-group').show();
    }

    // 댓글 - 삭제 버튼 클릭 시.
    function delete_comment_show_event(comment_id) {
        $(`#reply_password_${comment_id}`).show();
        $(`#delete_btn_${comment_id}`).show();
        $(`#cancel_btn_${comment_id}`).show();
    }

    // 댓글 - 수정 버튼 클릭 시.
    function modify_form_show(comment_id) {
        $(`#comment_content_${comment_id}`).attr('readonly', false);
        $(`#reply_password_${comment_id}`).show();
        $(`#modify_btn_${comment_id}`).show();
        $(`#cancel_btn_${comment_id}`).show();
    }

    // 설정 - 삭제 시 확인 모달 창.
    function delete_confirm() {
        jQuery.noConflict();
        $('#delete_check_Modal').modal('show');
    }

    // 삭제 버튼 이벤트.
    function delete_board_event() {
            //값 셋팅
        var objParams = {
            board_idx        : window.location.href.split('/')[4],
            writer_password  : sha256($("#writer_pw").val().trim())
        };

        if($("#writer_pw").val().trim() == '') {
            jQuery.noConflict();
            $('#nullModal').modal('show');
        } else {
            //ajax 호출 (여기에 댓글을 저장하는 로직을 개발)
            $.ajax({
                url         :   "/ajax/delete_board",
                type        :   "POST",
                data        :   objParams,
                success     :   function(result){
                    console.log(result)
                if(result[0].affectedRows > 0) {
                    jQuery.noConflict();
                    $('#delete_check_Modal').modal('hide');
                    $('#Delete_Modal').modal('show');
                } else {
                    jQuery.noConflict();
                    $('#FailModal').modal('show');
                }
            },
                error       :   function(request, status, error){
                    console.log("AJAX_ERROR");
                }
            });
        }
    }

    window.modify_form_show = modify_form_show;
    window.comment_cancel_event = comment_cancel_event;
    window.delete_comment_show_event = delete_comment_show_event;
    window.delete_confirm = delete_confirm;
    window.delete_board_event = delete_board_event;
    window.correct_cancel_event = correct_cancel_event;
    window.delete_board_button_event = delete_board_button_event;
    window.correct_borad_event = correct_borad_event;
    window.correct_board_button_event = correct_board_button_event;
    window.correct_comments = correct_comments;
    window.insert_comment = insert_comment;
    window.del_comment = del_comment;

})(window);