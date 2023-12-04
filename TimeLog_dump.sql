-- MariaDB dump 10.19  Distrib 10.11.4-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: TimeLog
-- ------------------------------------------------------
-- Server version	10.11.4-MariaDB-1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin_access`
--

DROP TABLE IF EXISTS `admin_access`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin_access` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `access_granted` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `admin_access_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_access`
--

LOCK TABLES `admin_access` WRITE;
/*!40000 ALTER TABLE `admin_access` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_access` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `time_logs`
--

DROP TABLE IF EXISTS `time_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `time_logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `clock_in` datetime DEFAULT NULL,
  `clock_out` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `time_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `time_logs`
--

LOCK TABLES `time_logs` WRITE;
/*!40000 ALTER TABLE `time_logs` DISABLE KEYS */;
INSERT INTO `time_logs` (`user_id`, `clock_in`, `clock_out`) VALUES
(17, '2023-11-30 08:00:00', '2023-11-30 16:00:00'),
(22, '2023-11-30 09:15:00', '2023-11-30 17:30:00'),
(23, '2023-11-30 08:30:00', '2023-11-30 16:45:00'),
(24, '2023-11-30 07:45:00', '2023-11-30 15:45:00'),
(25, '2023-11-30 10:00:00', '2023-11-30 18:30:00'),
(17, '2023-12-01 07:30:00', '2023-12-01 15:45:00'),
(22, '2023-12-01 09:00:00', '2023-12-01 17:00:00'),
(23, '2023-12-01 08:15:00', '2023-12-01 16:30:00'),
(24, '2023-12-02 07:00:00', '2023-12-02 15:00:00'),
(25, '2023-12-02 10:15:00', '2023-12-02 18:45:00'),
(17, '2023-12-02 08:30:00', '2023-12-02 16:30:00'),
(22, '2023-12-02 09:45:00', '2023-12-02 17:15:00'),
(23, '2023-12-02 08:45:00', '2023-12-02 16:45:00'),
(24, '2023-12-02 07:15:00', '2023-12-02 15:15:00'),
(25, '2023-12-03 10:30:00', '2023-12-03 18:30:00'),
(17, '2023-12-03 09:00:00', '2023-12-03 17:00:00'),
(22, '2023-12-03 10:00:00', '2023-12-03 17:45:00'),
(23, '2023-12-03 09:00:00', '2023-12-03 17:00:00'),
(24, '2023-12-03 08:00:00', '2023-12-03 16:00:00'),
(25, '2023-12-04 11:00:00', '2023-12-04 19:00:00'),
(17, '2023-12-04 09:15:00', '2023-12-04 17:15:00'),
(22, '2023-12-04 10:15:00', '2023-12-04 18:00:00'),
(23, '2023-12-04 09:15:00', '2023-12-04 17:15:00'),
(24, '2023-12-04 07:45:00', '2023-12-04 15:45:00'),
(25, '2023-12-04 12:00:00', '2023-12-04 20:00:00'),
(17, '2023-12-04 09:30:00', '2023-12-04 17:30:00'),
(22, '2023-12-04 10:30:00', '2023-12-04 18:15:00'),
(23, '2023-12-04 09:30:00', '2023-12-04 17:30:00'),
(24, '2023-12-04 08:00:00', '2023-12-04 16:00:00'),
(25, '2023-12-04 11:15:00', '2023-12-04 19:15:00'),
(17, '2023-12-04 09:45:00', '2023-12-04 17:45:00'),
(22, '2023-12-04 10:45:00', '2023-12-04 18:30:00'),
(23, '2023-12-04 09:45:00', '2023-12-04 17:45:00'),
(24, '2023-12-04 08:15:00', '2023-12-04 16:15:00'),
(25, '2023-12-04 12:30:00', '2023-12-04 20:30:00'),
(17, '2023-12-04 11:00:00', '2023-12-04 19:00:00'),
(22, '2023-12-04 12:00:00', '2023-12-04 19:45:00'),
(23, '2023-12-04 11:00:00', '2023-12-04 19:00:00'),
(24, '2023-12-04 09:30:00', '2023-12-04 17:30:00'),
(25, '2023-12-04 12:45:00', '2023-12-04 20:45:00'),
(17, '2023-12-04 11:15:00', '2023-12-04 19:15:00'),
(22, '2023-12-04 12:15:00', '2023-12-04 19:30:00'),
(23, '2023-12-04 11:15:00', '2023-12-04 19:15:00'),
(24, '2023-12-04 09:45:00', '2023-12-04 17:45:00'),
(25, '2023-12-04 13:00:00', '2023-12-04 21:00:00'),
(17, '2023-12-04 11:30:00', '2023-12-04 19:30:00'),
(22, '2023-12-04 12:30:00', '2023-12-04 19:45:00'),
(23, '2023-12-04 11:30:00', '2023-12-04 19:30:00'),
(24, '2023-12-04 10:00:00', '2023-12-04 18:00:00'),
(25, '2023-12-04 13:15:00', '2023-12-04 21:15:00'),
(17, '2023-12-04 11:45:00', '2023-12-04 19:45:00'),
(22, '2023-12-04 12:45:00', '2023-12-04 19:30:00'),
(23, '2023-12-04 11:45:00', '2023-12-04 19:45:00'),
(24, '2023-12-04 09:15:00', '2023-12-04 17:15:00'),
(25, '2023-12-04 14:00:00', '2023-12-04 22:00:00'),
(17, '2023-12-04 12:00:00', '2023-12-04 20:00:00'),
(22, '2023-12-04 13:00:00', '2023-12-04 20:45:00'),
(23, '2023-12-04 12:00:00', '2023-12-04 20:00:00'),
(24, '2023-12-04 10:30:00', '2023-12-04 18:30:00'),
(25, '2023-12-04 14:15:00', '2023-12-04 22:15:00'),
(17, '2023-12-04 12:30:00', '2023-12-04 20:30:00'),
(22, '2023-12-04 13:30:00', '2023-12-04 21:00:00'),
(23, '2023-12-04 12:30:00', '2023-12-04 20:30:00'),
(24, '2023-12-04 11:00:00', '2023-12-04 19:00:00'),
(25, '2023-12-04 14:30:00', '2023-12-04 22:30:00'),
(17, '2023-12-04 12:45:00', '2023-12-04 20:45:00'),
(22, '2023-12-04 13:45:00', '2023-12-04 21:30:00'),
(23, '2023-12-04 12:45:00', '2023-12-04 21:00:00'),
(24, '2023-12-04 11:15:00', '2023-12-04 19:15:00'),
(25, '2023-12-04 14:45:00', '2023-12-04 22:45:00');


