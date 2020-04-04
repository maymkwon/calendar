이 프로젝트는 [Create React App](https://github.com/facebook/create-react-app) 을 사용 하였습니다.

**목차**
# Table of Contents
1. [실행 방법](#start)
2. [빌드 방법](#build)
3. [사용 라이브러리](#library)
4. [폴더 구조](#structure)
5. [프로젝트 진행](#process)
6. [문제 해결](#coding)
7. [회고](#retrospect)

***

## 실행 방법 <a name="start"></a>

**Client**
1. `cd ./client` 클라이언트 폴더로 이동
2. `npm i` 커맨드 입력 
3. `npm start`
4. `localhost:3000` 접속

**Server**

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

wget 설치 : `brew install wget`

2. node js 실행
  1. `cd ./server` 클라이언트 폴더로 이동
  2. `npm i` 커맨드 입력 
  3. `npm i nodemon -g` 커맨드 입력
  4. `nodemon app.js` 커맨드 입력

***

## 빌드 방법 <a name="build"></a>

`npm run build`

> 라우팅을 브라우저 히스토리로 작업을 하였습니다. 
> 빌드 후 결과물을 보시려면 `npx serve -s build` 커맨드를 실행 해 주세요.
> 빌드 후 간단한 로컬 서버에 올려서 보실 수 있습니다.

***

## 프로젝트 사용 라이브러리 <a name="library" />

**Client**

* typescript
* redux
* immutable
* typesafe-actions
* redux-saga
* react-redux
* reselect
* react-router
* lodash

*통신*
* axios

*캘린더 관련*

* date-arithmetic
* moment
* moment-range


*스타일 관련*

* styled-compoent

기타
* react-select
* react-datepicker

**Server**

* cors
* express
* nodemon
* redis


***

## 폴더구조 <a name="structure"></a>

```
.src
+-- calendar
|   +-- components    : 캘린더에 필요한 컴포넌트
|   +-- Calendar.tsx  : 캘린더 컨테이너
|
+-- common
|   +-- api           : api 통신을 위한 axios 설정 폴더
|   +-- layerpopup    : 팝업 생성/설정 관련
|   +-- popup         : 팝업 컴포넌트
|   +-- toast         : 토스트 팝업 관련
|   
+-- route             : 라우팅 컴포넌트
|
+-- services          : 서비스 관련 
|
+-- store             : 액션 / 리듀서 / 사가 / 타입 관련
|   |
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
```

***


## 프로젝트 진행 <a name="process"></a>

* 1일차 : 캘린더 조사 및 과제 요구사항 정리
* 2일차 ~ 3일차 : 캘린더 뷰 등 전체 화면 작성
* 4일차 : nodejs 와 redis db로 간단한 crud 서버 구현
* 5일차 : 클라이언트와 서버 연결 후 crud기능 구현
* 6일차 : 테스트 및 문서작성

***


## 문제해결 <a name="coding"></a>

#### 콘트롤 영역 (이전주/달, 다음주/달 , 주view/월view 버튼)
이전, 다음 버튼의 기능은 changeDate액션으로 현재일을 기준으로 이전은 subtract, 다음은 add하여 View를 렌더합니다.
주/월 버튼으로는 changeView액션으로 View를 전환합니다. 
week과 month 2가지가 있고, 이view props으로 위의 이전/다음 버튼에 기준을 전달합니다.(월단위로 이동 할 것인지 주단위로 이동 할 것인지)
월/주 텍스트 선택시 현재날짜로 date를 바꾸어 현재 월을 렌더합니다.
처음에는 view를 state로 관리 하였는데 state로 관리하기보다 스토어에 저장하여 사용하는게 좋을것 같다는 생각이 들어(여러가지 추가적으로 기능이나 이벤트를 할 수 있을 것 같아) 액션으로 수정하였습니다.

#### 월 VIEW
moment 라이브러리를 이용하여 현재일을 기준으로 현재 주와 마지막 주를 구하여 Row를, moment.weekdaysShort를 이용해 7일을 구하였습니다. 

#### 주 VIEW
주 도 마찬가지로 moment 라이브러리를 이용하여 현재일을 기준으로 현재 주와 마지막주를 구하여 일주일을 표시 합니다.
시간 슬롯은 24개의 배열을 이용, moment으로 시간 슬롯을 만들었습니다.

주 화면은 3개로 분할이 됩니다.
좌측 타임슬롯, 상단 요일, 중앙 주
좌측은 보기좋게 하기 위해 position을 조절하였습니다.

#### 일정
일정클릭시 일정 상세팝업이 발생 합니다.
이벤트 전파로 인해 일정을 클릭하면 일정 상세와 생성이벤트가 발생하여 일정상세 클릭이벤트에 이벤트 상위 전파방지를 위해 일정 클릭시 e.stopPropagation()으로 전파를 방지 합니다.

일정 데이터는 가공을 해서 사용했습니다.
우선 시작일 기준으로 정렬합니다 그리고 시작일 기준으로 lodash의 groupBy함수로 그룹을 만들었습니다.

```
{
  20191010:[{...},{...},{...}],
  20191011:[{...},{...},{...}],
  20191012:[{...},{...},{...}],
}
```
시작일 키로 event데이터를 찾아 EventBox컴포넌트에 전달하여 렌더 하였습니다.
그리고 월 view에서는 상관없지만 주view에서는 시간 길이에 따라 높이를 차지 해야 합니다.
시작시간과 종료시간 차이값을 기본 높이 50의 곱으로 높이를 계산 했습니다.




#### 드래그 드랍
일정 아이템에 onDragStart이벤트를 생성, 드래그 action과 드래그대상의 아이디를 셋팅 하였습니다.
드래그 대상인 상위 부모에 onDrop 이벤트를 추가 하였습니다.
상위부모와 드래그 대상은 고유한 값을 가지게 하기 위하여 부모는 년월일, 일정은 시간을 아이디로 사용 하였습니다. onDrop이벤트에서 수정 액션이 발생합니다.(박스위치기준이 아니라 마우스 위치 기준으로 수정됩니다.(ㅜㅜ))

이전날의 이벤트를 옮길수 있을까하는 생각이 들었습니다. 만약 옮길수 없다면 이전일정의 아이템은 draggable=false로 설정 해야 할 것 입니다.

***
#### 일정 생성
각 일을 선택하면 클릭 이벤트로 팝업을 발생 시킵니다.
팝업에 선택한 일 정보를 전달하여 현재날짜가 셋팅이 됩니다. 
팝업창에서 정보를 입력후 일정을 등록 합니다.
텍스트 없을때, 시간을 선택하지 않았을때 조건을 체크후 콜백함수를 포함한 create액션을 발생시킵니다. saga에서 create액션을 받아 일정중복인 데이터 인지 확인후 다음을 실행합니다. 성공시 콜백함수를 실행하고(팝업 닫기) 토스트 팝업으로 상태를 나타냅니다. 그다음 saga내에서 일정조회 action을 dispatch합니다.(생성 -> 조회)

처음에는 구글 캘린더 처럼 선택한 셀의 위치를 얻어 생성창을 하려고 했지만 기능이 우선이라 팝업으로 생성 하였습니다.
***
#### 일정 수정
일정 생성부분과 많이 비슷합니다. 
수정버튼을 클릭시 state 변경으로 input을 렌더 합니다.
생성과 마찬가지로 수정후 리스트 재조회를 시도 합니다.
***
#### 일정 중복
중복시 오류를 표기한다고 하는데 이것이 일정이 완벽하게 겹치는것이 중복인것인지 아니면 시간이 서로 겹치는것이 중복인지 애매모호 했습니다.
그래서 저는 시간이 겹치면 중복으로 생각하고 개발을 하였습니다.
중복체크 함수는 getOverlay로 우선 각 일의 일정들과 새로 추가/수정될 일정을 묶어 시간순으로 정렬 후, reduce함수로 이전일정(index - 1)의 끝시간과 현재시간(index)의 시작시간을 비교하여 이값이 참이면 겹치는 일정 -> 리턴값으로 조건을 세워 다음 로직을 수행 합니다.
최초에는 월/주 view에서 각각 체크를 했습니다. 중복적인 느낌이 들어 체크하는 부분을 saga에서(생성/수정) 수행하는 것으로 변경 하였습니다.

***



## 회고 (부족한점 위주) <a name="retrospect"></a>

* node 서버 에러처리 부족
* 사가부분의 에러 처리부분을 함수화 할수 있는데 못한점(토스트 액션 / 에러 처리 함수화 부족)
* react-hook을 많이 사용하지 못한점
* 처음으로 redis를 사용/적용한 점 
* 테스트 작성 미흡
* 타입스크립트 사용 미흡




