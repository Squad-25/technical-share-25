import { Typography } from "@mui/material"
import React from "react"
import HomeFab from "../../components/home-fab/homeFab"


export default function Home() {
  return (
    <div className="PageContainer">
      <Typography variant="h1" component="h1">
        Olá, eu sou a Home
      </Typography>
      <HomeFab/>
    </div>
  )
}