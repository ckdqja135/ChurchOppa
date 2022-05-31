class db_services {
    constructor () {
        // dbconneciton 
        this.db_connector = require('../conf/db_conn');
        this.dbc = this.db_connector.init(); // db connection
    }

    exec_query (query, a, b) {
        this.dbc.getConnection(function (err, conn) {
            if (err) {
                console.log("db connection poll error -- start");
                console.log(err);
                console.log("db connection poll error -- end");
                return null;
            }

            if (!b && typeof a === 'function') {
                conn.query(query, a);
                console.log("query", query)
            } else {
                conn.query(query, a, b);
            }
            conn.release();
        });
    }

    async post_apply(out, params) {
        let JOBS_APPLICATION_SQL = "INSERT INTO JOBS_APPLICATION (JOBS_SEQ, CONTENTS_LANG, EMAIL, PHONE, LINK1, LINK2, LINK3, CONFIRM_STATUS, REG_DTIME) VALUES (?, 'en', ?, ?, ?, ?, ?,'N',?);";
        let JOBS_APPLICATION_FILES_SQL = "INSERT INTO JOBS_APPLICATION_FILES (JOBS_APPLICATION_SEQ, TYPE, FILE_PATH, ORIGIN_NAME, FILE_NAME, FILE_SIZE, EXT, MIME_TYPE ) VALUES  (?, ?, ?, ?, ?, ?, ?, ?);";
        let JOBS_APPLICATION_LANG = "INSERT INTO JOBS_APPLICATION_LANG(JOBS_APPLICATION_SEQ, NAME) VALUES (?, ?);";
        let conn =  await this.dbc2.getConnection();
        let result = null;
        let error = null;
            try {
                await conn.beginTransaction(); // 트랜잭션 적용 시작

                let ins_application = await conn.query(JOBS_APPLICATION_SQL, [params.jobs_seq, params.email, params.phone, params.link1, params.link2, params.link3, params.reg_time]);
                
                let jobAppSeq = ins_application[0].insertId;
                let resume = params.files[0];
                resume = JSON.parse(resume);
                const ins_application_file = await conn.query(JOBS_APPLICATION_FILES_SQL,[
                    jobAppSeq,resume.type,resume.path,resume.originalname,resume.filename,resume.size,resume.ext,resume.mimetype
                ]);

                if (params.files[1] != '{}') {
                    let career  = params.files[1];
                    career = JSON.parse(career);
                    const ins_application_file_carrer = await conn.query(JOBS_APPLICATION_FILES_SQL,[
                        jobAppSeq,career.type,career.path,career.originalname,career.filename,career.size,career.ext,career.mimetype
                    ]);
                    
                }

                if (params.files[2] != '{}') {
                    let portfolio  = params.files[2];
                    portfolio = JSON.parse(portfolio);
                    const ins_application_file_carrer = await conn.query(JOBS_APPLICATION_FILES_SQL,[
                        jobAppSeq,portfolio.type,portfolio.path,portfolio.originalname,portfolio.filename,portfolio.size,portfolio.ext,portfolio.mimetype
                    ]);
                    
                }
                const ins_application_lang = await conn.query(JOBS_APPLICATION_LANG, [jobAppSeq, params.name]);
                
                await conn.commit(); // 커밋
                result = ins_application_lang;
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

    // contact us 페이지의 sending 폼 전송용
    send_inquiries (out, name, email, phone, company, contents, nations_seq) {
        let sql = "INSERT INTO BUSINESS_INQUIRY (FIELD, NAME, EMAIL, PHONE, COMPANY_NAME, CONTENTS, NATION_SEQ) VALUES ('BS', ?, ?, ?, ?, ?, ?)";
        var params = [name, email, phone, company, contents, nations_seq];

        // var after = this.make_inquiry_history.bind(this);
        this.exec_query(sql,params, 
            function (error, result, fields) {
                if (error) {
                    console.log('에러');
                    console.log(error);    
                    out(error, {});
                }
                if(result.affectedRows > 0) {
                    // 정상 처리
                    //console.log('정상처리됨');
                    // after(result.insertId, name);
                } else {
                    // 에러
                    console.log('에러');
                }
                out(error, result);
            }
        );
    }

    // 교회 검색
    search_church (out, name) {
        let sql = "select * from churchinfo where churchname = "+name+"";
        console.log("sql", sql)
        
        this.exec_query(sql, 
            function (error, result, fields) {
                console.log("hello", result)
                if (error) {
                    out(error, []);
                    return;
                }
                out(error, result);
                console.log("result", result)
            }
        );
    }
}

module.exports = new db_services();