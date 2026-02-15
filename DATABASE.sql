CREATE DATABASE IF NOT EXISTS school
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_0900_ai_ci;

USE school;

DROP TABLE IF EXISTS Enrollment;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS Instructor;

CREATE TABLE `Student` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) NOT NULL,
  `credits` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Instructor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Course` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `inst_id` int NOT NULL,
  `credits` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_instructor_id` (`inst_id`),
  CONSTRAINT `fk_instructor_id`
    FOREIGN KEY (`inst_id`)
    REFERENCES `Instructor` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Enrollment` (
  `student_id` int NOT NULL,
  `course_id` int NOT NULL,
  `grade` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`student_id`,`course_id`),
  KEY `course_id` (`course_id`),
  CONSTRAINT `enrollment_ibfk_1`
    FOREIGN KEY (`student_id`) REFERENCES `Student` (`id`) ON DELETE CASCADE,
  CONSTRAINT `enrollment_ibfk_2`
    FOREIGN KEY (`course_id`) REFERENCES `Course` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
