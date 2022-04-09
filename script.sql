USE  `heroku_c87f19f0155779c`;

SELECT * FROM Users;

CREATE TABLE Users(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  bio VARCHAR(255) NOT NULL,
  links VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  tags VARCHAR(255),
  mentorID INT,
  FOREIGN KEY (mentorID) REFERENCES Users(id)
);

CREATE TABLE Messages(
	message_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userID INT NOT NULL,
    mentorID INT NOT NULL,
    body TEXT NOT NULL,
    sent_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (userID) REFERENCES Users(id),
    FOREIGN KEY (mentorID) REFERENCES Users(id)
);

CREATE TABLE Posts(
  post_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  userID INT,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  votes INT DEFAULT 0 NOT NULL,
  post_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  post_tags VARCHAR(255),
  question BOOLEAN,
  FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE Comments(
	comment_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    comment_userID INT,
    postID INT,
	comment_body TEXT NOT NULL,
    comment_votes INT DEFAULT 0,
	comment_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (comment_userID) REFERENCES Users(id),
    FOREIGN KEY (postID) REFERENCES Posts(post_id)
);


DROP TABLE Comments;

SELECT id, user_name, photo, post_id, title, body, post_date, votes, comments FROM Users JOIN Posts ON Posts.userID = Users.id;

SELECT id, user_name, photo, post_id, title, body, post_date, votes, comment_id, comment_userID, comment_body, comment_votes, comment_date
      FROM Users      
      JOIN Posts 
      ON Posts.userID = Users.id
      LEFT JOIN Comments
      ON Comments.postID = Posts.post_id;