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
