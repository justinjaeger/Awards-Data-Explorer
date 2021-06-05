CREATE TABLE `users` (
  `userId` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) UNIQUE NOT NULL,
  `username` VARCHAR(20) UNIQUE,
  `password` VARCHAR(100),
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
  `userId` INT NOT NULL,
  `expiration` DATETIME NOT NULL
);

CREATE TABLE `followers` (
  `userId` INT NOT NULL,
  `follower` INT NOT NULL,
  `dateCreated` DATETIME,
  PRIMARY KEY (`userId`, `follower`)
);

ALTER TABLE `tokens` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `followers` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

ALTER TABLE `followers` ADD FOREIGN KEY (`follower`) REFERENCES `users` (`userId`);

ALTER TABLE `codes` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

CREATE UNIQUE INDEX `followers_index_0` ON `followers` (`userId`, `follower`);
