import { BrowserRouter } from "react-router-dom"
import Router from "./routes/router"
import CssBaseline from "@mui/material/CssBaseline"
import BottomNavigationComponent from "./components/BottomNavigationComponent"
import { ThemeProvider } from "@emotion/react"
import theme from "./constants/theme"
import BreadCrumbs from "./components/breadcrumbs/breadCrumbs"
import styledComponents from "styled-components"
import Header from "./components/header/header"

const AppContainer = styledComponents.div`
@media screen and (min-width: 704px) {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
`


function App() {

  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <AppContainer>
          <Header/>
        <BreadCrumbs/>
          <Router />
          <BottomNavigationComponent />
        </AppContainer>
        </BrowserRouter>
        <CssBaseline/>
      </ThemeProvider>
  );
}

export default App;