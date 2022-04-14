import { Button, Chip, InputAdornment, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import styledComponents from "styled-components"
import styled from "@emotion/styled"
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded"
import SearchIcon from "@mui/icons-material/Search"
import axios from "axios"
import { BASE_URL, userID } from "../../services/urls"
import { useNavigate } from "react-router-dom"
import { Box } from "@mui/system"
import { useForm } from "../../hooks/useForm"
import useRequestData from "../../hooks/useRequestData"
import Loading from "../../assets/loading"

const PageContainer = styledComponents.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
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
  width: 80%;
`

const ChipContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  align-self: flex-start;
`

const ProfilePic = styledComponents.img`
  width: 30%;
  border-radius: 50%;
  margin: 22px;
  align-self: center;
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

export default function EditProfile() {
  const [tags, setTags] = useState("")
  const [userSkills, setUserSkills] = useState([])
  const { data } = useRequestData(BASE_URL + "/users/" + userID)
  const { form, handleChange } = useForm({
    user_name: "",
    role: "",
    phone: "",
    email: "",
  })

  useEffect(() => {
    if (data) setUserSkills(data.skills)
  }, [data])

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

    const request = {
      user_name: (form.user_name !== "" ? form.user_name : data.user.user_name),
      email: (form.email !== "" ? form.email : data.user.email),
      phone: (form.phone !== "" ? form.phone : data.user.phone),
      role: (form.role !== "" ? form.role : data.user.role)
    }

    axios
    .post(BASE_URL + `/skills/${userID}`, {skills: userSkills, user_id: data.user.id})
    .then((res) => {
    })
    .catch((err) => {
      console.log(err)
    })

    axios
      .put(BASE_URL + `/users/` + userID, request)
      .then((res) => {
        navigate("/profile")
      })
      .catch((err) => {
        console.log(err)
      })



  }

  return (
    <PageContainer>
      {data ? <ProfilePic src={data.user.photo} /> : <Loading />}
      <SkillsInput
        value={form.user_name}
        placeholder={data ? data.user.user_name : "Nome"}
        type="text"
        name="user_name"
        label="Nome"
        InputLabelProps={{ shrink: "true" }}
        onChange={handleChange}
        margin="dense"
      />
      <SkillsInput
        value={form.role}
        placeholder={data ? data.user.role : "Cargo"}
        type="text"
        InputLabelProps={{ shrink: true }}
        label="Cargo"
        name="role"
        onChange={handleChange}
        margin="dense"
      />
      <SkillsInput
        value={form.phone}
        placeholder={data ? data.user.phone : "Telefone"}
        InputLabelProps={{ shrink: true }}
        label="Telefone"
        type="phone"
        name="phone"
        onChange={handleChange}
        margin="dense"
      />
      <SkillsInput
        value={form.email}
        placeholder={data ? data.user.email : "E-mail"}
        type="text"
        name="email"
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        label="E-mail"
        margin="dense"
      />
      <PromptContainer
        type="submit"
        onSubmit={(e) => {
          submitSkill(e)
        }}
      >
        <SkillsInput
          value={tags}
          placeholder="Digite uma skill"
          type="text"
          name="skills"
          onChange={(e) => setTags(e.target.value)}
          label="Skills"
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
        <ConfirmButton
          variant="contained"
          disabled={isDisabled()}
          onClick={submitForm}
        >
          Salvar alterações
        </ConfirmButton>
      </ButtonContainer>
    </PageContainer>
  )
}
