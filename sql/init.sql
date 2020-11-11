-- 테이블 순서는 관계를 고려하여 한 번에 실행해도 에러가 발생하지 않게 정렬되었습니다.

-- ADDRESS Table Create SQL

drop table stock_manage;
drop table stock;
drop table room_amenity;
drop table ep_attendance;
drop table notice;
drop table complain;
drop table employee;
drop table department;
drop table detail_fee;
drop table review;
drop table valet_parking;
drop table res_fac;
drop table reservation;
drop table card;
drop table facility_package;
drop table room_type;
drop table room;
drop table qna;
drop table customer;
drop table person;
drop table address;
drop table date_sales;


CREATE TABLE ADDRESS
(
    `ID`        INT            NOT NULL    AUTO_INCREMENT COMMENT '주소ID', 
    `ZIP_CODE`  INT            NOT NULL    COMMENT '우편번호', 
    `ADDRESS1`  VARCHAR(45)    NOT NULL    COMMENT '상세주소1(시)', 
    `ADDRESS2`  VARCHAR(45)    NULL        COMMENT '상세주소2(구,군)', 
    `ADDRESS3`  VARCHAR(45)    NULL        COMMENT '상세주소3(동)', 
    `ADDRESS4`  VARCHAR(45)    NULL        COMMENT '상세주소4(도로명)', 
    `ADDRESS5`  VARCHAR(45)    NULL        COMMENT '상세주소5', 
    PRIMARY KEY (ID)
);



-- ADDRESS Table Create SQL
CREATE TABLE ROOM
(
    `NUM`    INT     NOT NULL    COMMENT '객실번호', 
    `STATE`  ENUM('AVAILABLE', 'CANNOT_USE','CHECKOUT_DAY','STAYING')    NOT NULL    DEFAULT 'AVAILABLE' COMMENT '객실상태', -- enum값 설정
    `TYPE`              ENUM('STANDARD_TWIN','STANDARD_DOUBLE','STANDARD_FAMILY',
								'DELUXE_TWIN','DELUXE_DOUBLE','DELUXE_FAMILY',
								'PREMIUM_TWIN','PREMIUM_DOUBLE',
								'SUITE','EXECUTIVE_SUITE'),
    PRIMARY KEY (NUM)
);

ALTER TABLE ROOM
    ADD CONSTRAINT FK_ROOM_TYPE_ROOM_TYPE_TYPE FOREIGN KEY (TYPE)
        REFERENCES ROOM_TYPE (TYPE) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE PERSON
(
    `ID`              INT            NOT NULL    AUTO_INCREMENT COMMENT '사람ID', 
    `KOR_FIRST_NAME`  VARCHAR(45)    NULL        COMMENT '한글이름', 
    `KOR_LAST_NAME`   VARCHAR(45)    NULL        COMMENT '한글성', 
    `ENG_FIRST_NAME`  VARCHAR(45)    NOT NULL    COMMENT '영어이름', 
    `ENG_LAST_NAME`   VARCHAR(45)    NOT NULL    COMMENT '영어성', 
    `PHONE_NUM`       VARCHAR(45)    NOT NULL    COMMENT '핸드폰전화번호', 
    `EMAIL`           VARCHAR(45)    NOT NULL    COMMENT '이메일', 
    `ADDRESS_ID`      INT            NULL        COMMENT '주소',
    `GENDER`          ENUM('FEMALE','MALE')           NOT NULL    COMMENT '성', 
    `BIRTH`           DATE           NOT NULL    COMMENT '생일', 
    `NATION`          VARCHAR(45)    NULL        COMMENT '국적', 
    PRIMARY KEY (ID)
);

ALTER TABLE PERSON
    ADD CONSTRAINT FK_PERSON_ADDRESS_ID_ADDRESS_ID FOREIGN KEY (ADDRESS_ID)
        REFERENCES ADDRESS (ID) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE CUSTOMER
(
    `ID`         INT            NOT NULL    AUTO_INCREMENT COMMENT '고객ID', 
    `PERSON_ID`  INT            NOT NULL    COMMENT '사람ID', 
    `PW_ANSWER`  VARCHAR(45)    NULL        COMMENT '비밀번호질문정답', 
    `LOGIN_ID`   VARCHAR(45)    NOT NULL    COMMENT '로그인아이디', 
    `LOGIN_PW`   VARCHAR(45)    NOT NULL    COMMENT '로그인비밀번호', 
    PRIMARY KEY (ID)
);

