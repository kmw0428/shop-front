## V 1.16
회원 정보 수정 기능 추가 <br />
리뷰는 회원만 쓰도록 추가 <br />
숫자 1,000단위 쉼표 추가 <br />
npm install @tosspayments/payment-widget-sdk

## V 1.15
상품들 백엔드를 통해서 추가 완료 <br />
상품 상세페이지 작성 <br />
카테고리별 상품 페이지 제작

## V 1.14
진단 및 결과 페이지 작성 <br />
로그인시 로그인 유지 확인 및 로컬스토리지에 토큰 생성

## V 1.13
피부 및 두피 진단 페이지 작성 <br />

## V 1.12
진단 CSS 추가 <br />
이미지 추가 <br />
제품 찜하기 및 장바구니 추가 버튼 생성 <br />
npm install react-icons <br />
npm install @mui/icons-material

## V 1.11
제품 목록 페이지 추가 및 로그인 css 수정 <br />
HomePage 컨텐츠 완료, css 수정

## V 1.10
장바구니페이지 추가 <br />
스타일 정리

## V 1.09
검색창 제작

## V 1.08
배너 이미지에 링크 추가

## V 1.07
배너 추가 및 Navbar 수정 <br />
npm install swiper <br />
npm install react-slick slick-carousel <br />
npm install --save-dev @types/react-slick

## V 1.06
폴더 정리 <br />
Navbar, Footer 문제 수정

## V 1.05
로그인 페이지 추가

## V 1.04
Navbar, Footer 추가

## V 1.03
Diagnosis폴더 추가 <br />
Diagnosis.tsx의 const question에 질문지 작성 <br />
Result.tsx 결과페이지에 점수에 맞게 진단 <br />
css 찾아보고 진단테스트 스타일 꾸미기

## V 1.02
npm install axios <br />
제품 나열하는 리스트 작성

## V 1.01
npm install react-router-dom <br />
파일 시작시 export default function 이름(){} <br />
BrowserRouter - Routes - Route 순서대로, BrowserRouter은 무조건 최상위 <br />
여러 파일 -> App -> main <br />
css파일 적용시 App.module.css처럼 로컬 범위로 제한 import styles from './App.module.css'; className={styles.header} <br />

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
