-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: database-1.ctee4gmysdpo.ap-northeast-2.rds.amazonaws.com    Database: ssafy_sec
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `cctv_info`
--

DROP TABLE IF EXISTS `cctv_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cctv_info` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `camera_count` int NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `management_agency_name` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `management_phone_number` varchar(30) COLLATE utf8mb3_bin NOT NULL,
  `purpose` varchar(30) COLLATE utf8mb3_bin NOT NULL,
  `road_address` varchar(150) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `custom_trails`
--

DROP TABLE IF EXISTS `custom_trails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `custom_trails` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `calorie` int NOT NULL,
  `distance` double NOT NULL,
  `eup_myeon_dong` varchar(30) COLLATE utf8mb3_bin NOT NULL,
  `is_public` bit(1) DEFAULT NULL,
  `like_num` int DEFAULT NULL,
  `memo` varchar(255) COLLATE utf8mb3_bin DEFAULT NULL,
  `runtime` varchar(10) COLLATE utf8mb3_bin NOT NULL,
  `si_do` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `si_gun_go` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `star_ranking` int DEFAULT NULL,
  `trails_img` varchar(120) COLLATE utf8mb3_bin DEFAULT NULL,
  `trails_name` varchar(50) COLLATE utf8mb3_bin DEFAULT NULL,
  `users` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK22cun6q9wnu8mpldi1r23awy8` (`users`),
  CONSTRAINT `FK22cun6q9wnu8mpldi1r23awy8` FOREIGN KEY (`users`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=382 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `dong_entity`
--

DROP TABLE IF EXISTS `dong_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dong_entity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `emd_cd` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `emd_kor_nm` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `geometry` geometry NOT NULL /*!80003 SRID 4326 */,
  PRIMARY KEY (`id`),
  SPATIAL KEY `idx_geometry` (`geometry`)
) ENGINE=InnoDB AUTO_INCREMENT=3529 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `footsteps`
--

DROP TABLE IF EXISTS `footsteps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footsteps` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `user_id` bigint NOT NULL,
  `visited_num` int NOT NULL,
  `address` varchar(255) COLLATE utf8mb3_bin NOT NULL,
  `user_img_url` varchar(255) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2184 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `rec_users`
--

DROP TABLE IF EXISTS `rec_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rec_users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `cafe_num` int NOT NULL,
  `cctv_num` int NOT NULL,
  `convenience_num` int NOT NULL,
  `police_num` int NOT NULL,
  `restaurant_num` int NOT NULL,
  `sum_num` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `recommend_trails`
--

DROP TABLE IF EXISTS `recommend_trails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommend_trails` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `eup_myeon_dong` varchar(30) COLLATE utf8mb3_bin NOT NULL,
  `si_do` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `si_gun_go` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `trails_id` bigint NOT NULL,
  `cluster` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `classification` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL,
  `restaurant_name` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `restaurant_phone_number` varchar(30) COLLATE utf8mb3_bin NOT NULL,
  `road_address` varchar(150) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14936 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `si_do_entity`
--

DROP TABLE IF EXISTS `si_do_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `si_do_entity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `geometry` geometry NOT NULL /*!80003 SRID 4326 */,
  `sido_cd` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `sido_nm` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`),
  SPATIAL KEY `idx_geometry` (`geometry`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `si_gun_gu_entity`
--

DROP TABLE IF EXISTS `si_gun_gu_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `si_gun_gu_entity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `geometry` geometry NOT NULL /*!80003 SRID 4326 */,
  `sigungu_cd` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `sigungu_nm` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`),
  SPATIAL KEY `idx_geometry` (`geometry`)
) ENGINE=InnoDB AUTO_INCREMENT=252 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sido_sigungu_dong_mapping`
--

DROP TABLE IF EXISTS `sido_sigungu_dong_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sido_sigungu_dong_mapping` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sido_sigungu_dong` varchar(255) COLLATE utf8mb3_bin NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3532 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `spot_lists`
--

DROP TABLE IF EXISTS `spot_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spot_lists` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `duration` time DEFAULT NULL,
  `eup_myeon_dong` varchar(30) COLLATE utf8mb3_bin NOT NULL,
  `la` double NOT NULL,
  `lo` double NOT NULL,
  `si_do` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `si_gun_go` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `custom_trails` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK7lf9qvy9nlk2u3gvuh1fjcqtu` (`custom_trails`),
  CONSTRAINT `FK7lf9qvy9nlk2u3gvuh1fjcqtu` FOREIGN KEY (`custom_trails`) REFERENCES `custom_trails` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1221209 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trails_around_facility`
--

DROP TABLE IF EXISTS `trails_around_facility`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trails_around_facility` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `cafe_num` int NOT NULL,
  `cctv_num` int NOT NULL,
  `convenience_num` int NOT NULL,
  `police_num` int NOT NULL,
  `restaurant_num` int NOT NULL,
  `custom_trails` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5ma6enrll9wjb35174iiigf92` (`custom_trails`),
  CONSTRAINT `FK5ma6enrll9wjb35174iiigf92` FOREIGN KEY (`custom_trails`) REFERENCES `custom_trails` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=202 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `trails_mid_likes`
--

DROP TABLE IF EXISTS `trails_mid_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trails_mid_likes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `custom_trails` bigint NOT NULL,
  `users` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdo4msjqtwuvne8ii7ctrlx1u5` (`custom_trails`),
  KEY `FK5ewbdvirxqv7353guojfsi29e` (`users`),
  CONSTRAINT `FK5ewbdvirxqv7353guojfsi29e` FOREIGN KEY (`users`) REFERENCES `users` (`id`),
  CONSTRAINT `FKdo4msjqtwuvne8ii7ctrlx1u5` FOREIGN KEY (`custom_trails`) REFERENCES `custom_trails` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `age_range` varchar(30) COLLATE utf8mb3_bin DEFAULT NULL,
  `gender` varchar(10) COLLATE utf8mb3_bin DEFAULT NULL,
  `kakao_email` varchar(50) COLLATE utf8mb3_bin NOT NULL,
  `kakao_profile_img` varchar(250) COLLATE utf8mb3_bin NOT NULL,
  `kakao_uuid` bigint NOT NULL,
  `nick_name` varchar(20) COLLATE utf8mb3_bin DEFAULT NULL,
  `prefer_duration` int DEFAULT NULL,
  `user_name` varchar(15) COLLATE utf8mb3_bin NOT NULL,
  `user_role` varchar(30) COLLATE utf8mb3_bin NOT NULL,
  `visited_location` varchar(50) COLLATE utf8mb3_bin DEFAULT NULL,
  `prefer_duration_e` int DEFAULT NULL,
  `prefer_duration_s` int DEFAULT NULL,
  `rec_users` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKltq9sg12alffmhs83ukqc0f5b` (`rec_users`),
  CONSTRAINT `FKltq9sg12alffmhs83ukqc0f5b` FOREIGN KEY (`rec_users`) REFERENCES `rec_users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users_rankings`
--

DROP TABLE IF EXISTS `users_rankings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_rankings` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `deleted_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) NOT NULL,
  `eup_myeon_dong` varchar(30) COLLATE utf8mb3_bin NOT NULL,
  `footstep_cnt` int NOT NULL,
  `si_do` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `si_gun_go` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `users_nickname` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `users_profile_img` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-04  9:12:26