ALTER TABLE CUSTOMER
    ADD CONSTRAINT FK_CUSTOMER_PERSON_ID_PERSON_ID FOREIGN KEY (PERSON_ID)
        REFERENCES PERSON (ID) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE ROOM_TYPE
(
    `TYPE`              ENUM('STANDARD_TWIN','STANDARD_DOUBLE','STANDARD_FAMILY',
								'DELUXE_TWIN','DELUXE_DOUBLE','DELUXE_FAMILY',
								'PREMIUM_TWIN','PREMIUM_DOUBLE',
								'SUITE','EXECUTIVE_SUITE')  
								NOT NULL    COMMENT '객실타입', 
    `PRICE`             INT     NOT NULL    COMMENT '객실가격', 
    `CAPACITY_DEFAULT`  INT     NOT NULL    COMMENT '기본객실수용인원', 
    `CAPACITY_MAX`      INT     NOT NULL    COMMENT '최대객실수용인원', 
    `OVERBOOK_COUNT`    INT     NOT NULL    COMMENT '최대 overbook', 
    `TOT_COUNT`         INT     NOT NULL    COMMENT '실제 방 개수', 
    `VEHICLE_CAPACITY`  INT     NOT NULL    COMMENT '최대수용 차', 
    PRIMARY KEY (TYPE)
);


-- ADDRESS Table Create SQL
CREATE TABLE DEPARTMENT
(
    `ID`           ENUM('A','B','C')    NOT NULL    COMMENT '부서ID', 
    `DESCRIPTION`  TEXT    NOT NULL    COMMENT '설명', 
    `EP_NUM`       INT     NOT NULL    COMMENT '부서인원', 
    PRIMARY KEY (ID)
);


-- ADDRESS Table Create SQL
CREATE TABLE CARD
(
    `ID`       INT            NOT NULL    AUTO_INCREMENT COMMENT '카드ID', 
    `NUMBER`   VARCHAR(45)    NOT NULL    COMMENT '카드번호', 
    `COMPANY`  VARCHAR(45)    NOT NULL    COMMENT '카드회사', 
    `CVC`      VARCHAR(45)    NOT NULL    COMMENT '카드CVC', 
    `VALID`    VARCHAR(45)    NOT NULL    COMMENT '카드만료일', 
    PRIMARY KEY (ID)
);


-- ADDRESS Table Create SQL
CREATE TABLE RESERVATION
(
    `ID`             INT         NOT NULL    AUTO_INCREMENT COMMENT '예약ID', 
    `CUS_ID`         INT         NOT NULL    COMMENT '고객ID', 
    `ROOM_TYPE`      ENUM('STANDARD_TWIN','STANDARD_DOUBLE','STANDARD_FAMILY',
								'DELUXE_TWIN','DELUXE_DOUBLE','DELUXE_FAMILY',
								'PREMIUM_TWIN','PREMIUM_DOUBLE',
								'SUITE','EXECUTIVE_SUITE')          
                                 NOT NULL    COMMENT '객실타입', 
    `ROOM_NUM`       INT         NULL        COMMENT '객실번호', 
    `CHECKIN_DATE`   DATETIME    NOT NULL    COMMENT '체크인날짜', 
    `CHECKOUT_DATE`  DATETIME    NOT NULL    COMMENT '체크아웃날짜', 
    `CARD_ID`        INT         NOT NULL    COMMENT '카드ID', 
    `ADULT_NUM`      INT         NOT NULL    DEFAULT 1 COMMENT '어른의수', 
    `CHILD_NUM`      INT         NOT NULL    DEFAULT 0 COMMENT '아이의수', 
    `BABY_NUM`       INT         NOT NULL    DEFAULT 0 COMMENT '유아의수', 
    `COUNT`          INT         NOT NULL    DEFAULT 0 COMMENT '식권수', 
    PRIMARY KEY (ID)
);

