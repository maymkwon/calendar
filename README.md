![kakao pay](./kakaopay.jpg)

이 프로젝트는 [Create React App](https://github.com/facebook/create-react-app) 을 사용 하였습니다.

# 카카오 사전 과제 저장소

***

## 실행 방법

*Client*
1. `cd ./client` 클라이언트 폴더로 이동
2. `npm i` 커맨드 입력 
3. `npm start`
4. `localhost:3000` 접속

*Server*
데이터 베이스는 redis 를 사용하였습니다.
실행하려는 컴퓨터에 redis가 설치 되어 있어야 합니다.

1. redis 설치 (linux)
```
$ wget http://download.redis.io/redis-stable.tar.gz 
$ tar xvzf redis-stable.tar.gz 
$ cd redis-stable 
$ make
$ sudo make install

$ redis-server
```

wget 대신 [redis 공식 페이지](https://redis.io/topics/quickstart) 에서 직접 파일을 받으실 수 있습니다.

2. node js 실행

  1. `cd ./server` 클라이언트 폴더로 이동
  2. `npm i` 커맨드 입력 
  3. `nodemon app.js`

***

## 빌드 방법

`npm run build`

> 라우팅을 브라우저 히스토리로 작업을 하였습니다. 
> 빌드 후 결과물을 보시려면 `npx serve -s build` 커맨드를 실행 해 주세요
> 빌드 후 간단한 로컬 서버에 올려서 보실 수 있습니다.

***

## 프로젝트 사용 라이브러리
client

server

***

## 폴더구조

.src
|
+-- calendar
|
|   +-- components    : 캘린더에 필요한 컴포넌트
|   |   
|   +-- Calendar.tsx  : 캘린더 컨테이너
|
+-- common
|   +-- api           : api 통신을 위한 axios 설정 폴더
|   |
|   +-- layerpopup    : 팝업 생성/설정 관련
|   |
|   +-- popup         : 팝업 컴포넌트
|   |
|   +-- toast         : 토스트 팝업 관련
|
+-- route             : 라우팅 컴포넌트
+-- services          : 서비스 관련 
|
+-- store             : 액션 / 리듀서 / 사가 / 타입 관련
|   +-- calendar
|   |   +-- action    : 액션 함수
|   |   +-- reducer   : 리듀서
|   |   +-- sagas     : 사가 함수
|   |   +-- types     : 타입정의
|   |
|   +-- system        
|   |   +-- action    : 액션 함수
|   |   +-- reducer   : 리듀서
|   |   +-- sagas     : 사가 함수
|   |   +-- types     : 타입정의
|   |
|   +-- index.js      : 스토어 인덱스 (combineReducer, rootSaga)
|   
+-- style             : 전체 스타일
+-- utils             : 상수 / 데이트 관련 함수

***

## 프로젝트 진행 

1일 캘린더 조사 및 과제 요구사항 정리
2일 ~ 3일 캐린더 뷰 등 전체 화면 작성
4일 nodejs 와 redis db로 간단한 crud 서버 구현
5일 클라이언트와 서버 연결 후 crud기능 구현
6일 테스트 및 문서작성

***

## 문제

일정 중복
드래그 드랍
중복데이터에 대한 내용이 애매했음
완전히 시작시간과 끝시간이 같은것을 말하는것인지 시간이 겹치면 안되는것인지 애매모호 했음
구현은 시간이 겹치면 중복으로 체크하였음

***

## 회고
redis
typescript
react-hook
nodejs
프로젝트 진행 순서에 대해 역순
test




