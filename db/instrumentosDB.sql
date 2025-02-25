-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tp6_react_semana6_lab4
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.25-MariaDB

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

--
-- Table structure for table `categorias_instrumentos`
--

DROP TABLE IF EXISTS `categorias_instrumentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias_instrumentos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `denominacion` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias_instrumentos`
--

LOCK TABLES `categorias_instrumentos` WRITE;
/*!40000 ALTER TABLE `categorias_instrumentos` DISABLE KEYS */;
INSERT INTO `categorias_instrumentos` VALUES (1,'CUERDA'),(2,'VIENTO'),(3,'PERCUSION'),(4,'TECLADO'),(5,'ELECTRONICO');
/*!40000 ALTER TABLE `categorias_instrumentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instrumento`
--

DROP TABLE IF EXISTS `instrumento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instrumento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cantidad_vendida` int(11) NOT NULL,
  `costo_envio` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `instrumento` varchar(255) DEFAULT NULL,
  `marca` varchar(255) DEFAULT NULL,
  `modelo` varchar(255) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `categoria_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKnhkqej6lujlqjemecwvwb91m3` (`categoria_id`),
  CONSTRAINT `FKnhkqej6lujlqjemecwvwb91m3` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_instrumentos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instrumento`
--

LOCK TABLES `instrumento` WRITE;
/*!40000 ALTER TABLE `instrumento` DISABLE KEYS */;
INSERT INTO `instrumento` VALUES (1,4,'2500','Guitarra espectacular','https://audioimport.com.ar/wp-content/uploads/2020/07/ga.jpg','Guitarra','Apa','fenix',15000,1),(2,5,'4000','dadasdas','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnXJsfY9XlwWiNCffSLuyf2EeoWauEOlgWNjBWtJ0Hbg&s','Piano','LOLO','Epo',23500,4),(3,42,'2300','Bombo','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI7FW2M86_5aAO3-G8QpJk0qNxKqgCtpRs2mcEvm7ejg&s','Bombo','Fenix','P450',9000,3),(4,120,'G','Buen bajo para practicar en casa','https://acdn.mitiendanube.com/stores/152/693/products/bajo-leonard-precision-4-cuerdas-accesorios-8223-mla20001827952_112013-o-8c224ecf7eeae9859115132834079495-640-0.jpg','Bajo ','Legend','Z120',45000,1);
/*!40000 ALTER TABLE `instrumento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `fecha_pedido` datetime(6) DEFAULT NULL,
  `total_pedido` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'2024-05-10 11:08:56.000000',38500),(2,'2024-05-10 11:37:56.000000',38500),(3,'2024-05-10 11:47:32.000000',47500),(4,'2024-05-10 11:49:29.000000',32500),(5,'2024-05-10 11:52:46.000000',24000),(6,'2024-05-10 15:54:55.000000',32500),(7,'2024-05-15 23:32:13.000000',85500),(8,'2024-05-22 23:00:27.000000',38500),(9,'2024-05-22 23:00:41.000000',38500),(10,'2024-05-22 23:01:59.000000',38500);
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido_detalle`
--

DROP TABLE IF EXISTS `pedido_detalle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido_detalle` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `instrumento_id` bigint(20) DEFAULT NULL,
  `pedido_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKoa5c7ikdpmiwn2aalf6aqskwi` (`instrumento_id`),
  KEY `FKhuvcqbd92kc4eqypgqmyi17cb` (`pedido_id`),
  CONSTRAINT `FKhuvcqbd92kc4eqypgqmyi17cb` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`),
  CONSTRAINT `FKoa5c7ikdpmiwn2aalf6aqskwi` FOREIGN KEY (`instrumento_id`) REFERENCES `instrumento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido_detalle`
--

LOCK TABLES `pedido_detalle` WRITE;
/*!40000 ALTER TABLE `pedido_detalle` DISABLE KEYS */;
INSERT INTO `pedido_detalle` VALUES (1,1,1,1),(2,1,2,1),(3,1,1,2),(4,1,2,2),(5,1,1,3),(6,1,2,3),(7,1,3,3),(8,1,3,4),(9,1,2,4),(10,1,3,5),(11,1,1,5),(12,1,2,6),(13,1,3,6),(14,1,1,7),(15,3,2,7),(16,1,1,8),(17,1,2,8),(18,1,1,9),(19,1,2,9),(20,1,1,10),(21,1,2,10);
/*!40000 ALTER TABLE `pedido_detalle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `clave` varchar(255) DEFAULT NULL,
  `nombre_usuario` varchar(255) DEFAULT NULL,
  `rol` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_sdv6g9qgao3symag3pk95ddgw` (`clave`),
  UNIQUE KEY `UK_puhr3k3l7bj71hb7hk7ktpxn0` (`nombre_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9','admin',0),(2,'1725165c9a0b3698a3d01016e0d8205155820b8d7f21835ca64c0f81c728d880','operador',1),(3,'8395107bccee912451ce2415d4617f4e7fe36fa77f802f8d4050f5e726fab8a7','visor',2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-30  0:05:33