ALTER TABLE RESERVATION
    ADD CONSTRAINT FK_RESERVATION_CUS_ID_CUSTOMER_ID FOREIGN KEY (CUS_ID)
        REFERENCES CUSTOMER (ID) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE RESERVATION
    ADD CONSTRAINT FK_RESERVATION_CARD_ID_CARD_ID FOREIGN KEY (CARD_ID)
        REFERENCES CARD (ID) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE RESERVATION
    ADD CONSTRAINT FK_RESERVATION_ROOM_TYPE_ROOM_TYPE_TYPE FOREIGN KEY (ROOM_TYPE)
        REFERENCES ROOM_TYPE (TYPE) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE RESERVATION
    ADD CONSTRAINT FK_RESERVATION_ROOM_NUM_ROOM_NUM FOREIGN KEY (ROOM_NUM)
        REFERENCES ROOM (NUM) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE EMPLOYEE
(
    `ID`            INT            NOT NULL    AUTO_INCREMENT COMMENT '직원ID', 
    `EP_STATE`      BOOLEAN           NOT NULL    COMMENT '직원상태', 
    `LOGIN_ID`      VARCHAR(45)    NOT NULL    COMMENT '로그인아이디', 
    `LOGIN_PW`      VARCHAR(45)    NOT NULL    COMMENT '로그인비밀번호', 
    `ADDRESS`       VARCHAR(45)    NULL        COMMENT '주소', 
    `SALARY`        INT            NOT NULL    COMMENT '급여', 
    `JOIN_DATE`     DATE           NOT NULL    COMMENT '입사일', 
    `BANK_ACCOUNT`  VARCHAR(45)    NOT NULL    COMMENT '은행계좌번호', 
    `DEP_ID`        ENUM('A','B','C')           NOT NULL    COMMENT '부서ID', 
    `PERSON_ID`     INT            NOT NULL    COMMENT '사람_ID', 
    `RANK`          ENUM('LOW','MID','HIGH')           NOT NULL    COMMENT '직급', 
    PRIMARY KEY (ID)
);

ALTER TABLE EMPLOYEE
    ADD CONSTRAINT FK_EMPLOYEE_PERSON_ID_PERSON_ID FOREIGN KEY (PERSON_ID)
        REFERENCES PERSON (ID) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE EMPLOYEE
    ADD CONSTRAINT FK_EMPLOYEE_DEP_ID_DEPARTMENT_ID FOREIGN KEY (DEP_ID)
        REFERENCES DEPARTMENT (ID) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE FACILITY_PACKAGE
(
    `PACKAGE_ID`   INT            NOT NULL    AUTO_INCREMENT COMMENT '패키지ID', 
    `PRICE`        INT            NOT NULL    COMMENT '시설가격', 
    `DESCRIPTION`  VARCHAR(45)    NULL        COMMENT '패키지설명', 
    PRIMARY KEY (PACKAGE_ID)
);


-- ADDRESS Table Create SQL
CREATE TABLE STOCK
(
    `ID`     INT     NOT NULL    AUTO_INCREMENT COMMENT '재고ID', 
    `TYPE`   ENUM('BINU','SUGUN','CHITSOL')    NOT NULL    COMMENT '종류', 
    `ITEM`   INT     NOT NULL    COMMENT '비품', 
    `COUNT`  INT     NOT NULL    COMMENT '비품개수', 
    `PRICE`  INT     NOT NULL    COMMENT '비품개당가격', 
    PRIMARY KEY (ID)
);


-- ADDRESS Table Create SQL
CREATE TABLE ROOM_AMENITY
(
    `ID`         INT            NOT NULL    AUTO_INCREMENT COMMENT '객실비품ID', 
    `ROOM_TYPE`  ENUM('STANDARD_TWIN','STANDARD_DOUBLE','STANDARD_FAMILY',
								'DELUXE_TWIN','DELUXE_DOUBLE','DELUXE_FAMILY',
								'PREMIUM_TWIN','PREMIUM_DOUBLE',
								'SUITE','EXECUTIVE_SUITE')
                                NOT NULL    COMMENT '객실타입', 
    `ITEM`       ENUM('BINU','SUGUN','CHITSOL')           NOT NULL    COMMENT '비품', 
    `COUNT`      INT            NOT NULL    COMMENT '수량', 
    PRIMARY KEY (ID)
);

