import styled from "@emotion/styled"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styledComponents from "styled-components"
import logo from "../../assets/breadcrumbs-logo.svg"
import { useForm } from "../../hooks/useForm"
import { BASE_URL } from "../../services/urls"

const PageContainer = styledComponents.div`
    display: flex;
    flex-direction: column;
    padding: 24px;
    img{
        width: 298px;
    }
    .forgot {
        cursor: pointer;
        color: #311B92;
        margin: 16px 8px;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
    }
    h1 {
        font-style: normal;
        font-weight: 400;
        font-size: 24px;
        margin: 48px 0 0 0;
    }
    .loginButton{
        margin-top: 16px;
        margin-bottom: 24px;
    }
    .signup{
        margin-top: 56px;
        align-self: center;
        width: 100%;
        p {
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            text-align: center;
        }
        .button{
            margin: 16px 0 0 0;
            width: 100%;
        }
    }
`

const EditInput = styled(TextField)`
  margin-top: 24px;
  width: 100%;
`

const EditFormControl = styled(FormControl)`
  width: 100%;
`

export default function Login() {
  const { form, handleChange } = useForm({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState("password")

  const navigate = useNavigate()

  const login = () => {
    axios
      .post('http://localhost:3003/login', form)
      .then((res) => {
        localStorage.setItem('user_id', res.data.user_id)
        navigate("/")
      })
      .catch((err) => alert('errou' + err.message))
  }

  return (
    <PageContainer>
      <img src={logo} alt="logo" />
      <h1>Login</h1>
      <EditInput
        required
        value={form.email}
        placeholder="nome@email.com"
        label="email"
        type="email"
        name="email"
        onChange={handleChange}
        margin="dense"
      />
      <EditFormControl sx={{ marginTop: 1.1 }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Senha *</InputLabel>
        <OutlinedInput
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
      <p className="forgot" onClick={() => navigate("/")}>Esqueceu sua senha?</p>
      <Button
        className="loginButton"
        variant="contained"
        onClick={() => {
          login()
        }}
      >
        Entrar
      </Button>
      <Button variant="contained" color="error" onClick={() => navigate('/profile')}>
        Entrar com office 365
      </Button>
      <div className="signup">
        <p>Não tem cadastro?</p>
        <Button className="button" variant="outlined" margin="dense">
          Cadastrar
        </Button>
      </div>
    </PageContainer>
  )
}
