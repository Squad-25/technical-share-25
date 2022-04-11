import { Button, Input, TextField } from "@mui/material"
import React from "react"
import styledComponents from "styled-components"
import { useForm } from "../../hooks/useForm"
import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom"

const PageContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
`

const SkillsInput = styled(TextField)`

`

const PromptContainer = styledComponents.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  h5 {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
  }
`

export default function SkillsPrompt() {

  const {form, handleChange, clearForm} = useForm({skills: ""})

  return (
    <PageContainer>
      <h6>Technical Share</h6>
      <PromptContainer>
        <h5>Selecione suas skills</h5>
        <SkillsInput
          autoFocus
          error={false}
          name="skills"
          value={form.skills}
          placeholder="html, css, javascript..."
          onChange={handleChange}
          label="Skills"
          margin="dense"
        />
      </PromptContainer>
    </PageContainer>
  )
}
