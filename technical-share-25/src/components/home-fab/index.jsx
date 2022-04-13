import { Fab } from "@mui/material"
import React from "react"
import AddIcon from "@mui/icons-material/Add"
import { useNavigate } from "react-router-dom"

export default function HomeFab() {
  const navigate = useNavigate()

  return (
    <Fab onClick={() => navigate('/posts/new')} variant="extended" size="medium" color="primary" sx={{ background: "#404099"}}aria-label="add">
      <AddIcon sx={{ mr: 1 }} />
      NOVA PERGUNTA
    </Fab>
  )
}
