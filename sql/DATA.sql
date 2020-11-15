-- 정적 인스턴스 추가 해주는 파일


-- 룸 타입 인스턴스를 생성하는 쿼리문
INSERT INTO room_type VALUES ('STANDARD_TWIN',50000,2,4,22,20,2);
INSERT INTO room_type VALUES ('STANDARD_DOUBLE',50000,2,4,22,20,2);
INSERT INTO room_type VALUES ('STANDARD_FAMILY',50000,2,4,22,20,2);
INSERT INTO room_type VALUES ('DELUXE_TWIN',50000,2,4,22,20,2);
INSERT INTO room_type VALUES ('DELUXE_DOUBLE',50000,2,4,22,20,2);
INSERT INTO room_type VALUES ('DELUXE_FAMILY',50000,2,4,22,20,2);
INSERT INTO room_type VALUES ('PREMIUM_TWIN',50000,2,4,22,20,2);
INSERT INTO room_type VALUES ('PREMIUM_DOUBLE',50000,2,4,22,20,2);
INSERT INTO room_type VALUES ('SUITE',70000,2,4,11,10,2);
INSERT INTO room_type VALUES ('EXECUTIVE_SUITE',100000,2,4,6,5,2);

-- 방 호수 저장해주는 함수 -- 2~8층 20개, 9층 10개, 10층 5개
DELIMITER $$
DROP PROCEDURE IF EXISTS InsertRoom$$
CREATE PROCEDURE InsertRoom()
BEGIN
	DECLARE i INT DEFAULT 201;
    while i <= 220 DO
		INSERT INTO room VALUES (i,"AVAILABLE","STANDARD_TWIN");
        SET i = i + 1;
	END WHILE;
    
    SET i = 301;
    while i <= 320 DO
		INSERT INTO room VALUES (i,"AVAILABLE","STANDARD_DOUBLE");
        SET i = i + 1;
	END WHILE;
    
    SET i = 401;
    while i <= 420 DO
		INSERT INTO room VALUES (i,"AVAILABLE","STANDARD_FAMILY");
        SET i = i + 1;
	END WHILE;
    
    SET i = 501;
    while i <= 520 DO
		INSERT INTO room VALUES (i,"AVAILABLE","DELUXE_TWIN");
        SET i = i + 1;
	END WHILE;
    
    SET i = 601;
    while i <= 620 DO
		INSERT INTO room VALUES (i,"AVAILABLE","DELUXE_DOUBLE");
        SET i = i + 1;
	END WHILE;
    
    SET i = 701;
    while i <= 720 DO
		INSERT INTO room VALUES (i,"AVAILABLE","DELUXE_FAMILY");
        SET i = i + 1;
	END WHILE;
    
    SET i = 801;
    while i <= 820 DO
		INSERT INTO room VALUES (i,"AVAILABLE","PREMIUM_TWIN");
        SET i = i + 1;
	END WHILE;
    
    SET i = 901;
    while i <= 920 DO
		INSERT INTO room VALUES (i,"AVAILABLE","PREMIUM_DOUBLE");
        SET i = i + 1;
	END WHILE;
    
    SET i = 1001;
    while i <= 1010 DO
		INSERT INTO room VALUES (i,"AVAILABLE","SUITE");
        SET i = i + 1;
	END WHILE;
    
    SET i = 1101;
    while i <= 1005 DO
		INSERT INTO room VALUES (i,"AVAILABLE","EXECUTIVE_SUITE");
        SET i = i + 1;
	END WHILE;
END$$
DELIMITER $$

CALL InsertRoom();


-- facility_package 인스턴스 생성하는 쿼리문

INSERT INTO facility_package VALUES(1, 300000, "Private Swimming Pool");
INSERT INTO facility_package VALUES(2, 500000, "Meeting Room");
INSERT INTO facility_package VALUES(3, 1000000, "Banquet hall");
INSERT INTO facility_package VALUES(4, 300000, "Private Bar");
INSERT INTO facility_package VALUES(5, 200000, "Club Lounge");
INSERT INTO facility_package VALUES(6, 70000, "Concert");
INSERT INTO facility_package VALUES(7, 100000, "Business Room");
INSERT INTO facility_package VALUES(8, 500000, "Party Room");
