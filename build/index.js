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
// Pega users na database
app_1.default.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.default.raw("SELECT * FROM Users;");
        res.send(result[0].length === 1 ? result[0][0] : result[0]);
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
           (user_name, email, password, photo, bio, links, role)
        VALUES (
           "${req.body.name}",
           "${req.body.email}",
           "${req.body.password}",
           "${req.body.photo}",
           "${req.body.bio}",
           "${req.body.links}",
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
        const data = yield connection_1.default.raw(`
       SELECT * FROM Users
       WHERE id = ${req.params.id}; `);
        res.status(200).send(data[0][0]);
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
           user_name = "${req.body.name}",
           email = "${req.body.email}",
           password = "${req.body.password}",
           photo = "${req.body.photo}",
           bio = "${req.body.bio}",
           links = "${req.body.links}",
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
// Adiciona ou atualiza um mentor no user
app_1.default.put("/users/mentor/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.raw(`
       UPDATE Users
        SET 
           mentorID = "${req.body.mentorID}"
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
        // LEFT JOIN Comments
        // ON Comments.postID = Posts.post_id
        const comments = yield connection_1.default.raw(`
      SELECT comment_id, comment_userID, comment_body, comment_votes, comment_date
      FROM Posts
      JOIN Comments
      ON Comments.postID = Posts.post_id ;`);
        const result = {
            posts: posts[0],
            comments: comments[0]
        };
        res.send(result);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
// Cria post
app_1.default.post("/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.raw(`
        INSERT INTO Posts
           (userID, title, body, question)
        VALUES (
           ${req.body.userID},
           "${req.body.title}",
           "${req.body.body}",
           "${req.body.question}"
); `);
        res.status(201).send("Success!");
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
      WHERE post_id = ${req.params.id};
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
           ${req.body.postID},
           "${req.body.body}"
); `);
        res.status(201).send("Success!");
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send("An unexpected error occurred");
    }
}));
