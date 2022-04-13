import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import Router from "./routes/router"
import CssBaseline from "@mui/material/CssBaseline"
import BottomNavigationComponent from "./components/BottomNavigationComponent"
import { ThemeProvider } from "@emotion/react"
import theme from "./constants/theme"

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Router />
        <BottomNavigationComponent />
      </BrowserRouter>
      <CssBaseline />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
