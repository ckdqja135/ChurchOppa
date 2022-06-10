-- CREATE TABLE IF NOT EXISTS churchoppa.`ChurchInfo` (
--   `ChurchNo` INT NOT NULL,
--   `ChurchName` VARCHAR(45) NULL,
--   `ChurchLocate` VARCHAR(45) NULL,
--   `ChurchReli` VARCHAR(45) NULL,
--   `ChurchScales` VARCHAR(45) NULL,
--   `ChurchPastor` VARCHAR(45) NULL,
--   `ChurchTel` VARCHAR(45) NULL,
--   `ChurchLateX` INT NULL,
--   `ChurchLateY` INT NULL,
--   `ChurchHome` VARCHAR(200) NULL,
--   `ChurchSerIMG` VARCHAR(200) NULL,
-- 	 `ChurchJibun` VARCHAR(200) NULL,
--   `ChurchAddr` VARCHAR(200) NULL,
--   PRIMARY KEY (`ChurchNo`))
-- ENGINE = InnoDB

-- 교회 데이터 insert
-- INSERT INTO `churchoppa`.`churchinfo` 
-- (`ChurchNo`, `ChurchName`, `ChurchLocate`, `ChurchReli`, `ChurchScales`, `ChurchPastor`, `ChurchTel`, `ChurchLateX`, `ChurchLateY`, `ChurchHome`, `ChurchSerIMG`, `ChurchJibun`, `ChurchAddr`, `ChurchMapIMG`) VALUES 
-- ('0', '새지음교회', '서울시 강동구', '기하성', '중', '박지민', '02-483-3277', '37.549219', '127.128118', 'https://www.ncchurch.kr/', 'https://user-images.githubusercontent.com/33046341/165232296-83913b29-d259-45f5-9873-2e886db625c2.png', '(우)12922 경기도 하남시 미사강변북로 122', '경기도 하남시 망월동 122-22', 'https://yt3.ggpht.com/ytc/AKedOLRzfoBtzKKqM2YLjjIOufODb25UrJnxYEHLNyfC=s900-c-k-c0x00ffffff-no-rj');

-- select * from churchinfo where churchname =  "새지음교회";
select * from churchinfo where churchname = '새지음교회' LIMIT 0, 10;
-- 칼럼 값 수정 시 사용.
-- ALTER TABLE ChurchInfo MODIFY ChurchLateX DOUBLE
-- ALTER TABLE ChurchInfo MODIFY ChurchLateY DOUBLE

--  칼럼 추가
-- ALTER TABLE ChurchInfo ADD ChurchMapIMG VARCHAR(200) NULL
-- 칼럼명 변경
-- ALTER TABLE ChurchInfo CHANGE ChurchLPost ChurchAddr VARCHAR(200) NULL--