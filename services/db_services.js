class db_services {
    constructor () {
        // dbconneciton 
        this.db_connector = require('../conf/db_conn');
        this.dbc = this.db_connector.init(); // db connection
    }

    // 게시글 등록
    async create_board(out, params) {
        let board_SQL = "INSERT INTO board (Church_No, BoardTitle, BoardRegDate, BoardLike, BoardHits, BoardID, BoardPW) VALUES (?, ?, ?, ?, ?, ?, ?);";
        let board_detail_SQL = "INSERT INTO board_detail (boardID, boardContent, boardTitle, BoardLike, BoardHits, writerId, writerPw) VALUES  (?, ?, ?, ?, ?, ?, ?);";
        // let JOBS_APPLICATION_LANG = "INSERT INTO JOBS_APPLICATION_LANG(JOBS_APPLICATION_SEQ, NAME) VALUES (?, ?);";
        let conn =  await this.dbc.getConnection();
        let result = null;
        let error = null;
        console.log("board_detail_SQL", board_detail_SQL)
        try {
            await conn.beginTransaction(); // 트랜잭션 적용 시작

            let ins_application = await conn.query(board_SQL, [params.church_no, params.board_title, params.board_reg, 
                                                    params.board_like, params.board_hits, params.board_id, params.board_pw]);
            let board_seq = ins_application[0].insertId;
            let ins_application_detail = await conn.query(board_detail_SQL,[board_seq, params.board_content, params.board_title, params.board_like, params.board_hits, params.board_id, params.board_pw]);
            // const ins_application_lang = await conn.query(JOBS_APPLICATION_LANG, [jobAppSeq, params.name]);
            
            await conn.commit(); // 커밋
            result = ins_application_detail;
            out(error, result);
        } catch (err) {
            error = err;
            console.log(err)
            out(error, result);
            await conn.rollback() // 롤백
            // return res.status(500).json(err)
        } finally {
            conn.release() // con 회수
        }
    }

    
    // 게시글 검색
    async inquiry_board (out, no) {
        let sql = "SELECT * FROM board where Church_No = "+no+"";
        console.log("sql", sql)
        
        let conn =  await this.dbc.getConnection();
        let result = null;
        let error = null;
        try {
            await conn.beginTransaction(); // 트랜잭션 적용 시작
            let select_board = await conn.query(sql);
            await conn.commit(); // 커밋
            result = select_board[0];
            out(error, result);
            console.log("result", result)
        }catch (err) {
            error = err;
            console.log(err)
            out(error, result);
            await conn.rollback() // 롤백
            // return res.status(500).json(err)
        } finally {
            conn.release() // con 회수
        }
    }

       // 게시글 상세 페이지 데이터 가져오기
    async get_board_detail (out, no) {
        let sql = "SELECT * FROM board_detail where boardID = "+no+"";
        console.log("sql", sql)
        
        let conn =  await this.dbc.getConnection();
        let result = null;
        let error = null;
        try {
            await conn.beginTransaction(); // 트랜잭션 적용 시작
            let select_board = await conn.query(sql);
            await conn.commit(); // 커밋
            result = select_board[0];
            out(error, result);
            console.log("result", result)
        }catch (err) {
            error = err;
            console.log(err)
            out(error, result);
            await conn.rollback() // 롤백
            // return res.status(500).json(err)
        } finally {
            conn.release() // con 회수
        }
    }

    // 교회 검색
    async search_church (out, name) {
        let sql = "select * from churchinfo where churchname = '"+name+"'";
        console.log("sql", sql)
        
        let conn =  await this.dbc.getConnection();
        let result = null;
        let error = null;
        try {
            await conn.beginTransaction(); // 트랜잭션 적용 시작
            let select_church = await conn.query(sql);
            await conn.commit(); // 커밋
            result = select_church[0];
            out(error, result);
        }catch (err) {
            error = err;
            console.log(err)
            out(error, result);
            await conn.rollback() // 롤백
            // return res.status(500).json(err)
        } finally {
            conn.release() // con 회수
        }
    }

    // 교회 자동 검색
    async auto_search_church (out, keyword) {
        let sql = "select * from churchinfo where churchname != '' AND churchname like '%"+keyword+"%' LIMIT 0, 10";
        console.log("sql", sql)
        
        let conn =  await this.dbc.getConnection();
        let result = null;
        let error = null;
        try {
            await conn.beginTransaction(); // 트랜잭션 적용 시작
            let select_church = await conn.query(sql);
            await conn.commit(); // 커밋
            result = select_church[0];
            out(error, result);
            console.log("result", result)
        }catch (err) {
            error = err;
            console.log(err)
            out(error, result);
            await conn.rollback() // 롤백
            // return res.status(500).json(err)
        } finally {
            conn.release() // con 회수
        }
    }

    // 댓글 Insert.
    async save_comment (out, params) {
        let comment_SQL = "INSERT INTO board_comment (BoardID, CommentDepth, WriterId, WriterPw, Commnetperent, CommentContent, CommentLike) VALUES (?, ?, ?, ?, ?, ?, ?);";
        
        // let JOBS_APPLICATION_LANG = "INSERT INTO JOBS_APPLICATION_LANG(JOBS_APPLICATION_SEQ, NAME) VALUES (?, ?);";
        let conn =  await this.dbc.getConnection();
        let result = null;
        let error = null;

        try {
            await conn.beginTransaction(); // 트랜잭션 적용 시작

            let ins_application = await conn.query(comment_SQL, [params.board_id, params.depth, params.reply_writer, 
                                                    params.reply_password, params.parent_id, params.reply_content, params.reply_like]);
            await conn.commit(); // 커밋
            result = ins_application;
            out(error, result);
        } catch (err) {
            error = "[Error} : " + params.board_id + "번 게시물의 " + params.reply_writer + "의 유저의 댓글등록이 실패하였습니다.";
            console.log(err)
            out(error, result);
            await conn.rollback() // 롤백
            // return res.status(500).json(err)
        } finally {
            conn.release() // con 회수
        }
    }

      // 댓글 조회
    async get_comment (out, idx) {
        let sql = "select * from board_comment where BoardID = "+idx+"";
        console.log("sql", sql)
        
        let conn =  await this.dbc.getConnection();
        let result = null;
        let error = null;
        try {
            await conn.beginTransaction(); // 트랜잭션 적용 시작
            let select_church = await conn.query(sql);
            await conn.commit(); // 커밋
            result = select_church[0];
            out(error, result);
            console.log("result", result)
        }catch (err) {
            error = err;
            console.log(err)
            out(error, result);
            await conn.rollback() // 롤백
            // return res.status(500).json(err)
        } finally {
            conn.release() // con 회수
        }
    }
}

module.exports = new db_services();