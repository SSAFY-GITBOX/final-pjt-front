# GIXBOX

<br>

## 1. 팀원 소개

| [![img](README.assets/81846487.jpeg)](https://github.com/seungtaeryu/) | [![img](README.assets/88614621.jpeg)](https://github.com/becoding96) | [![img](README.assets/109332850.jpeg)](https://github.com/soheemoon37) |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **류승태**                                                   | **백준봉**                                                   | **문소희**                                                   |
| **메인 페이지, 영화 전체 보기, 검색 기능**                   | **로그인 페이지, 마이 페이지, 추천 알고리즘 구현**           | **영화 상세 페이지, 네브바 구현, 커뮤니티 페이지**           |

<br>

## 2. 프로젝트 소개

### 프로젝트 기간

- 기획 및 설계 : 22.11.08 ~ 22.11.15
- 프로젝트 개발 :  22.11.16 ~ 22.11.25

### 프로젝트 기획, 설명

- 커뮤니티 활성화를 통한 영화 추천 기반 사이트
  - 깃허브의 잔디 히트맵 기능 및 자유로운 커뮤니티를 통해 적극적인 활동을 유도
  - 활동을 통해 얻어진 데이터를 기반으로 사용자에게 알맞는 영화를 추천

<br>

## 3. 데이터베이스 모델링 ERD 설계

![GITBOX_ERD](README.assets/GITBOX_ERD.PNG)

<br>

## 4. 주요 서비스 기능

### 마이페이지 / 커뮤니티

1. 로그인/회원가입 기능 : 토큰을 통한 유저 회원가입 및 인증 기능 구현
2. 로그아웃 :  localstorge에 저장한 토큰 삭제 기능 구현
3. 유저 팔로우 : 유저간의 팔로우 및 팔로잉 기능 구현
4. 팔로워 / 팔로잉 목록 컴포넌트 구현 및 찜한 영화 및 게시글 목록 컴포넌트 구현
5. 유저 활동기록 표현 : 깃허브 잔디기능인 히트맵을 사용하여 활동의 시각화 
6. 프로필 사진 기능 구현 : image 업로드 후 media 에서 관리 
7. 자유게시판 구현 : 게시글 조회/생성/수정/삭제 구현
8. 게시글 상세 페이지 조회 : 게시글 세부 내용 및 댓글 조회/생성/수정/삭제 구현
9. 게시글 검색기능 구현 : 검색어를 포함하는 제목의 게시글만 조회
10. 인피니티 스크롤 기능 : 커뮤니티 페이지에서 스크롤 최하단에 도달할 시 게시글을 10개씩 추가로 반환

### 메인페이지 / 영화 디테일

1. tmdb API의 1000개의 영화와 18개의 장르 DB화
2. vue chart.js 라이브러리를 통한 유저의 활동 정보를 통한 선호 장르 데이터 시각화
3. 선호 장르 데이터의 비율에 맞춰 추천 영화를 제공하는 알고리즘 구현
4. 유저의 데이터가 없을 시 랜덤으로 추천 영화를 제공
5. 최신 100개의 영화 조회 기능 구현
6. 메인페이지 영화 장르별 필터 기능 구현
7. 영화리스트 페이지 페이지네이션 구현
8. 검색어를 포함하는 제목의 영화 조회 기능 구현 
9. 영화 디테일 페이지 - 영화 예고편 감상 기능 구현
10. 영화 디테일 페이지 - 리뷰 조회/생성/수정/삭제 기능 구현
11. 영화 디테일 페이지 - 리뷰 별점 기능을 javascript를 이용하여 직관적인 시각화

#### 기획 단계였으나 구현하지 못한 기능

1. 유저 인플루언서 페이지 구현
2. 알람 기능 구현 

<br>

## 5. 영화 추천 알고리즘

### 아이디어

- 사용자와 사용자가 팔로우하는 사용자의 정보를 기반으로 장르 선호도 조사
- 찜한 게시글, 남긴 리뷰의 평점을 기반으로 가중치를 계산하여 추천 영화 반환

### 구현

- 해당 영화의 좋아요는 2점으로 계산
- 해당 영화의 리뷰는 (평점 - 5) // 2 + (평점 - 5의 부호) * 1 점으로 계산
- 리뷰가 중복이어도 첫번째 리뷰만 적용하여 계산
- 좋아요와 리뷰가 둘 다 있을 시 리뷰만 적용
- 본인과 팔로우한 사용자의 활동을 모두 순회하며 해당 영화마다 평균값을 기록
- 점수의 비율을 기반으로 영화의 장르 비율을 할당하여 추천 목록 반환
- 데이터가 없을 시 랜덤으로 5개의 영화를 추천

<br>

## 기술스택

![img](README.assets/img.jpg)![img](README.assets/img-1669334255908-1.jpg)![img](README.assets/img-1669334255908-2.jpg)![img](README.assets/img-1669334307714-16.jpg)![img](README.assets/img-1669334302993-13.jpg)



