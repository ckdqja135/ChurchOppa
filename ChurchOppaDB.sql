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
--   PRIMARY KEY (`ChurchNo`))
-- ENGINE = InnoDB

select * from churchinfo
-- 칼럼 값 수정 시 사용.
-- ALTER TABLE ChurchInfo MODIFY ChurchLateX DOUBLE
-- ALTER TABLE ChurchInfo MODIFY ChurchLateY DOUBLE

--  칼럼 추가
-- ALTER TABLE ChurchInfo ADD ChurchJibun VARCHAR(200) NULL
-- 칼럼명 변경
-- ALTER TABLE ChurchInfo CHANGE ChurchLPost ChurchAddr VARCHAR(200) NULL