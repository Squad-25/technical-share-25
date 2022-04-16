import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../pages/login"
import CreateQuestion from "../pages/create-question"
import UserProfile from "../pages/user-profile"
import EditProfile from "../pages/edit-profile"
import User from "../pages/user/user"
import Question from "../pages/question"
import Rank from "../pages/rank"
import SkillsPrompt from "../pages/skills-prompt/skillsPrompt"
import NotFound from "../pages/404"
import Home from "../pages/home/home"
import Msuserterms from "../pages/login/msuserterms"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/msuserterms" element={<Msuserterms/>}/>
      <Route path="/posts/new" element={<CreateQuestion />} />
      <Route path="/profile/" element={<UserProfile />} />
      <Route path="/profile/edit" element={<EditProfile />} />
      <Route path="/user/:id" element={<User />} />
      <Route path="/post/:id" element={<Question />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/skills-prompt" element={<SkillsPrompt />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
