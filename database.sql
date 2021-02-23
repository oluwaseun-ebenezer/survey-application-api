-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: surveyapp
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `answers`
--

DROP TABLE IF EXISTS `answers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `survey_id` int NOT NULL,
  `question_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  KEY `question_id` (`question_id`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answers`
--

LOCK TABLES `answers` WRITE;
/*!40000 ALTER TABLE `answers` DISABLE KEYS */;
INSERT INTO `answers` VALUES (17,'Answer  to question 01',5,38,'2021-02-21 16:03:30',NULL),(18,'Answer1 to question01',5,38,'2021-02-21 16:03:42',NULL),(19,'1',5,40,'2021-02-21 16:04:26',NULL),(20,'2',5,40,'2021-02-21 16:04:29',NULL),(21,'3',5,40,'2021-02-21 16:04:31',NULL),(22,'< 18',5,41,'2021-02-21 16:04:55',NULL),(23,'18 - 30',5,41,'2021-02-21 16:05:13',NULL);
/*!40000 ALTER TABLE `answers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `questions`
--

DROP TABLE IF EXISTS `questions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `survey_id` int NOT NULL,
  `answer_type` int NOT NULL,
  `compulsory` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `questions`
--

LOCK TABLES `questions` WRITE;
/*!40000 ALTER TABLE `questions` DISABLE KEYS */;
INSERT INTO `questions` VALUES (38,'Survey question 01',5,0,1,'2021-02-21 16:02:34',NULL),(40,'A new dawn is now',5,1,0,'2021-02-21 16:03:59',NULL),(41,'Age Range',5,0,0,'2021-02-21 16:04:45',NULL),(42,'Enter your name',5,2,0,'2021-02-21 16:07:21',NULL),(43,'Not compulsory you know',5,2,1,'2021-02-21 16:07:41',NULL);
/*!40000 ALTER TABLE `questions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responses`
--

DROP TABLE IF EXISTS `responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responses` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` text,
  `survey_id` int NOT NULL,
  `question_id` int NOT NULL,
  `answer_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `survey_id` (`survey_id`),
  KEY `question_id` (`question_id`),
  KEY `answer_id` (`answer_id`),
  CONSTRAINT `responses_ibfk_1` FOREIGN KEY (`survey_id`) REFERENCES `surveys` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `responses_ibfk_2` FOREIGN KEY (`question_id`) REFERENCES `questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `responses_ibfk_3` FOREIGN KEY (`answer_id`) REFERENCES `answers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responses`
--

LOCK TABLES `responses` WRITE;
/*!40000 ALTER TABLE `responses` DISABLE KEYS */;
INSERT INTO `responses` VALUES (24,NULL,5,38,17,'2021-02-21 16:09:31',NULL),(25,NULL,5,40,19,'2021-02-21 16:09:31',NULL),(26,NULL,5,40,20,'2021-02-21 16:09:31',NULL),(27,NULL,5,41,23,'2021-02-21 16:09:31',NULL),(28,'Oluwaseun',5,42,NULL,'2021-02-21 16:09:31',NULL),(29,'Yes I know',5,43,NULL,'2021-02-21 16:09:32',NULL),(30,NULL,5,38,18,'2021-02-21 16:11:32',NULL),(31,NULL,5,40,19,'2021-02-21 16:11:32',NULL),(32,NULL,5,41,23,'2021-02-21 16:11:32',NULL),(33,'Kobe',5,42,NULL,'2021-02-21 16:11:32',NULL),(34,NULL,5,38,18,'2021-02-21 16:11:42',NULL),(35,NULL,5,40,19,'2021-02-21 16:11:42',NULL),(36,NULL,5,41,23,'2021-02-21 16:11:42',NULL),(37,'Kobe',5,42,NULL,'2021-02-21 16:11:42',NULL),(38,'No, I didnt get to know',5,43,NULL,'2021-02-21 16:11:42',NULL),(39,NULL,5,41,22,'2021-02-21 21:46:04',NULL),(40,NULL,5,40,19,'2021-02-21 21:46:04',NULL),(41,NULL,5,38,17,'2021-02-21 21:46:04',NULL),(42,'Ade',5,42,NULL,'2021-02-21 21:46:04',NULL),(43,'And Papa',5,43,NULL,'2021-02-21 21:46:04',NULL),(44,NULL,5,38,17,'2021-02-21 21:46:12',NULL),(45,NULL,5,40,19,'2021-02-21 21:46:12',NULL),(46,NULL,5,41,22,'2021-02-21 21:46:12',NULL),(47,'Ade',5,42,NULL,'2021-02-21 21:46:12',NULL),(48,'And Papa',5,43,NULL,'2021-02-21 21:46:13',NULL),(49,NULL,5,38,17,'2021-02-21 21:46:41',NULL),(50,NULL,5,40,19,'2021-02-21 21:46:41',NULL),(51,NULL,5,41,22,'2021-02-21 21:46:41',NULL),(52,'Ade',5,42,NULL,'2021-02-21 21:46:41',NULL),(53,'And Papa',5,43,NULL,'2021-02-21 21:46:41',NULL),(54,NULL,5,38,17,'2021-02-21 21:46:59',NULL),(55,NULL,5,40,19,'2021-02-21 21:46:59',NULL),(56,NULL,5,41,22,'2021-02-21 21:46:59',NULL),(57,'Ade',5,42,NULL,'2021-02-21 21:46:59',NULL),(58,'And Papa',5,43,NULL,'2021-02-21 21:46:59',NULL),(59,NULL,5,38,17,'2021-02-21 21:47:00',NULL),(60,NULL,5,40,19,'2021-02-21 21:47:00',NULL),(61,NULL,5,41,22,'2021-02-21 21:47:00',NULL),(62,'Ade',5,42,NULL,'2021-02-21 21:47:00',NULL),(63,'And Papa',5,43,NULL,'2021-02-21 21:47:00',NULL),(64,NULL,5,38,17,'2021-02-21 21:47:01',NULL),(65,NULL,5,40,19,'2021-02-21 21:47:01',NULL),(66,NULL,5,41,22,'2021-02-21 21:47:01',NULL),(67,'Ade',5,42,NULL,'2021-02-21 21:47:01',NULL),(68,'And Papa',5,43,NULL,'2021-02-21 21:47:01',NULL),(69,NULL,5,38,17,'2021-02-21 21:47:02',NULL),(70,NULL,5,40,19,'2021-02-21 21:47:02',NULL),(71,NULL,5,41,22,'2021-02-21 21:47:02',NULL),(72,'Ade',5,42,NULL,'2021-02-21 21:47:02',NULL),(73,'And Papa',5,43,NULL,'2021-02-21 21:47:02',NULL),(74,NULL,5,41,22,'2021-02-21 21:53:52',NULL),(75,NULL,5,40,19,'2021-02-21 21:53:52',NULL),(76,'Tell me',5,42,NULL,'2021-02-21 21:53:52',NULL),(77,NULL,5,40,19,'2021-02-21 21:57:52',NULL),(78,NULL,5,41,22,'2021-02-21 21:57:52',NULL),(79,'Tell him now',5,42,NULL,'2021-02-21 21:57:52',NULL);
/*!40000 ALTER TABLE `responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `surveys`
--

DROP TABLE IF EXISTS `surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `surveys` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `surveys`
--

LOCK TABLES `surveys` WRITE;
/*!40000 ALTER TABLE `surveys` DISABLE KEYS */;
INSERT INTO `surveys` VALUES (5,'My New Survey','This is the updated description to my new survey','2021-02-21 16:00:43',NULL);
/*!40000 ALTER TABLE `surveys` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-22  6:22:19
