import { Request, Response } from "express"
import app from "./config/app"
import connection from "./config/connection"

// Pega users na database
app.get("/users", async (req, res) => {
  try {
    const result = await connection.raw("SELECT * FROM Users;")
    res.send(result[0].length === 1 ? result[0][0] : result[0])
  } catch (error: any) {
    res.send(error.message)
  }
})

// Cria novo user
app.post("/users", async (req: Request, res: Response) => {
  try {
    await connection.raw(`
        INSERT INTO Users
           (name, email, password, photo, bio, links, role)
        VALUES (
           "${req.body.name}",
           "${req.body.email}",
           "${req.body.password}",
           "${req.body.photo}",
           "${req.body.bio}",
           "${req.body.links}",
           "${req.body.role}"
); `)
    res.status(201).send("Success!")
  } catch (error: any) {
    res.status(500).send("An unexpected error occurred")
  }
})

// Pega user pelo id
app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const data = await connection.raw(`
       SELECT * FROM Users
       WHERE id = ${req.params.id}; `)

    res.status(200).send(data[0][0])
  } catch (error: any) {
    console.log(error)
    res.status(500).send("An unexpected error occurred")
  }
})

// Atualiza dados de user pelo id
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    await connection.raw(`
       UPDATE Users
        SET 
           name = "${req.body.name}",
           email = "${req.body.email}",
           password = "${req.body.password}",
           photo = "${req.body.photo}",
           bio = "${req.body.bio}",
           links = "${req.body.links}",
           role = "${req.body.role}"
       WHERE id = ${req.params.id}; `)

    const data = await connection.raw(`
       SELECT * FROM Users
       WHERE id = ${req.params.id}; `)

    res.status(200).send(data[0][0])
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Adiciona ou atualiza um mentor no user
app.put("/users/mentor/:id", async (req: Request, res: Response) => {
  try {
    await connection.raw(`
       UPDATE Users
        SET 
           mentorID = "${req.body.mentorID}"
       WHERE id = ${req.params.id}; `)

    const data = await connection.raw(`
       SELECT * FROM Users
       WHERE id = ${req.params.id}; `)

    res.status(200).send(data[0][0])
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Deleta user pelo id
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    await connection.raw(`
       DELETE FROM Users  
           WHERE id = ${req.params.id}; `)
    res.status(200).send("Success!")
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Pega posts
app.get("/posts", async (req: Request, res: Response) => {
  try {
    const result = await connection.raw("SELECT * FROM Posts;")
    res.send(result[0].length === 1 ? result[0][0] : result[0])
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Cria post
app.post("/posts", async (req: Request, res: Response) => {
  try {
    await connection.raw(`
        INSERT INTO Posts
           (userID, title, body, question)
        VALUES (
           ${req.body.userID},
           "${req.body.title}",
           "${req.body.body}",
           "${req.body.question}"
); `)
    res.status(201).send("Success!")
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
}})

// Vota no post
app.put("/posts/:id", async (req: Request, res: Response) => {
  try {
    await connection.raw(`
      UPDATE Posts
      SET votes = ${req.body.direction === 1 ? "(votes +1)" : "(votes -1)"}
      WHERE id = ${req.params.id};
    `)
    res.status(201).send("Success!")
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
}
})