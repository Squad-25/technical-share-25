USE  `heroku_c87f19f0155779c`;

SELECT * FROM Users;

CREATE TABLE Users(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  photo VARCHAR(255) NOT NULL,
  bio VARCHAR(255) NOT NULL,
  links VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  mentorID INT,
  FOREIGN KEY (mentorID) references Users(id)
);

CREATE TABLE Posts(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  userID INT,
  title VARCHAR(255) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  votes INT DEFAULT 0,
  post_date DATE,
  comments INT,
  FOREIGN KEY (userID) references Users(id),
  FOREIGN KEY (comments) references Comments(id)
);

CREATE TABLE Comments(
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    userID INT,
	body VARCHAR(1000) NOT NULL,
    votes INT DEFAULT 0,
	post_date DATE,
    FOREIGN KEY (userID) references Users(id)
);