USE  `heroku_c87f19f0155779c`;

SELECT * FROM Users;

CREATE TABLE Users(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL
);

CREATE TABLE Posts(
  post_id VARCHAR(255) PRIMARY KEY NOT NULL,
  userID INT,
  title VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  votes INT DEFAULT 0 NOT NULL,
  post_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (userID) REFERENCES Users(id)
);

CREATE TABLE Comments(
	comment_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    comment_userID INT,
    postID VARCHAR(255),
	comment_body TEXT NOT NULL,
    comment_votes INT DEFAULT 0,
	comment_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (comment_userID) REFERENCES Users(id),
    FOREIGN KEY (postID) REFERENCES Posts(post_id)
);

CREATE TABLE Skills(
	skill_name VARCHAR(255) NOT NULL,
    userID INT,
    postID VARCHAR(255),
    FOREIGN KEY (userID) REFERENCES Users(id),
    FOREIGN KEY (postID) REFERENCES Posts(post_id)
);

DROP TABLE Skills, Comments, Posts;