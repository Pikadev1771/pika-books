import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  ${reset} 
  *{
        box-sizing: border-box;
    }
  a{
        text-decoration: none;
        color: inherit;
    }  
    html, body {
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
        background-color: #1664C0;
      
    }
    body{
        line-height: 1;
        font-family: 'Noto Sans KR', sans-serif;

    }
    ol, ul{
        list-style: none;
    }
    button {
        border: 0;
        background: transparent;
        cursor: pointer;
    }
`;
