-- 더미 파일 생성할때 필요한 쿼리문 파일

--예약 + 카드 + 고객
select * from customer;
INSERT INTO card VALUES (271, '123','123','123','123');
INSERT INTO customer VALUES (271, 271, null, 'test@test.com','test');
INSERT INTO reservation VALUES (271, 271, 'SUITE' ,null,'2000-1-1 00:00:00','2000-1-4 00:00:00',271,1,1,1,1);