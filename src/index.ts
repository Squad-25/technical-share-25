import { Request, Response } from "express"
import app from "./config/app"
import connection from "./config/connection"
import { v4 as uuidv4 } from "uuid"

// Pega users na database
app.get("/users", async (req, res) => {
  try {
    const users = await connection.raw("SELECT * FROM Users;")
    const skills = await connection.raw(`
    SELECT skill_name, userID
    FROM Skills
    LEFT JOIN Users 
    ON Users.id = Skills.userID
    `)

    const newUsers = users[0].map((user: any) => {
      const newSkill = skills[0]
        .filter((skill: any) => {
          if (skill.userID === user.id) {
            return true
          }
        })
        .map((skill: any) => {
          return skill.skill_name
        })
      user = { ...user, tags: newSkill }
      return user
    })

    res.send(newUsers)
  } catch (error: any) {
    res.send(error.message)
  }
})

// Cria novo user
app.post("/users", async (req: Request, res: Response) => {
  try {
    await connection.raw(`
        INSERT INTO Users
           (user_name, email, password, photo, phone, role)
        VALUES (
           "${req.body.name}",
           "${req.body.email}",
           "${req.body.password}",
           "${req.body.photo}",
           "${req.body.phone}",
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
    const user = await connection.raw(`
       SELECT id, user_name, email, photo, phone, role FROM Users
       WHERE id = ${req.params.id};`)
    const skills = await connection.raw(`
      SELECT skill_name FROM Skills WHERE userID = ${req.params.id};
    `)

    const data = {
      user: user[0][0],
      skills: skills[0].map((skill: { skill_name: String }) => {
        return skill.skill_name
      }),
    }

    res.status(200).send(data)
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
           user_name = "${req.body.user_name}",
           email = "${req.body.email}",
           phone = "${req.body.phone}",
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
    const posts = await connection.raw(
      `SELECT id, user_name, photo, post_id, title, body, post_date, votes
      FROM Users      
      JOIN Posts 
      ON Posts.userID = Users.id
       ;`
    )
    const skills = await connection.raw(`
      SELECT skill_name, postID
      FROM Skills
      LEFT JOIN Posts 
      ON Posts.post_id = Skills.postID
      `)

    const newPosts = posts[0].map((post: any) => {
      const newSkill = skills[0]
        .filter((skill: any) => {
          if (skill.postID === post.post_id) {
            return true
          }
        })
        .map((skill: any) => {
          return skill.skill_name
        })
      post = { ...post, tags: newSkill }
      return post
    })

    res.send(newPosts)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Pega post por ID
app.get("/posts/:id", async (req: Request, res: Response) => {
  try {
    const post = await connection.raw(
      `SELECT id, user_name, photo, post_id, title, body, post_date, votes
      FROM Users      
      JOIN Posts 
      ON Posts.userID = Users.id WHERE post_id = "${req.params.id}"
       ;`
    )
    const comments = await connection.raw(`
      SELECT  comment_userID, comment_body, comment_votes, comment_date
      FROM Posts
      JOIN Comments
      ON Comments.postID = Posts.post_id WHERE postID = "${req.params.id}";`)

    const tags = await connection.raw(`
      SELECT skill_name FROM Skills WHERE postID = "${req.params.id}";
      `)

    const data = {
      post: post[0][0],
      comments: comments[0],
      tags: tags[0].map((skill: { skill_name: String }) => {
        return skill.skill_name
      }),
    }

    res.send(data)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Pega posts pelo user_id
app.get("/user/:id/posts", async (req: Request, res: Response) => {
  try {
    const post = await connection.raw(
      `SELECT id, user_name, photo, post_id, title, body, post_date, votes
      FROM Users      
      JOIN Posts 
      ON Posts.userID = Users.id WHERE id = "${req.params.id}"
       ;`
    )

    const data = {
      posts: post[0],
    }

    res.send(data)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Cria post
app.post("/posts", async (req: Request, res: Response) => {
  try {
    const postID = uuidv4()
    await connection.raw(`
        INSERT INTO Posts
           (POST_id, userID, title, body)
        VALUES (
            "${postID}",
           ${req.body.userID},
           "${req.body.title}",
           "${req.body.body}"
        ); `)
    const insert = async (skill: { name: string; userID: number }) => {
      await connection.raw(`
        INSERT INTO Skills
           (skill_name, postID)
        VALUES (
           "${skill}",
           "${postID}"
    ); `)
    }
    req.body.skills.map((skill: { name: string; userID: number }) => {
      insert(skill)
    })
    res.status(201).send("Success! " + postID)
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Vota no post
app.put("/posts/:id", async (req: Request, res: Response) => {
  try {
    await connection.raw(`
      UPDATE Posts
      SET votes = ${req.body.direction === 1 ? "(votes +1)" : "(votes -1)"}
      WHERE post_id = "${req.params.id}";
    `)
    res.status(201).send("Success!")
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Cria comentário
app.post("/posts/:id/comment", async (req: Request, res: Response) => {
  try {
    await connection.raw(`
        INSERT INTO Comments
           (comment_userID, postID, comment_body)
        VALUES (
           ${req.body.userID},
           "${req.params.id}",
           "${req.body.body}"
); `)
    res.status(201).send("Success!")
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Insere Skills User
app.post("/skills/:userID", async (req: Request, res: Response) => {
  try {
    await connection
      .raw(
        `
      DELETE FROM Skills WHERE userID = ${req.params.userID};
    `
      )
      .then(() => {
        const insert = async (skill: { name: string; userID: number }) => {
          await connection.raw(`
      INSERT INTO Skills
         (skill_name, userID)
      VALUES (
         "${skill}",
         ${req.params.userID}
  ); `)
        }
        req.body.skills.map((skill: { name: string; userID: number }) => {
          insert(skill)
        })
      })

    res.status(201).send("Success!")
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Insere Skills Post
app.post("/posts/tag/:postID", async (req: Request, res: Response) => {
  try {
    await req.body.map((skill: { name: string; postID: number }) => {
      connection.raw(`
    INSERT INTO Skills
       (skill_name, postID)
    VALUES (
       "${skill.name}",
       ${skill.postID}
); `)
    })
    res.status(201).send("Success!")
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Pega skills
app.get("/posttags", async (req: Request, res: Response) => {
  try {
    const skills = await connection.raw(`
        SELECT DISTINCT skill_name FROM Skills;
        `)
    const tags = skills[0].map((skill: any) => {
      return skill.skill_name
    })

    res.send({ tags: tags })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Deleta skills
app.delete("/skills", async (req: Request, res: Response) => {
  try {
    res.send("Sucess!")
  } catch (error: any) {
    console.log(error.message)
    res.status(500).send("An unexpected error occurred")
  }
})

// Faz login
app.post("/login", async (req: Request, res: Response) => {
  try {

    await connection
      .raw(
        `
    SELECT * FROM Users;
    `
      )
      .then((response) => {
        let checkLogin = false
        let userID
        response[0].forEach((user: any) => {
          if (
            user.email === req.body.email &&
            user.password === req.body.password
          ) {
            checkLogin = true
            userID = { user_id: user.id }
          }
        })
        if (checkLogin) {
          res.send(userID)
        } else throw new Error("Dados incorretos")
      })
  } catch (error: any) {
    console.log("errou")
    res.status(500).send(error.message)
  }
})
