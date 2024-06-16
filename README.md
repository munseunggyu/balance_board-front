## [밸런스보드 배포](https://balanceboard.swygbro.com/)

# 투표로 세상을 말하다 밸런스보드

<img src="https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F53bddc75-8fc5-4555-bc7d-45e7f51b3cbc%2Fced5720d-5693-47fa-aaec-e94aa14129c7%2Fpage0.png?table=block&id=53ee1c8d-2f90-4863-ab0a-7c0ad7a20e10&spaceId=53bddc75-8fc5-4555-bc7d-45e7f51b3cbc&width=2000&userId=467708d9-ae20-4932-9d16-1a71b77a6732&cache=v2" alt="바나나 마켓"/>

## 쉽고 빠른 익명 투표 커뮤니티, "밸런스보드"

**"이거 나만 이해 안돼?🙄"**

**"내가 이상한 거야?🤔"**

혹시 이런 말을 들어본 적이 있지 않나요?
SNS에서도, 주위에서도, 심지어 나조차도!

사회에서 이슈 되고 있는 논쟁, 어제 애인과 싸웠던 이야기, 회사에서 생긴 일,

심지어는 오늘 저녁 메뉴 고민까지!

**불필요한 감정싸움 없이도 말이에요.**

로고에도 균형의 의미를 담았어요.

점, 선, 면으로 이루어진 다양한 형태의 도형들이 만나 알파벳 ‘보드(BOARD)’를 만들 듯,

다양한 이야기를 가진 사람들이 만나 균형잡힌 세상으로 나아가길 바라요.

## 🏃 프론트엔드 개발

|                                              신현수                                              |                                                문승규                                                 |     |
| :----------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------: | :-: |
| [![신현수깃헙](https://avatars.githubusercontent.com/u/58941022?v=4)](https://github.com/scato3) | [![홍예림깃헙](https://avatars.githubusercontent.com/u/84954439?v=4)](https://github.com/munseunggyu) |

## 팀스페이스 진행방식

스프린트(2주) > 프로젝트(1~2주) > 테스크

- 스프린트 : 2주 활동의 대분류
- 프로젝트 : 스프린트에 속하는 활동별 주제 중분류
- 테스크 : 각 프로젝트를 수행하기 위한 담당자별 할일 리스트
- 회고 : 2주 스프린트 이후에 목표 및 협업에 대해 회고

\*2주 단위로 KPI 목표 설정 > 회고

## 사용 기술

<div><img src="https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=HTML5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=CSS3&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=next.js&logoColor=white">
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=react&logoColor=white">
  </div>

<br>

## 4. 역할분담

**문승규**

- UI
  - 페이지 : 로그인, 회원가입, 메인 홈, 프로필 페이지
- 기능
  - 카카오 로그인, 회원가임(리팩토링)
  - 메인 홈 게시글 리스트
  - 좋아요, 싫어요
  - 댓글
    <br>

**신현수**

- UI
  - 페이지 : 게시글 상세, 게시글 작성, 회원 탈퇴 페이지
- 기능
  - 게시글 상세
  - 게시글 작성
  - 투표
  - 회원 탈퇴(리팩토링)

## 기능 설명

**로그인**
<br />
카카오 로그인 기능으로 로그인 가능합니다.
<br>
<img width="300" alt="#5 이메일 로그인_1" src="https://github.com/munseunggyu/Secret-Lion/assets/84954439/7deb378a-50e5-441d-b52a-3cff2aee4f7a">
<br /><br />

**회원가입**
<br />
비회원인 경우 닉네임, 성별, 출생연도 등 추가적으로 정보를 입력해야 합니다.
<br />
<img width="300" alt="#1 회원가입_1" src="https://github.com/munseunggyu/Secret-Lion/assets/84954439/830119fa-a157-4f04-a9f4-d016e181af6c">

<br />
<br />

**메인 홈**
<br />
핫 게시글과 카테고리별 게시글 리스트가 노출된다.<br />
로그인 된 유저는 투표, 댓글을 작성할 수 있으며 비로그인 유저는 로그인 화면으로 이동하는 모달이 노출된다.
<br>
<img width="300" alt="#2 메인화면" src="https://github.com/chabssaltteog/balance_board-front/assets/84954439/76f51a00-332a-40c4-b25b-d9e201e05bf6">
<br />
<br />

**게시글 상세**
<br />
게시글 작성자, 카테고리, 태그, 콘텐츠, 댓글, 좋아요, 싫어요, 참여자수 등이 화면에 표기됩니다.
<br />
<img width="300" alt="#8 게시물 상세_1" src="https://github.com/munseunggyu/Secret-Lion/assets/84954439/a4af2f66-391b-4a18-bc38-c14806943394">

<br /><br />

**게시글 작성**
<br />
카테고리, 제목, 상세 내용, 투표, 태그 등을 입력할 수 있습니다.
<br />
<img width="300" alt="#11 게시물 작성_1" src="https://github.com/munseunggyu/Secret-Lion/assets/84954439/b5176129-05d8-4277-a641-8ef879a5be81">
<br />
<br />

**프로필**
<br />
프로필 이미지, 투표한 글, 작성한 글이 리스트 형태로 보여줍니다.
<br />
<img width="300" alt="#12 Profile_1 (1)" src="https://github.com/munseunggyu/Secret-Lion/assets/84954439/e5aaae96-6bd3-4a99-aec2-b674d55e055d">
<br />
<br />
