CREATE TABLE `user` (
  `id` int(10) AUTO_INCREMENT NOT NULL ,
  `username` varchar(13) NOT NULL,
  `password` varchar(60) NOT NULL,
  `salt` varchar(40) NOT NULL,
  PRIMARY KEY(`id`)
);

CREATE TABLE `todo` (
  `id` int(10) AUTO_INCREMENT NOT NULL ,
  `name` varchar(50) NOT NULL,
  `when` datetime,
  PRIMARY KEY(`id`)
);