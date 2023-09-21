# Admin_Page

## 🌟 서비스 소개
<p align='center'>
<img width='100%' src='https://user-images.githubusercontent.com/21376061/269548370-152c50e2-14bb-4c63-a8d8-43463026a30c.png'>
</p>

   mongoDB와 연결하여 회원정보나 기타 정보들을 관리 할 수 있는 관리자용 웹 어플리케이션

<p align='center'>
    <img src="https://img.shields.io/badge/react-v18.2.0-61DAFB?logo=React"/>
   <img src="https://img.shields.io/badge/react responsive-v9.0.2-61DAFB?logo=React"/>
   <img src="https://img.shields.io/badge/@reduxjs/toolkit-^1.9.3-764ABC?logo=Redux"/>
   <img src="https://img.shields.io/badge/react redux-^8.0.5-764ABC?logo=Redux"/>
    <img src="https://img.shields.io/badge/@mui/material-^5.11.13-007fff?logo=mui"/>
   <img src="https://img.shields.io/badge/@mui/icons material-^5.11.11-007fff?logo=mui"/>
   <img src="https://img.shields.io/badge/axios-^1.3.4-5A29E4?logo=Axios"/>
   <img src="https://img.shields.io/badge/react kakao maps sdk-^1.1.6-ffcd00?logo=Kakao"/>
</p>
    
## 🌟 주요 기능

### 👌 관리자 기능(로그인 / 로그아웃 / 회원가입)

### 👌 회원 관리

<p align='center'>
  <img src="https://user-images.githubusercontent.com/21376061/227169377-9636f4a5-14a6-459a-8f74-2513156860a5.png"/>
</p>

* geolocation 을 이용하여 현재 위치의 경도 , 위도 값을 가져올 수 있습니다.
* axios 를 이용하여 경도와 위도 값으로 카카오 API와 통신하여 현재의 주소 값을 얻어올 수 있습니다. 

<p align='center'>
  <img src="https://user-images.githubusercontent.com/21376061/227169213-a8f3cb94-2e04-4d1d-b2ae-5d0792539d6e.png"/>
</p>

* 새로고침 버튼을 통해 현재 위치와 주소를 새로 받아 올 수 있습니다.

<p align='center'>
  <img src="https://user-images.githubusercontent.com/21376061/227169304-33dc8b88-c581-4397-b795-6bd40b414197.png"/>
</p>
<p align='center'>
 <img src="https://user-images.githubusercontent.com/21376061/227169645-50fdf4c0-9975-45c5-8a5c-15a40b332aab.png"/>
</p>

* 위치검색 버튼에 마우스를 올려 주변 원하는 장소를 검색 할 수 있습니다. 

### 👌 상담사 관리

<p align='center'>
  <img width='400px' src = "https://user-images.githubusercontent.com/21376061/227173782-73631056-2f50-408b-be72-3a34c2015061.png"/>
</p>


* 카카오 키워드 검색을 이용하여 검색한 리스트를 받아 올 수 있습니다.
* 카카오맵 sdk 를 이용하여 현재위치와 검색한 리스트의 위치를 지도에 표시 할 수 있습니다.


<p align='center'>
  <img src = "https://user-images.githubusercontent.com/21376061/227172086-9f019e22-9ec7-449d-8c00-711c753c24c6.png"/>
</p>


* 마커를 클릭하여 클릭한 마커의 정보를 얻을 수 있습니다.

<p align='center'>
  <img src = "https://user-images.githubusercontent.com/21376061/227172176-dc509dc7-bf9a-4091-9f83-29ff54662aed.png"/>
</p>


* 클릭한 마커가 어떤 아이템인지 리스트에서 확인할 수 있습니다.


<p align='center'>
  <img width='300px' src="https://user-images.githubusercontent.com/21376061/227172487-e6736b4c-10cb-471a-a5c1-11f058aca02e.png"/>
</p>


* 받아온 리스트를 화면에 띄울 수 있습니다.
* 우측 상단의 닫기 버튼을 통해 리스트를 숨길 수 있습니다.


<p align='center'>
  <img src="https://user-images.githubusercontent.com/21376061/227172340-dc2962fd-1aec-43c8-9860-9868f8419e9a.png"/>
</p>


* 열기 버튼을 통해 리스트를 다시 나타낼 수 있습니다.


### 👌 매출 내역

<p align='center'>
  <img src = "https://user-images.githubusercontent.com/21376061/227177132-666b2cbe-e7ee-4804-b911-05d422c1e7b0.png"/>
</p>


* openwatherMap API 를 통해 위도와 경도값으로 현재 날씨와 기온을 받아 올 수 있습니다.


### 👌 쿠폰 관리

<p align='center'>
  <img width='300px' src = "https://user-images.githubusercontent.com/21376061/227177654-c95f47fa-7bc1-4014-b7f2-333eaed49272.png"/>
</p>


* openAI API 통신을 이용하여 GPT 에게 질문을 할 수 있습니다.
* 아래 질문들을 선택하여 GPT 에게 대답을 들을 수 있습니다.

<p align='center'>
  <img src = "https://user-images.githubusercontent.com/21376061/227177561-e729117f-c219-44de-89fc-b641787aebfc.png"/>
</p>


* 우측 상단 닫기 버튼을 통해 질문창을 열고 닫을 수 있습니다.


<p align='center'>
  <img width='300px' src = "https://user-images.githubusercontent.com/21376061/227177927-73fd19ae-accc-4ec8-a028-136af1523fa6.png"/>
</p>


* 질문을 선택하면 대답이 오기 전까지 로딩중을 나타냅니다.


<p align='center'>
  <img width='300px' src = "https://user-images.githubusercontent.com/21376061/227177837-dd2676cd-f11e-4274-aa84-471f9e36a17f.png"/>
</p>


* GPT가 대답을 해주면 다시 물어보거나 다른 질문을 선택할 수 있습니다.


<p align='center'>
  <img width='300px' src = "https://user-images.githubusercontent.com/21376061/227178035-41c60e1a-e310-487e-904f-36c05a9630d3.png"/>
</p>


* 직접 질문하기를 선택하면 직접 원하는 질문을 입력할 수 있습니다.

### 👌 이벤트 관리

### 👌 Q&A

## 🌟 상태관리
@reduxjs/toolkit 라이브러리와 react-redux 라이브러리를 활용한 상태관리