ALTER TABLE ROOM_AMENITY
    ADD CONSTRAINT FK_ROOM_AMENITY_ROOM_TYPE_ROOM_TYPE_TYPE FOREIGN KEY (ROOM_TYPE)
        REFERENCES ROOM_TYPE (TYPE) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE COMPLAIN
(
    `ID`           INT         NOT NULL    AUTO_INCREMENT COMMENT '민원ID', 
    `ROOM_NUM`     INT         NOT NULL    COMMENT '객실번호', 
    `DESCRIPTION`  TEXT        NOT NULL    COMMENT '내용', 
    `STAFF_ID`     INT         NULL        COMMENT '직원ID', 
    `TYPE`         ENUM('AMENITY','COMPLAIN','PRIMARY')        NOT NULL    COMMENT '민원타입', 
    `START_TIME`   DATETIME    NOT NULL    COMMENT '민원발생시간', 
    `FIN_TIME`     DATETIME    NULL        COMMENT '민원종료시간', 
    `PRIORITY`     INT        NOT NULL     COMMENT '우선순위', 
    PRIMARY KEY (ID)
);

ALTER TABLE COMPLAIN
    ADD CONSTRAINT FK_COMPLAIN_ROOM_NUM_ROOM_NUM FOREIGN KEY (ROOM_NUM)
        REFERENCES ROOM (NUM) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE COMPLAIN
    ADD CONSTRAINT FK_COMPLAIN_STAFF_ID_EMPLOYEE_ID FOREIGN KEY (STAFF_ID)
        REFERENCES EMPLOYEE (ID) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE EP_ATTENDANCE
(
    `ID`          INT     NOT NULL    AUTO_INCREMENT COMMENT '출근ID', 
    `EP_ID`       INT     NOT NULL    COMMENT '직원ID', 
    `DATE`        INT     NOT NULL    COMMENT '날짜', 
    `ATTENDANCE`  BOOLEAN    NOT NULL    COMMENT '출근여부', 
    PRIMARY KEY (ID)
);

ALTER TABLE EP_ATTENDANCE
    ADD CONSTRAINT FK_EP_ATTENDANCE_EP_ID_EMPLOYEE_ID FOREIGN KEY (EP_ID)
        REFERENCES EMPLOYEE (ID) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE REVIEW
(
    `ID`          INT         NOT NULL    AUTO_INCREMENT COMMENT '리뷰ID', 
    `RES_ID`      INT         NOT NULL    COMMENT '예약ID', 
    `STAR_POINT`  INT         NOT NULL    COMMENT '별점', 
    `CONTENT`     TEXT        NULL        COMMENT '내용', 
    `DATE`        DATETIME    NOT NULL    COMMENT '작성일', 
    PRIMARY KEY (ID)
);

ALTER TABLE REVIEW
    ADD CONSTRAINT FK_REVIEW_RES_ID_RESERVATION_ID FOREIGN KEY (RES_ID)
        REFERENCES RESERVATION (ID) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE QNA
(
    `ID`           INT            NOT NULL    AUTO_INCREMENT COMMENT 'QNA의ID', 
    `CUS_ID`       INT            NOT NULL    COMMENT '고객ID', 
    `TITLE`        VARCHAR(45)    NOT NULL    COMMENT '제목', 
    `CONTENT`      VARCHAR(45)    NOT NULL    COMMENT '내용', 
    `CREATE_DATE`  DATETIME       NOT NULL    COMMENT '작성날짜', 
    `IS_COMPLETE`  BOOLEAN           NULL        COMMENT '답변여부', 
    `ANSWER`       TEXT           NULL        COMMENT '답변', 
    `ANSWER_DATE`  DATETIME       NULL        COMMENT '답변일', 
    PRIMARY KEY (ID)
);

ALTER TABLE QNA
    ADD CONSTRAINT FK_QNA_CUS_ID_CUSTOMER_ID FOREIGN KEY (CUS_ID)
        REFERENCES CUSTOMER (ID) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE NOTICE
