import { Autocomplete, Button, TextField } from "@mui/material"
import React, { useState } from "react"
import styledComponents from "styled-components"
import { useForm } from "../../hooks/useForm"
import styled from "@emotion/styled"

const PageContainer = styledComponents.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
`

const SkillsInput = styled(Autocomplete)`
  margin-top: 25px;
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
  const {input, setInput} = useState("")
  const skills = ["123", "1290380"]
  const userSkills = []

  const addSkill


  return (
    <PageContainer>
      <h6>Technical Share</h6>
      <PromptContainer>
        <h5>Selecione suas skills</h5>
        <SkillsInput
        name="skills"
        value={input}
        onChange={(e) => setInput(e)}
          disablePortal
          options={skills}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="html, css, javascript..." />}
        />
        <Button onClick={addSkill}>Teste</Button>
      </PromptContainer>
    </PageContainer>
  )
}
