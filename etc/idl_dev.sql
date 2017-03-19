-- Create the development database
CREATE DATABASE jb_dev;

--Use development database
USE jb_dev;

/* Create User table
+-------------------+--------------+------+-----+-------------------+-----------------------------+
| Field             | Type         | Null | Key | Default           | Extra                       |
+-------------------+--------------+------+-----+-------------------+-----------------------------+
| id                | varchar(128) | NO   | PRI | NULL              |                             |
| access_token      | varchar(512) | NO   |     | NULL              |                             |
| creation_time     | datetime     | YES  |     | CURRENT_TIMESTAMP |                             |
| modification_time | datetime     | YES  |     | NULL              | on update CURRENT_TIMESTAMP |
+-------------------+--------------+------+-----+-------------------+-----------------------------+ */
CREATE TABLE IF NOT EXISTS user (`id` VARCHAR(128) NOT NULL PRIMARY KEY, `access_token` VARCHAR(512) NOT NULL, `creation_time` DATETIME DEFAULT CURRENT_TIMESTAMP, `modification_time` DATETIME ON UPDATE CURRENT_TIMESTAMP);