/*!40000 ALTER TABLE `time_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('employee','manager') NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(17,'chris1','$2b$10$Iu8PDJuOiAWrIyJyJfUJIuXkV6eFymz5WnDcLW5c16b9uFe7Kh5By','manager','2023-12-03 01:16:03','2023-12-03 17:11:45'),
(22,'user1','$2b$10$W.dAl978VFPKHD5LoI.aNeUTdFOoyyiPbzm.UkG/flM667Ps/2d7e','employee','2023-12-04 04:26:40','2023-12-04 04:26:40'),
(23,'user2','$2b$10$OKCkf7FgyVg/2EC26PrVc.c9LTHfY3oXRunrE5kAwQRmAWpgukjca','employee','2023-12-04 04:26:50','2023-12-04 04:26:50'),
(24,'user3','$2b$10$t1Dl/LRnlAUoPSgGwQtq8OITnBSk7ixW4PWtYcXVYcGZsTbe5JXzC','employee','2023-12-04 04:27:00','2023-12-04 04:27:00'),
(25,'user4','$2b$10$jQi4PVTxxZi36KkgB1DkZ.rGNO4686u4BjBcQc5RvXZ0AYEIxhUdS','employee','2023-12-04 04:27:21','2023-12-04 04:27:21');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-03 23:30:42
