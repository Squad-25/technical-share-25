import { Button, FormControl, InputAdornment, TextField } from "@mui/material"
import React, { useState } from "react"
import styledComponents from "styled-components"
import styled from "@emotion/styled"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import SearchIcon from '@mui/icons-material/Search';

const PageContainer = styledComponents.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  h6{
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
  }
`

const PromptContainer = styledComponents.form`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  h5 {
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 24px;
  }
  p {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    margin: 8px 0;
  }
`

const SkillsInput = styled(TextField)`
  margin-top: 8px;
`

const ConfirmButton = styled(Button)`
  width: fit-content;
  align-self: flex-end;
  margin-top: 30px;
`

export default function SkillsPrompt() {
  const [input, setInput] = useState("")
  const [userSkills, setUserSkills] = useState([])

  const renderSkills = () => {
    const skillSet = userSkills.map((skill) => {
      return <p>{skill}</p>
    })
    return skillSet
  }

  const isDisabled = () => {
    if (userSkills.length === 0) return true
    else return false
  }

  const submitSkill = (e) => {
    e.preventDefault()
          setUserSkills([...userSkills, input])
          setInput("")
          console.log(userSkills)
  }

  return (
    <PageContainer>
      <h6>Technical Share</h6>
      <PromptContainer
        type="submit"
        onSubmit={(e) => {
          submitSkill(e)
        }}
      >
        <h5>Selecione suas skills</h5>
        <p>
          Informe suas habilidades práticas para que outras pessoas possam
          encontrar seu perfil quando elas forem necessárias.
        </p>

        <SkillsInput
        autoFocus
          error={false}
          value={input}
          placeholder="html, css, javascript..."
          type="text"
          name="skills"
          onChange={(e) => setInput(e.target.value)}
          label="Skills"
          margin="dense"
          InputProps={{
            endAdornment: input ? (
              <Button position="end" onClick={submitSkill}>
                <AddCircleRoundedIcon />
              </Button>
            ) : (
              <InputAdornment position="end"><SearchIcon/></InputAdornment>
            ),
          }}
        />
      </PromptContainer>
      {renderSkills()}
      <ConfirmButton variant="contained" disabled={isDisabled()}>
        Confirmar
      </ConfirmButton>
    </PageContainer>
  )
}
