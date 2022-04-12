import React, { useState } from "react"
import { Chip, InputAdornment, TextField } from "@mui/material"
import styled from "@emotion/styled"
import styledComponents from "styled-components"
import SearchIcon from "@mui/icons-material/Search"
import { Box } from "@mui/system"

const PromptContainer = styledComponents.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const ChipContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 10%;
  align-self: flex-start;
`

const SkillsInput = styled(TextField)`
  margin-top: 8px;
  width: 90%;
`

const Skill = styled(Chip)`
  margin: 0 4px 8px 0;
  width: fit-content;
  background-color: #ba3300;
  color: #ffffff;
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
`

export default function SearchBar(props) {
  const [input, setInput] = useState("")
  const searchSkills = props.skills
  const setSearchSkills = props.setSkills

  const renderSkills = () => {
    const skillSet = searchSkills.map((skill) => {
      return (
        <Skill
          key={skill}
          id={skill}
          label={skill}
          onDelete={() => {
            const newSkills = searchSkills.filter((deleteSkill) => {
              return skill !== deleteSkill
            })
            setSearchSkills(newSkills)
          }}
        />
      )
    })
    return skillSet
  }

  const submitSkill = (e) => {
    e.preventDefault()
    if (searchSkills.some((skill) => skill === input)) {
      setInput("")
    } else {
      setSearchSkills([...searchSkills, input])
      setInput("")}
  }

  return (
    <PromptContainer type="submit" onSubmit={(e) => {submitSkill(e)}}>
      <SkillsInput
        autoFocus
        error={false}
        value={input}
        placeholder="Digite skills ou pessoas"
        type="text"
        name="busca"
        onChange={(e) => setInput(e.target.value)}
        label="Busca"
        margin="dense"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
       <ChipContainer>{renderSkills()}</ChipContainer>
    </PromptContainer>
  )
}
