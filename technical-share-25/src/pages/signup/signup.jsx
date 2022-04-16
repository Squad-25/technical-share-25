import { Button, Chip, InputAdornment, TextField } from "@mui/material"
import React, { useState } from "react"
import styledComponents from "styled-components"
import styled from "@emotion/styled"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import SearchIcon from "@mui/icons-material/Search"
import axios from "axios"
import { BASE_URL, userID } from "../../services/urls"
import { useNavigate } from "react-router-dom"
import { Box } from "@mui/system"
import { useForm } from "../../hooks/useForm"

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
`

const SkillsInput = styled(TextField)`
  margin-top: 8px;
`

const ButtonContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 30px;
`

const ConfirmButton = styled(Button)`
  width: fit-content;
  background: #404099;
`

const ChipContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  align-self: flex-start;
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

export default function Signup() {
  const { form, handleChange, clearForm } = useForm({ title: "", body: "" })
  const [tags, setTags] = useState("")
  const [userSkills, setUserSkills] = useState([])
  const [error, setError] = useState({ title: false, body: false, tags: false })

  const navigate = useNavigate()

  const renderSkills = () => {
    const skillSet = userSkills.map((skill) => {
      return (
        <Skill
          color="primary"
          key={skill}
          id={skill}
          label={skill}
          onDelete={() => {
            const newSkills = userSkills.filter((deleteSkill) => {
              return skill !== deleteSkill
            })
            setUserSkills(newSkills)
          }}
        />
      )
    })
    return skillSet
  }

  const isDisabled = () => {
    if (userSkills.length === 0) return true
    else return false
  }

  const submitSkill = (e) => {
    e.preventDefault()
    if (userSkills.some((skill) => skill === tags)) {
      setTags("")
    } else {
      setUserSkills([...userSkills, tags])
      setTags("")
    }
  }

  const submitForm = (e) => {
    e.preventDefault()

    if (form.title === "") {
      setError({ title: true })
    } else if (form.body === "") {
      setError({ body: true })
    } else if (userSkills === []) {
      setError({ tags: true })
    } else if (form.title !== "" && form.body !== "" && userSkills !== []) {
      const request = {
        userID: `"${userID}"`,
        title: form.title,
        body: form.body,
        skills: userSkills,
      }

      axios
        .post(BASE_URL + `/posts`, request)
        .then((res) => {
          alert("Pergunta enviada!")
          navigate("/")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  return (
    <PageContainer>
      <SkillsInput
        required
        autoFocus
        inputProps={{ maxlength: 100 }}
        error={error.title}
        value={form.title}
        placeholder="Digite um título para sua pergunta"
        type="text"
        name="title"
        onChange={handleChange}
        label="Título"
        margin="dense"
      />
      <SkillsInput
        multiline
        required
        rows={4}
        error={error.body}
        value={form.body}
        placeholder="Descreva sua dúvida"
        type="text"
        name="body"
        onChange={handleChange}
        label="Descrição"
        margin="dense"
      />
      <PromptContainer
        type="submit"
        onSubmit={(e) => {
          submitSkill(e)
        }}
      >
        <SkillsInput
          required
          error={error.tags}
          value={tags}
          placeholder="Digite uma tag"
          type="text"
          name="Tags"
          onChange={(e) => setTags(e.target.value)}
          label="Tags"
          margin="dense"
          InputProps={{
            endAdornment: tags ? (
              <Button position="end" onClick={submitSkill}>
                <AddCircleRoundedIcon />
              </Button>
            ) : (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </PromptContainer>
      <ChipContainer>{renderSkills()}</ChipContainer>
      <ButtonContainer>
        <Button
          variant="outlined"
          onClick={() => {
            clearForm()
            navigate(-1)
          }}
        >
          Cancelar
        </Button>
        <ConfirmButton
          variant="contained"
          disabled={isDisabled()}
          onClick={submitForm}
        >
          Confirmar
        </ConfirmButton>
      </ButtonContainer>
    </PageContainer>
  )
}
