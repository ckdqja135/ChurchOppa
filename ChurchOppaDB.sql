 CREATE TABLE IF NOT EXISTS churchoppa.`ChurchInfo` (
   `ChurchNo` INT NOT NULL,
   `ChurchName` VARCHAR(45) NULL,
   `ChurchLocate` VARCHAR(45) NULL,
   `ChurchReli` VARCHAR(45) NULL,
   `ChurchScales` VARCHAR(45) NULL,
   `ChurchPastor` VARCHAR(45) NULL,
   `ChurchTel` VARCHAR(45) NULL,
   `ChurchLateX` DOUBLE NULL,
   `ChurchLateY` DOUBLE NULL,
   `ChurchHome` VARCHAR(200) NULL,
   `ChurchSerIMG` VARCHAR(200) NULL,
 	 `ChurchJibun` VARCHAR(200) NULL,
   `ChurchAddr` VARCHAR(200) NULL,
   `ChurchMapIMG` VARCHAR(200) NULL,
   PRIMARY KEY (`ChurchNo`))
 ENGINE = InnoDB;

-- 게시판 list 테이블
--  CREATE TABLE `churchoppa`.`board` (
--   `BoardNo` BIGINT(20) NOT NULL,
--   `Church_No` BIGINT(20) NULL,
--   `BoardRegDate` VARCHAR(45) NULL,
--   `BoardLike` BIGINT(20) NULL,
--   `BoardHits` BIGINT(20) NULL,
--   `BoardID` VARCHAR(45) NULL,
--   `BoardPW` VARCHAR(45) NULL);

-- 게시판 디테일 테이블
-- CREATE TABLE `churchoppa`.`board_detail` (
--   `boardID` BIGINT(20) NOT NULL,
--   `boardContent` VARCHAR(400) NULL,
--   `boardTitle` VARCHAR(60) NULL,
--   `boardLike` BIGINT(20) NULL,
--   `boardHits` BIGINT(20) NULL,
--   PRIMARY KEY (`boardID`));

-- CREATE TABLE `churchoppa`.`board_comment` (
-- `CommentId` BIGINT(20) NULL,
--  `BoardID` BIGINT(20) NULL,
-- `CommentLike` BIGINT(20) NULL, 
--  `CommentDepth` VARCHAR(45) NULL,
--  `WriterId` VARCHAR(45) NULL,
-- `WriterPw` VARCHAR(45) NULL,
--  `Commnetperent` VARCHAR(45) NULL,
--  `CommentContent` VARCHAR(200) NULL,
--  PRIMARY KEY (`CommentId`));


-- 교회 데이터 insert
INSERT INTO `churchoppa`.`churchinfo` 
(`ChurchNo`, `ChurchName`, `ChurchLocate`, `ChurchReli`, `ChurchScales`, `ChurchPastor`, `ChurchTel`, `ChurchLateX`, `ChurchLateY`, `ChurchHome`, `ChurchSerIMG`, `ChurchJibun`, `ChurchAddr`, `ChurchMapIMG`) VALUES 
('0', '새지음교회', '서울시 강동구', '기하성', '중', '박지민', '02-483-3277', '37.549219', '127.128118', 'https://www.ncchurch.kr/', 'https://user-images.githubusercontent.com/33046341/165232296-83913b29-d259-45f5-9873-2e886db625c2.png', '(우) 05318 서울특별시 강동구 상암로12길 10', '서울특별시 강동구 천호동 287-7', 'https://yt3.ggpht.com/ytc/AKedOLRzfoBtzKKqM2YLjjIOufODb25UrJnxYEHLNyfC=s900-c-k-c0x00ffffff-no-rj');

-- select * from churchinfo
-- 칼럼 값 수정 시 사용.
-- ALTER TABLE ChurchInfo MODIFY ChurchLateX DOUBLE
-- ALTER TABLE ChurchInfo MODIFY ChurchLateY DOUBLE

--  칼럼 추가
-- ALTER TABLE ChurchInfo ADD ChurchMapIMG VARCHAR(200) NULL
-- 칼럼명 변경
-- ALTER TABLE ChurchInfo CHANGE ChurchLPost ChurchAddr VARCHAR(200) NULL--churchinfochurchinfo