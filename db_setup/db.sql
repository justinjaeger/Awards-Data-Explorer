CREATE TABLE `users` (
  `user_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `username` VARCHAR(20) UNIQUE NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `admin` BIT(1) DEFAULT 0,
  `authenticated` BIT(1) DEFAULT 0,
  `image` VARCHAR(10000),
  `dateCreated` DATETIME,
  `lastLoggedIn` DATETIME
);

CREATE TABLE `tokens` (
  `access_token` VARCHAR(250) PRIMARY KEY NOT NULL,
  `user_id` INT NOT NULL
);

CREATE TABLE `followers` (
  `username` VARCHAR(20) NOT NULL,
  `follower` VARCHAR(20) NOT NULL,
  `dateCreated` DATETIME,
  PRIMARY KEY (`username`, `follower`)
);

CREATE TABLE `rank_movie` (
  `rank_movie_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  `category` VARCHAR(250) NOT NULL,
  `year` VARCHAR(4) NOT NULL
);

CREATE TABLE `rank_user` (
  `user_id` INT NOT NULL,
  `rank_movie_id` INT NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`user_id`, `rank_movie_id`)
);

CREATE TABLE `awardsShows` (
  `awardsShow_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) UNIQUE NOT NULL,
  `year` INT NOT NULL,
  `open` BIT(1) DEFAULT 0,
  `dateCloses` DATETIME
);

CREATE TABLE `users_awardsShows` (
  `user_id` INT NOT NULL,
  `awardsShow_id` INT NOT NULL,
  `dateCreated` DATETIME,
  PRIMARY KEY (`user_id`, `awardsShow_id`)
);

CREATE TABLE `awardsCategories` (
  `awardsCategory_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `awardsShow_id` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL
);

CREATE TABLE `awardsContenders` (
  `awardsContender_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `awardsCategory_id` INT NOT NULL,
  `movie_id` INT NOT NULL,
  `person` VARCHAR(100),
  `personImage` VARCHAR(10000),
  `nomOrWin` BIT(1) DEFAULT 0
);

CREATE TABLE `movies` (
  `movie_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `director` VARCHAR(100),
  `starring` VARCHAR(1000),
  `logline` VARCHAR(1000),
  `poster` VARCHAR(10000)
);

CREATE TABLE `userPredictions` (
  `userPrediction_id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `awardsContender_id` INT NOT NULL,
  `place` INT
);

ALTER TABLE `tokens` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `followers` ADD FOREIGN KEY (`username`) REFERENCES `users` (`username`);

ALTER TABLE `users_awardsShows` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `users_awardsShows` ADD FOREIGN KEY (`awardsShow_id`) REFERENCES `awardsShows` (`awardsShow_id`);

ALTER TABLE `awardsCategories` ADD FOREIGN KEY (`awardsShow_id`) REFERENCES `awardsShows` (`awardsShow_id`);

ALTER TABLE `awardsContenders` ADD FOREIGN KEY (`awardsCategory_id`) REFERENCES `awardsCategories` (`awardsCategory_id`);

ALTER TABLE `awardsContenders` ADD FOREIGN KEY (`movie_id`) REFERENCES `movies` (`movie_id`);

ALTER TABLE `userPredictions` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

ALTER TABLE `userPredictions` ADD FOREIGN KEY (`awardsContender_id`) REFERENCES `awardsContenders` (`awardsContender_id`);

ALTER TABLE `followers` ADD FOREIGN KEY (`follower`) REFERENCES `users` (`username`);

ALTER TABLE `rank_user` ADD FOREIGN KEY (`rank_movie_id`) REFERENCES `rank_movie` (`rank_movie_id`);

ALTER TABLE `rank_user` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

CREATE UNIQUE INDEX `followers_index_0` ON `followers` (`username`, `follower`);

CREATE UNIQUE INDEX `rank_movie_index_1` ON `rank_movie` (`rank_movie_id`, `year`);

CREATE UNIQUE INDEX `rank_user_index_2` ON `rank_user` (`user_id`, `rank_movie_id`);

CREATE UNIQUE INDEX `users_awardsShows_index_3` ON `users_awardsShows` (`user_id`, `awardsShow_id`);
