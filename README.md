# https://dbprojectourhotel.herokuapp.com/  heroku 연동한 링크입니다. 현재는 sochubert/db_webserver 의 develop branch와 연동되어 있습니다.
#### https://jayprogram.tistory.com/37  //권한 바꾸는거 참고.
----------
## DB서버 추가 하였습니다. 저희 DB접속 방법은
##### 시작 전, npm install mysql --save로 mysql을 설치 해 주세요.
#### 1. mysql -h us-cdbr-east-02.cleardb.com -u b0d7db5a46255f -p
#### 2. e0ba2ce1   (password입력)
#### 3. 정상적으로 접속 됐으면 USE heroku_a9f9515c41ce864; (우리가 쓸 db)

### DB 정보 정리!
#### Hostname : us-cdbr-east-02.cleardb.com
#### port : 3306
#### username:b0d7db5a46255f
#### password:e0ba2ce1
#### db name : heroku_a9f9515c41ce864
----------------
### 1. 칸반보드, 이슈 적극 활용
#### -자기가 진행 할 작업을 칸반보드 To do에서 In progress로 옮기고, issue만들고 해당 작업 하기
(무슨 작업을 하고 있는지 모두가 쉽게 알기 위해서)
#### -특별히 어려운 기능이 아닐 경우, issue를 낸 것은 1,2일 안에 완료 하기
(제 기간안에 끝내기 위해서..)

### 2. 프론트, 백 1:1 매칭해서 해당 페이지 작업하기
- 프론트 register 추가했습니다.
