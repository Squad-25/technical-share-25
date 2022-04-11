import React from "react"
import { Route, Routes } from "react-router-dom"
import Login from "../pages/login"
import CreateQuestion from "../pages/create-question"
import UserProfiles from "../pages/user-profile"
import MentorProfiles from "../pages/mentor-profile"
import Question from "../pages/question"
import Rank from "../pages/rank"
import Search from "../pages/search"
import SkillsPrompt from "../pages/skills-prompt"
import NotFound from "../pages/404"
import Home from "../pages/home/home"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/create-question" element={<CreateQuestion />} />
      <Route path="/user-profile/:id" element={<UserProfiles />} />
      <Route path="/mentor-profile/:id" element={<MentorProfiles />} />
      <Route path="/question" element={<Question />} />
      <Route path="/rank" element={<Rank />} />
      <Route path="/search" element={<Search />} />
      <Route path="/skills-prompt" element={<SkillsPrompt />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
