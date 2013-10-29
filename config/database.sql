-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.31-0ubuntu0.12.04.1 - (Ubuntu)
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             8.1.0.4545
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for dn0086
DROP DATABASE IF EXISTS `dn0086`;
CREATE DATABASE IF NOT EXISTS `dn0086` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `dn0086`;


-- Dumping structure for table dn0086.access
DROP TABLE IF EXISTS `access`;
CREATE TABLE IF NOT EXISTS `access` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL DEFAULT 'NULL',
  `password` varchar(512) NOT NULL DEFAULT 'NULL',
  `description` varchar(100) DEFAULT NULL,
  `a_lvl` int(11) DEFAULT NULL COMMENT 'Access level',
  `create_time` datetime DEFAULT NULL,
  `last_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usr_abbr` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table dn0086.coupon
DROP TABLE IF EXISTS `coupon`;
CREATE TABLE IF NOT EXISTS `coupon` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `value` decimal(10,2) DEFAULT NULL,
  `pct_fix` tinyint(1) unsigned DEFAULT NULL COMMENT 'Percent or dollars',
  `state` tinyint(1) unsigned DEFAULT NULL COMMENT 'Multiple/Single/Used',
  `pts` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `state` (`state`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table dn0086.customer
DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(75) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pts` int(11) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table dn0086.gamemedia
DROP TABLE IF EXISTS `gamemedia`;
CREATE TABLE IF NOT EXISTS `gamemedia` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `type` tinyint(1) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table dn0086.menucategory
DROP TABLE IF EXISTS `menucategory`;
CREATE TABLE IF NOT EXISTS `menucategory` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `heartyidx` int(10) unsigned DEFAULT NULL COMMENT 'N calories',
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table dn0086.menuitem
DROP TABLE IF EXISTS `menuitem`;
CREATE TABLE IF NOT EXISTS `menuitem` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `mc_id` tinyint(4) DEFAULT NULL,
  `allergy` varchar(150) DEFAULT NULL,
  `calories` int(11) DEFAULT NULL,
  `picture` varchar(244) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `spicy` tinyint(1) DEFAULT NULL,
  `vegetarian` tinyint(1) DEFAULT NULL,
  `gfree` tinyint(1) DEFAULT NULL,
  `state` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mc_id` (`mc_id`),
  KEY `name` (`name`),
  KEY `state` (`state`),
  CONSTRAINT `menuitem_ibfk_1` FOREIGN KEY (`mc_id`) REFERENCES `menucategory` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table dn0086.ordereditem
DROP TABLE IF EXISTS `ordereditem`;
CREATE TABLE IF NOT EXISTS `ordereditem` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `mi_id` tinyint(4) DEFAULT NULL,
  `o_id` tinyint(4) DEFAULT NULL,
  `state` tinyint(1) unsigned DEFAULT NULL,
  `custom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mi_id` (`mi_id`),
  KEY `o_id` (`o_id`),
  KEY `state` (`state`),
  CONSTRAINT `ordereditem_ibfk_1` FOREIGN KEY (`mi_id`) REFERENCES `menuitem` (`id`),
  CONSTRAINT `ordereditem_ibfk_2` FOREIGN KEY (`o_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table dn0086.orders
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `c_id` tinyint(4) DEFAULT NULL,
  `cp_id` tinyint(4) DEFAULT NULL,
  `t_id` tinyint(4) DEFAULT NULL,
  `w_id` tinyint(4) DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `o_state` tinyint(1) unsigned DEFAULT NULL COMMENT 'Order State',
  `r_state` tinyint(1) unsigned DEFAULT NULL COMMENT 'Refill state',
  `tips` decimal(10,0) DEFAULT NULL,
  `paid` decimal(10,0) DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `w_id` (`w_id`),
  KEY `t_id` (`t_id`),
  KEY `c_id` (`c_id`),
  KEY `cp_id` (`cp_id`),
  KEY `o_state` (`o_state`),
  KEY `r_state` (`r_state`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`c_id`) REFERENCES `customer` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`cp_id`) REFERENCES `coupon` (`id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`t_id`) REFERENCES `access` (`id`),
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`w_id`) REFERENCES `access` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.


-- Dumping structure for table dn0086.waiterxtable
DROP TABLE IF EXISTS `waiterxtable`;
CREATE TABLE IF NOT EXISTS `waiterxtable` (
  `t_id` tinyint(4) NOT NULL DEFAULT '0',
  `w_id` tinyint(4) NOT NULL DEFAULT '0',
  `cw_state` tinyint(1) unsigned DEFAULT NULL COMMENT 'Call a Waiter State',
  `t_state` tinyint(1) unsigned DEFAULT NULL COMMENT 'Table State',
  PRIMARY KEY (`t_id`),
  KEY `w_id` (`w_id`),
  KEY `t_id` (`t_id`),
  KEY `cw_state` (`cw_state`),
  KEY `t_state` (`t_state`),
  CONSTRAINT `waiterxtable_ibfk_1` FOREIGN KEY (`t_id`) REFERENCES `access` (`id`),
  CONSTRAINT `waiterxtable_ibfk_2` FOREIGN KEY (`w_id`) REFERENCES `access` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
