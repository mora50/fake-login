import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:regular,bold,italic&subset=latin,latin-ext');

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline: 0;
}

.color-blue{
  color: #233c98;
}

.bg-blue{
  background:  #233c98;
}

.justify-content-end{
  justify-content: flex-end;
}

body, html {
  font-family: 'Open Sans', sans-serif;

  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
}
`;

export default GlobalStyle;
