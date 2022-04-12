import { Typography } from "@mui/material"
import React from "react"
import BottomNavigationComponent from "../../components/BottomNavigationComponent"

export default function Home() {
  return (
    <div className="PageContainer">
      <Typography variant="h1" component="h1">
        Olá, eu sou App
      </Typography>

      <BottomNavigationComponent />
    </div>
  )
}
