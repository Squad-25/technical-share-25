import { BrowserRouter, useLocation } from "react-router-dom"
import Router from "./routes/router"
import CssBaseline from "@mui/material/CssBaseline"
import BottomNavigationComponent from "./components/BottomNavigationComponent"
import { ThemeProvider } from "@emotion/react"
import theme from "./constants/theme"
import BreadCrumbs from "./components/breadcrumbs/breadCrumbs"


function App() {

  return (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <BreadCrumbs/>
          <Router />
          <BottomNavigationComponent />
        </BrowserRouter>
        <CssBaseline/>
      </ThemeProvider>
  );
}

export default App;