CREATE TABLE `users` (
  `userId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
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
  `accessToken` VARCHAR(250) PRIMARY KEY NOT NULL,
  `userId` INT NOT NULL
);

CREATE TABLE `codes` (
  `verificationCode` INT PRIMARY KEY NOT NULL,
  `userId` INT NOT NULL
);

CREATE TABLE `followers` (
  `userId` INT NOT NULL,
  `follower` INT NOT NULL,
  `dateCreated` DATETIME,
  PRIMARY KEY (`userId`, `follower`)
);

CREATE TABLE `rankMovie` (
  `rankMovieId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `rankCategoryId` INT NOT NULL,
  `name` VARCHAR(250) UNIQUE NOT NULL,
  `score` INT NOT NULL DEFAULT 0
);

CREATE TABLE `rankUser` (
  `userId` INT NOT NULL,
  `rankMovieId` INT NOT NULL,
  `score` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`userId`, `rankMovieId`)
);

CREATE TABLE `rankCategory` (
  `rankCategoryId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `year` VARCHAR(4) NOT NULL,
  `category` VARCHAR(250) NOT NULL,
  `awardsShow` VARCHAR(100) NOT NULL,
  `archived` BIT(1) DEFAULT 0
);

CREATE TABLE `awardsShows` (
  `awardsShowId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) UNIQUE NOT NULL,
  `year` INT NOT NULL,
  `open` BIT(1) DEFAULT 0,
  `dateCloses` DATETIME
);

CREATE TABLE `usersAwardsShows` (
  `userId` INT NOT NULL,
  `awardsShowId` INT NOT NULL,
  `dateCreated` DATETIME,
  PRIMARY KEY (`userId`, `awardsShowId`)
);

CREATE TABLE `awardsCategories` (
  `awardsCategoryId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `awardsShowId` INT NOT NULL,
  `name` VARCHAR(100) NOT NULL
);

CREATE TABLE `awardsContenders` (
  `awardsContenderId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `awardsCategoryId` INT NOT NULL,
  `movieId` INT NOT NULL,
  `person` VARCHAR(100),
  `personImage` VARCHAR(10000),
  `nomOrWin` BIT(1) DEFAULT 0
);

CREATE TABLE `movies` (
  `movieId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `director` VARCHAR(100),
  `starring` VARCHAR(1000),
  `logline` VARCHAR(1000),
  `poster` VARCHAR(10000)
);

CREATE TABLE `userPredictions` (
  `userPredictionId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `awardsContenderId` INT NOT NULL,
  `place` INT
);

ALTER TABLE `tokens` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `usersAwardsShows` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `usersAwardsShows` ADD FOREIGN KEY (`awardsShowId`) REFERENCES `awardsShows` (`awardsShowId`);

ALTER TABLE `awardsCategories` ADD FOREIGN KEY (`awardsShowId`) REFERENCES `awardsShows` (`awardsShowId`);

ALTER TABLE `awardsContenders` ADD FOREIGN KEY (`awardsCategoryId`) REFERENCES `awardsCategories` (`awardsCategoryId`);

ALTER TABLE `awardsContenders` ADD FOREIGN KEY (`movieId`) REFERENCES `movies` (`movieId`);

ALTER TABLE `userPredictions` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `userPredictions` ADD FOREIGN KEY (`awardsContenderId`) REFERENCES `awardsContenders` (`awardsContenderId`);

ALTER TABLE `rankUser` ADD FOREIGN KEY (`rankMovieId`) REFERENCES `rankMovie` (`rankMovieId`);

ALTER TABLE `rankUser` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `rankMovie` ADD FOREIGN KEY (`rankCategoryId`) REFERENCES `rankCategory` (`rankCategoryId`);

ALTER TABLE `users` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`username`);

ALTER TABLE `followers` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `followers` ADD FOREIGN KEY (`follower`) REFERENCES `users` (`userId`);

ALTER TABLE `codes` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

CREATE UNIQUE INDEX `followers_index_0` ON `followers` (`userId`, `follower`);

CREATE UNIQUE INDEX `rankUser_index_1` ON `rankUser` (`userId`, `rankMovieId`);

CREATE UNIQUE INDEX `rankCategory_index_2` ON `rankCategory` (`year`, `category`, `awardsShow`);

CREATE UNIQUE INDEX `usersAwardsShows_index_3` ON `usersAwardsShows` (`userId`, `awardsShowId`);
