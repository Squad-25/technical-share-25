import { Button, Chip, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import React, { useState } from "react"
import styledComponents from "styled-components"
import styled from "@emotion/styled"
import axios from "axios"
import { BASE_URL, userID } from "../../services/urls"
import { useNavigate } from "react-router-dom"
import { Box } from "@mui/system"
import { useForm } from "../../hooks/useForm"
import logo from "../../assets/breadcrumbs-logo.svg"
import { Visibility, VisibilityOff } from "@mui/icons-material"


const EditInput = styled(TextField)`
  margin-top: 24px;
  width: 100%;
`

const EditFormControl = styled(FormControl)`
  width: 100%;
`

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
  img{
    margin-bottom: 32px;
    cursor: pointer;
    @media screen and (max-width: 704px) {
      display: none;
    }
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
  const { form, handleChange, clearForm } = useForm({ name: "", photo: "", role: "", email: "", password: "" })
  const [error, setError] = useState({ name: false, photo: false, role: false, email: false, password: false})
  const [showPassword, setShowPassword] = useState("password")


  const navigate = useNavigate()

  const submitForm = (e) => {
    e.preventDefault()


      axios
        .post(BASE_URL + `/users`, form)
        .then((res) => {
          localStorage.setItem('user_id', res.data.id)
          navigate("/skills-prompt")
        })
        .catch((err) => {
          console.log(err)
        })
  }


  return (
    <PageContainer>
            <img src={logo} alt="logo" onClick={() => navigate('/')}/>

          <SkillsInput
        required
        inputProps={{ maxlength: 100 }}
        error={error.name}
        value={form.name}
        placeholder="Digite seu nome completo"
        type="text"
        name="name"
        onChange={handleChange}
        label="Nome"
        margin="dense"
      />
                <SkillsInput
        required
        inputProps={{ maxlength: 100 }}
        error={error.photo}
        value={form.photo}
        placeholder="Digite a url da sua foto"
        type="text"
        name="photo"
        onChange={handleChange}
        label="Foto"
        margin="dense"
      />
                <SkillsInput
        required
        inputProps={{ maxlength: 100 }}
        value={form.role}
        placeholder="Digite seu cargo"
        type="text"
        name="role"
        onChange={handleChange}
        label="Cargo"
        margin="dense"
      />     
       <SkillsInput
      required
      inputProps={{ maxlength: 100 }}
      value={form.phone}
      placeholder="Digite seu telefone"
      type="phone"
      name="phone"
      onChange={handleChange}
      label="Fone"
      margin="dense"
    />
      <SkillsInput
        required
        inputProps={{ maxlength: 100 }}
        error={error.email}
        value={form.email}
        placeholder="Digite seu email"
        type="email"
        name="email"
        onChange={handleChange}
        label="Email"
        margin="dense"
      />
            <EditFormControl sx={{ marginTop: 1.1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Senha *</InputLabel>
        <OutlinedInput
          error={error.password}
          id="outlined-adornment-password"
          required
          value={form.password}
          name="password"
          onChange={handleChange}
          label="Senha"
          placeholder="Mínimo 6 caracteres"
          type={showPassword === "text" ? "text" : "password"}
          margin="dense"
          inputProps={{ pattern: "^.{6,}$" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() =>
                  showPassword === "text"
                    ? setShowPassword("password")
                    : setShowPassword("text")
                }
                edge="end"
              >
                {showPassword === "text" ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
      </EditFormControl>
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
          onClick={() => submitForm()}
        >
          Confirmar
        </ConfirmButton>
      </ButtonContainer>
    </PageContainer>
  )
}