(
    `ID`           INT            NOT NULL    AUTO_INCREMENT COMMENT '공지ID', 
    `EP_ID`        INT            NOT NULL    COMMENT '직원ID', 
    `TITLE`        VARCHAR(45)    NOT NULL    COMMENT '제목', 
    `CONTENT`      TEXT           NOT NULL    COMMENT '내용', 
    `CREATE_DATE`  DATETIME       NOT NULL    COMMENT '작성일', 
    `VIEW`         INT            NOT NULL    DEFAULT 0 COMMENT '조회수', 
    PRIMARY KEY (ID)
);

ALTER TABLE NOTICE
    ADD CONSTRAINT FK_NOTICE_EP_ID_EMPLOYEE_ID FOREIGN KEY (EP_ID)
        REFERENCES EMPLOYEE (ID) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE DETAIL_FEE
(
    `ID`         INT    NOT NULL    COMMENT '예약ID', 
    `ROOM_FEE`   INT    NOT NULL    DEFAULT 0 COMMENT '객실요금', 
    `EXTRA_FEE`  INT    NOT NULL    DEFAULT 0 COMMENT '추가요금', 
    `TOTAL_FEE`  INT    NOT NULL    DEFAULT 0 COMMENT '총요금', 
    PRIMARY KEY (ID)
);

ALTER TABLE DETAIL_FEE
    ADD CONSTRAINT FK_DETAIL_FEE_ID_RESERVATION_ID FOREIGN KEY (ID)
        REFERENCES RESERVATION (ID) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE STOCK_MANAGE
(
    `ID`        INT         NOT NULL    AUTO_INCREMENT COMMENT '재고관리ID', 
    `STOCK_ID`  INT         NULL        COMMENT '재고ID', 
    `COUNT`     INT         NULL        COMMENT '요청개수', 
    `REQ_TIME`  DATETIME    NOT NULL    COMMENT '요청시간', 
    `EP_ID`     INT         NULL        COMMENT '직원ID', 
    PRIMARY KEY (ID)
);

ALTER TABLE STOCK_MANAGE
    ADD CONSTRAINT FK_STOCK_MANAGE_EP_ID_EMPLOYEE_ID FOREIGN KEY (EP_ID)
        REFERENCES EMPLOYEE (ID) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE STOCK_MANAGE
    ADD CONSTRAINT FK_STOCK_MANAGE_STOCK_ID_STOCK_ID FOREIGN KEY (STOCK_ID)
        REFERENCES STOCK (ID) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE DATE_SALES
(
    `DATE`   DATE    NOT NULL, 
    `SALES`  INT     NOT NULL, 
    PRIMARY KEY (DATE)
);

ALTER TABLE DATE_SALES COMMENT '날짜별 매출';


-- ADDRESS Table Create SQL
CREATE TABLE VALET_PARKING
(
    `PAKING_NUM`   INT    NOT NULL    AUTO_INCREMENT COMMENT '주차위치', 
    `VEHICLE_NUM`  INT    NOT NULL    COMMENT '차량번호', 
    `RES_ID`       INT    NOT NULL    COMMENT '예약ID', 
    PRIMARY KEY (PAKING_NUM)
);

ALTER TABLE VALET_PARKING
    ADD CONSTRAINT FK_VALET_PARKING_RES_ID_RESERVATION_ID FOREIGN KEY (RES_ID)
        REFERENCES RESERVATION (ID) ON DELETE CASCADE ON UPDATE CASCADE;


-- ADDRESS Table Create SQL
CREATE TABLE RES_FAC
(
    `PACK_RES_ID`  INT    NOT NULL    AUTO_INCREMENT COMMENT '패키지와예약연결아이디', 
    `PACKAGR_ID`   INT    NOT NULL    COMMENT '패키지ID', 
    `RES_ID`       INT    NOT NULL    COMMENT '예약ID', 
    PRIMARY KEY (PACK_RES_ID)
);

ALTER TABLE RES_FAC
    ADD CONSTRAINT FK_RES_FAC_RES_ID_RESERVATION_ID FOREIGN KEY (RES_ID)
        REFERENCES RESERVATION (ID) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE RES_FAC
    ADD CONSTRAINT FK_RES_FAC_PACKAGR_ID_FACILITY_PACKAGE_PACKAGE_ID FOREIGN KEY (PACKAGR_ID)
        REFERENCES FACILITY_PACKAGE (PACKAGE_ID) ON DELETE CASCADE ON UPDATE CASCADE;


