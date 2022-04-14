"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./config/app"));
const connection_1 = __importDefault(require("./config/connection"));
const uuid_1 = require("uuid");
// Pega users na database
app_1.default.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield connection_1.default.raw("SELECT * FROM Users;");
        const skills = yield connection_1.default.raw(`
    SELECT skill_name, userID
    FROM Skills
    LEFT JOIN Users 
    ON Users.id = Skills.userID
    `);
        const newUsers = users[0].map((user) => {
            const newSkill = skills[0]
                .filter((skill) => {
                if (skill.userID === user.id) {
                    return true;
                }
            })
                .map((skill) => {
                return skill.skill_name;
            });
            user = Object.assign(Object.assign({}, user), { tags: newSkill });
            return user;
        });
        res.send(newUsers);
    }
    catch (error) {
        res.send(error.message);
    }
}));
// Cria novo user
app_1.default.post("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.raw(`
        INSERT INTO Users
           (user_name, email, password, photo, phone, role)
        VALUES (
           "${req.body.name}",
           "${req.body.email}",
           "${req.body.password}",
           "${req.body.photo}",
           "${req.body.phone}",
           "${req.body.role}"
); `);
        res.status(201).send("Success!");
    }
    catch (error) {
        res.status(500).send("An unexpected error occurred");
    }
}));
// Pega user pelo id
app_1.default.get("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield connection_1.default.raw(`
       SELECT id, user_name, email, photo, phone, role FROM Users
       WHERE id = ${req.params.id};`);
        const skills = yield connection_1.default.raw(`
      SELECT skill_name FROM Skills WHERE userID = ${req.params.id};
    `);
        const data = {
            user: user[0][0],
            skills: skills[0].map((skill) => {
                return skill.skill_name;
            }),
        };
        res.status(200).send(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Atualiza dados de user pelo id
app_1.default.put("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.raw(`
       UPDATE Users
        SET 
           user_name = "${req.body.user_name}",
           email = "${req.body.email}",
           phone = "${req.body.phone}",
           role = "${req.body.role}"
       WHERE id = ${req.params.id}; `);
        const data = yield connection_1.default.raw(`
       SELECT * FROM Users
       WHERE id = ${req.params.id}; `);
        res.status(200).send(data[0][0]);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Deleta user pelo id
app_1.default.delete("/users/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.raw(`
       DELETE FROM Users  
           WHERE id = ${req.params.id}; `);
        res.status(200).send("Success!");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Pega posts
app_1.default.get("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield connection_1.default.raw(`SELECT id, user_name, photo, post_id, title, body, post_date, votes
      FROM Users      
      JOIN Posts 
      ON Posts.userID = Users.id
       ;`);
        const skills = yield connection_1.default.raw(`
      SELECT skill_name, postID
      FROM Skills
      LEFT JOIN Posts 
      ON Posts.post_id = Skills.postID
      `);
        const newPosts = posts[0].map((post) => {
            const newSkill = skills[0]
                .filter((skill) => {
                if (skill.postID === post.post_id) {
                    return true;
                }
            })
                .map((skill) => {
                return skill.skill_name;
            });
            post = Object.assign(Object.assign({}, post), { tags: newSkill });
            return post;
        });
        res.send(newPosts);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Pega post por ID
app_1.default.get("/posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield connection_1.default.raw(`SELECT id, user_name, photo, post_id, title, body, post_date, votes
      FROM Users      
      JOIN Posts 
      ON Posts.userID = Users.id WHERE post_id = "${req.params.id}"
       ;`);
        const comments = yield connection_1.default.raw(`
      SELECT  comment_userID, comment_body, comment_votes, comment_date
      FROM Posts
      JOIN Comments
      ON Comments.postID = Posts.post_id WHERE postID = "${req.params.id}";`);
        const tags = yield connection_1.default.raw(`
      SELECT skill_name FROM Skills WHERE postID = "${req.params.id}";
      `);
        const data = {
            post: post[0][0],
            comments: comments[0],
            tags: tags[0].map((skill) => {
                return skill.skill_name;
            }),
        };
        res.send(data);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Pega posts pelo user_id
app_1.default.get("/user/:id/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield connection_1.default.raw(`SELECT id, user_name, photo, post_id, title, body, post_date, votes
      FROM Users      
      JOIN Posts 
      ON Posts.userID = Users.id WHERE id = "${req.params.id}"
       ;`);
        const data = {
            posts: post[0],
        };
        res.send(data);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Cria post
app_1.default.post("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postID = (0, uuid_1.v4)();
        yield connection_1.default.raw(`
        INSERT INTO Posts
           (POST_id, userID, title, body)
        VALUES (
            "${postID}",
           ${req.body.userID},
           "${req.body.title}",
           "${req.body.body}"
        ); `);
        const insert = (skill) => __awaiter(void 0, void 0, void 0, function* () {
            yield connection_1.default.raw(`
        INSERT INTO Skills
           (skill_name, postID)
        VALUES (
           "${skill}",
           "${postID}"
    ); `);
        });
        req.body.skills.map((skill) => {
            insert(skill);
        });
        res.status(201).send("Success! " + postID);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Vota no post
app_1.default.put("/posts/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.raw(`
      UPDATE Posts
      SET votes = ${req.body.direction === 1 ? "(votes +1)" : "(votes -1)"}
      WHERE post_id = "${req.params.id}";
    `);
        res.status(201).send("Success!");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Cria comentário
app_1.default.post("/posts/:id/comment", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.raw(`
        INSERT INTO Comments
           (comment_userID, postID, comment_body)
        VALUES (
           ${req.body.userID},
           "${req.params.id}",
           "${req.body.body}"
); `);
        res.status(201).send("Success!");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Insere Skills User
app_1.default.post("/skills/:userID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        yield connection_1.default
            .raw(`
      DELETE FROM Skills WHERE userID = ${req.body.user_id};
    `)
            .then(() => {
            const insert = (skill) => __awaiter(void 0, void 0, void 0, function* () {
                yield connection_1.default.raw(`
      INSERT INTO Skills
         (skill_name, userID)
      VALUES (
         "${skill}",
         ${req.params.userID}
  ); `);
            });
            req.body.skills.map((skill) => {
                insert(skill);
            });
        });
        res.status(201).send("Success!");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Insere Skills Post
app_1.default.post("/posts/tag/:postID", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield req.body.map((skill) => {
            connection_1.default.raw(`
    INSERT INTO Skills
       (skill_name, postID)
    VALUES (
       "${skill.name}",
       ${skill.postID}
); `);
        });
        res.status(201).send("Success!");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Pega skills
app_1.default.get("/posttags", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skills = yield connection_1.default.raw(`
        SELECT DISTINCT skill_name FROM Skills;
        `);
        const tags = skills[0].map((skill) => {
            return skill.skill_name;
        });
        res.send({ tags: tags });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Deleta skills
app_1.default.delete("/skills", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Sucess!");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
