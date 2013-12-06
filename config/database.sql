-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.5.34-0ubuntu0.12.04.1 - (Ubuntu)
-- Server OS:                    debian-linux-gnu
-- HeidiSQL Version:             8.1.0.4545
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for restms
DROP DATABASE IF EXISTS `restms`;
CREATE DATABASE IF NOT EXISTS `restms` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `restms`;


-- Dumping structure for table restms.access
DROP TABLE IF EXISTS `access`;
CREATE TABLE IF NOT EXISTS `access` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL DEFAULT 'NULL',
  `password` varchar(512) NOT NULL DEFAULT 'NULL',
  `description` varchar(100) DEFAULT NULL,
  `a_lvl` tinyint(1) unsigned DEFAULT NULL COMMENT 'Access level',
  `create_time` datetime DEFAULT NULL,
  `last_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- Dumping data for table restms.access: ~26 rows (approximately)
DELETE FROM `access`;
/*!40000 ALTER TABLE `access` DISABLE KEYS */;
INSERT INTO `access` (`id`, `username`, `password`, `description`, `a_lvl`, `create_time`, `last_time`) VALUES
	(1, 'mgr000', 'mngr', 'manager', 0, '2013-10-25 21:14:59', '2013-11-30 09:56:13'),
	(2, 'ks001', 'ktchn', 'kitchen', 1, '2013-10-25 21:15:25', '2013-11-28 01:14:09'),
	(3, 'ws001', 'wtr', 'waiter', 2, '2013-10-25 21:15:50', '2013-11-30 05:59:53'),
	(4, 'ws002', 'wtr', 'waiter', 2, '2013-10-25 21:15:50', '2013-11-30 06:06:33'),
	(5, 'ws003', 'wtr', 'waiter', 2, '2013-10-25 21:15:50', '2013-11-27 04:46:33'),
	(6, 'tbl001', 'tbl', 'table #1', 3, '2013-10-25 21:16:26', '2013-11-30 08:51:31'),
	(7, 'tbl002', 'tbl', 'table #2', 3, '2013-10-25 21:16:26', '2013-11-30 08:45:17'),
	(8, 'tbl003', 'tbl', 'table #3', 3, '2013-10-25 21:16:26', '2013-11-30 08:45:43'),
	(9, 'tbl004', 'tbl', 'table #4', 3, '2013-10-25 21:16:26', '2013-11-30 08:51:59'),
	(10, 'tbl005', 'tbl', 'table #5', 3, '2013-10-25 21:16:26', '2013-11-27 04:46:07'),
	(11, 'tbl006', 'tbl', 'table #6', 3, '2013-11-10 03:33:31', '2013-11-19 16:22:50'),
	(12, 'tbl007', 'tbl', 'table #7', 3, '2013-11-10 03:33:31', '2013-11-10 03:33:32'),
	(13, 'tbl008', 'tbl', 'table #8', 3, '2013-11-10 03:33:31', '2013-11-30 07:43:54'),
	(14, 'tbl009', 'tbl', 'table #9', 3, '2013-11-10 03:33:31', '2013-11-30 08:09:48'),
	(15, 'tbl010', 'tbl', 'table #10', 3, '2013-11-10 03:33:31', '2013-11-30 07:41:54'),
	(16, 'tbl011', 'tbl', 'table #11', 3, '2013-10-25 21:16:26', '2013-11-30 07:46:37'),
	(17, 'tbl012', 'tbl', 'table #12', 3, '2013-10-25 21:16:26', '2013-11-09 10:09:09'),
	(18, 'tbl013', 'tbl', 'table #13', 3, '2013-10-25 21:16:26', '2013-11-09 10:09:09'),
	(19, 'tbl014', 'tbl', 'table #14', 3, '2013-10-25 21:16:26', '2013-11-09 10:09:09'),
	(20, 'tbl015', 'tbl', 'table #15', 3, '2013-10-25 21:16:26', '2013-11-09 10:09:09'),
	(21, 'tbl016', 'tbl', 'table #16', 3, '2013-10-25 21:16:26', '2013-11-09 10:09:09'),
	(22, 'tbl017', 'tbl', 'table #17', 3, '2013-10-25 21:16:26', '2013-11-09 10:09:09'),
	(23, 'tbl018', 'tbl', 'table #18', 3, '2013-10-25 21:16:26', '2013-11-09 10:09:09'),
	(24, 'tbl019', 'tbl', 'table #19', 3, '2013-10-25 21:16:26', '2013-11-09 10:09:09'),
	(25, 'tbl020', 'tbl', 'table #20', 3, '2013-10-25 21:16:26', '2013-11-09 10:09:09'),
	(26, 'tbl021', 'tbl', 'table #21', 3, '2013-10-25 21:16:26', '2013-11-09 10:09:09');
/*!40000 ALTER TABLE `access` ENABLE KEYS */;


-- Dumping structure for view restms.a_orders
DROP VIEW IF EXISTS `a_orders`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `a_orders` (
	`id` INT(16) UNSIGNED NOT NULL,
	`c_id` INT(16) UNSIGNED NULL,
	`cp_id` INT(16) UNSIGNED NULL,
	`tw_id` INT(16) UNSIGNED NULL,
	`start_time` DATETIME NULL,
	`end_time` DATETIME NULL,
	`o_state` TINYINT(1) UNSIGNED NULL COMMENT 'Order State',
	`r_state` TINYINT(1) UNSIGNED NULL COMMENT 'Refill state',
	`tips` DECIMAL(10,2) UNSIGNED NULL,
	`paid` DECIMAL(10,2) UNSIGNED NULL,
	`total` DECIMAL(10,2) UNSIGNED NULL
) ENGINE=MyISAM;


-- Dumping structure for table restms.chat
DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `from` varchar(25) NOT NULL,
  `message` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_chat_access` (`from`),
  CONSTRAINT `FK_chat_access` FOREIGN KEY (`from`) REFERENCES `access` (`username`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table restms.chat: ~0 rows (approximately)
DELETE FROM `chat`;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;


-- Dumping structure for table restms.coupon
DROP TABLE IF EXISTS `coupon`;
CREATE TABLE IF NOT EXISTS `coupon` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `cvalue` decimal(10,2) DEFAULT NULL,
  `pct_fix` tinyint(1) unsigned DEFAULT NULL COMMENT 'Percent or dollars',
  `state` tinyint(1) unsigned DEFAULT NULL COMMENT 'Multiple/Single/Used',
  `pts` int(16) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `state` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Dumping data for table restms.coupon: ~4 rows (approximately)
DELETE FROM `coupon`;
/*!40000 ALTER TABLE `coupon` DISABLE KEYS */;
INSERT INTO `coupon` (`id`, `name`, `description`, `cvalue`, `pct_fix`, `state`, `pts`) VALUES
	(2, 'GETBREAK', 'Get a Free Poached Eggs For Breafast!', 3.99, 1, 0, 75),
	(3, 'FREEDRINK', 'Get a Free Tea or Coffee!', 1.99, 1, 0, 45),
	(4, '20OFF', 'Get 20 Percent Of Your Meal!', 20.00, 0, 0, 200),
	(5, '35OFF', 'Get 35 Percent Off Your Meal!', 35.00, 0, 0, 500);
/*!40000 ALTER TABLE `coupon` ENABLE KEYS */;


-- Dumping structure for table restms.customer
DROP TABLE IF EXISTS `customer`;
CREATE TABLE IF NOT EXISTS `customer` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(75) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `pts` int(16) unsigned DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `last_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Dumping data for table restms.customer: ~5 rows (approximately)
DELETE FROM `customer`;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` (`id`, `name`, `email`, `pts`, `create_time`, `last_time`) VALUES
	(1, 'Guest', 'guest@guest.com', 0, '2013-11-02 09:35:19', '2013-11-30 08:35:06'),
	(2, 'Bob Dick', 'bob@yahoo.com', 0, '2013-11-02 09:37:12', '2013-11-02 09:37:12'),
	(3, 'John Smith', 'john@msn.com', 0, '2013-11-02 09:39:32', '2013-11-12 05:14:10'),
	(4, 'Jack Dillon', 'dillon@twitter.com', 0, '2013-11-02 09:45:40', '2013-11-02 09:45:48'),
	(5, 'Jack Smith', 'jack@gmail.com', 50, '2013-11-03 10:30:33', '2013-11-15 23:42:00');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;


-- Dumping structure for view restms.k_view
DROP VIEW IF EXISTS `k_view`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `k_view` (
	`id` INT(16) UNSIGNED NOT NULL,
	`o_id` INT(16) UNSIGNED NULL,
	`c_state` TINYINT(1) UNSIGNED NULL,
	`start_time` DATETIME NULL,
	`w_name` VARCHAR(25) NULL COLLATE 'utf8_general_ci',
	`t_name` VARCHAR(25) NULL COLLATE 'utf8_general_ci',
	`name` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`custom` VARCHAR(255) NULL COLLATE 'utf8_general_ci'
) ENGINE=MyISAM;


-- Dumping structure for table restms.menucategory
DROP TABLE IF EXISTS `menucategory`;
CREATE TABLE IF NOT EXISTS `menucategory` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `heartyidx` int(16) unsigned DEFAULT NULL COMMENT 'N calories',
  `isdrink` tinyint(1) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Dumping data for table restms.menucategory: ~7 rows (approximately)
DELETE FROM `menucategory`;
/*!40000 ALTER TABLE `menucategory` DISABLE KEYS */;
INSERT INTO `menucategory` (`id`, `name`, `heartyidx`, `isdrink`) VALUES
	(1, 'Breakfast', 300, 0),
	(2, 'Appetizers', 300, 0),
	(3, 'Entrees', 600, 0),
	(4, 'Desserts', 300, 0),
	(5, 'Drinks', 100, 1),
	(6, 'Combos', 850, 1),
	(7, 'Kids\' Meals', 700, 0);
/*!40000 ALTER TABLE `menucategory` ENABLE KEYS */;


-- Dumping structure for table restms.menuitem
DROP TABLE IF EXISTS `menuitem`;
CREATE TABLE IF NOT EXISTS `menuitem` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `mc_id` int(16) unsigned DEFAULT NULL,
  `calories` int(16) unsigned DEFAULT NULL,
  `price` decimal(10,2) unsigned DEFAULT NULL,
  `spicy` tinyint(1) unsigned DEFAULT NULL,
  `gfree` tinyint(1) unsigned DEFAULT NULL,
  `vegetarian` tinyint(1) unsigned DEFAULT NULL,
  `state` tinyint(1) unsigned DEFAULT NULL,
  `fav` tinyint(1) unsigned DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `allergy` varchar(150) DEFAULT NULL,
  `picture` varchar(244) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mc_id` (`mc_id`),
  KEY `name` (`name`),
  KEY `state` (`state`),
  CONSTRAINT `FK_menuitem_menucategory` FOREIGN KEY (`mc_id`) REFERENCES `menucategory` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

-- Dumping data for table restms.menuitem: ~28 rows (approximately)
DELETE FROM `menuitem`;
/*!40000 ALTER TABLE `menuitem` DISABLE KEYS */;
INSERT INTO `menuitem` (`id`, `mc_id`, `calories`, `price`, `spicy`, `gfree`, `vegetarian`, `state`, `fav`, `name`, `description`, `allergy`, `picture`) VALUES
	(1, 1, 245, 4.99, 0, 1, 1, 0, 0, 'Cooked Oatmeal With Raisins', 'Breakfast of freshly prepared oatmeal topped with raisins. Served with your choice of coffee or orange juice and a cup of fruit.', 'Milk', '1-1.jpg'),
	(2, 1, 395, 5.69, 0, 0, 1, 0, 0, 'Belgian Waffles With Blackberries', 'Our lemon-poppy seed Belgian waffles topped with delicious blackberry maple syrup will make your morning perfect.', 'Eggs, Maple Syrup, Butter', '1-2.jpg'),
	(3, 1, 450, 5.99, 0, 0, 1, 0, 0, 'Chefs Classic Pancakes', 'Try our chefs classic pancakes topped with blueberries and strawberries.', 'Butter, Milk, Eggs', '1-3.jpg'),
	(4, 2, 380, 2.68, 1, 0, 0, 0, 0, 'Eggplant Caponata', 'Made from tender eggplant, red bell peppers and briny capers, tangy caponata will help you prepare for main dish', 'Wheat', '2-4.jpg'),
	(5, 3, 420, 9.99, 0, 0, 0, 0, 0, 'Hawaiian Chicken With Long-Grain Rice', 'Take a mental vacation to Hawaii as you enjoy this grilled chicken marinated in a mixture of pineapple.', 'Ginger', '3-5.jpg'),
	(6, 5, 150, 2.99, 0, 1, 1, 0, 0, 'Orange Juice', 'We will never offer you the juice from the carton box. All our juices are freshly made.', 'Orange', '5-6.jpg'),
	(7, 1, 245, 3.99, 0, 1, 1, 0, 0, 'Nuts And Apples', 'Get yourself a bowl of fresh apples and nuts with tasty sour cream', 'Milk, Nuts', '1-7.jpg'),
	(8, 2, 310, 2.69, 0, 0, 1, 0, 0, 'Roasted Tomato Bruschetta', 'A slice of baguette topped with cream cheese, fresh diced tomato, basil, olive oil and shredded parmesan cheese.', 'Cheese', '2-8.jpg'),
	(9, 2, 195, 5.99, 0, 1, 1, 0, 1, 'Brie Stuffed Mushrooms', 'People with gluten-free diets will fall in love with out nicely cooked mushrooms topped with brie cheese.', 'Mushrooms, Cheese', '2-9.jpg'),
	(10, 2, 74, 3.99, 0, 0, 1, 0, 0, 'Crustless Zucchini And Basil Mini-Quiches', 'A simple savory bites of zucchini, shallots and parmesan cheese.', 'Cheese, Eggs', '2-10.jpg'),
	(11, 3, 460, 15.89, 1, 0, 0, 0, 0, 'Tuscan Salmon With Rosemary Orzo', 'Fresh herbs abound here - as does niacin, an energizing B vitamin: One serving of salmon dishes up nearly 70 percent of our daily niacin needs.', 'Fish', '3-11.jpg'),
	(12, 3, 490, 19.99, 0, 0, 0, 0, 1, 'Pomegranate Brisket', 'The dish balances the savory character of the meat with the sweet pomegranate.', 'Pomegranate, Beef, Lemon', '3-12.jpg'),
	(13, 3, 740, 14.88, 0, 0, 0, 0, 0, 'Roasted Pork Loin', 'Tender roast pork with black-bean and sweet-potato salad is our chef\'s special Tex-Mex meal', 'Beans, Pork, Lime', '3-13.jpg'),
	(14, 4, 340, 2.99, 0, 0, 1, 0, 1, 'Moist Chocolate Cake', 'This cocoa-based cake is deeply chocolaty and incredibly moist. You\'ll love its gooey marshmallow frosting.', 'Butter, Coffee, Wheat, Eggs', '4-14.jpg'),
	(15, 4, 175, 3.68, 0, 1, 1, 0, 0, 'Christmas Finger Jello', 'Your kids will love our version of finger jello. However, why should it be limited to kids, right ?', 'Lime, Strawberry', '4-15.jpg'),
	(16, 4, 245, 6.99, 0, 1, 1, 0, 0, 'Neapolitan Ice Cream Pie', 'Thanks to a blend of frozen yogurt and ice cream, this cool treat only tastes sinful.', 'Milk, Strawberry', '4-16.jpg'),
	(17, 4, 60, 3.99, 0, 1, 1, 0, 0, 'Cranberry-Citrus Sorbet', 'If you like cranberries, oranges and lemons, you should try our refreshing chef\'s special.', 'Cranberry, Citrus', '4-17.jpg'),
	(18, 5, 0, 1.99, 0, 1, 1, 0, 0, 'Freshly Brewed Green Tea', 'Fyodor Dostoyevsky once said "I say let the world go to hell, but I should always have my tea."', '', '5-18.jpg'),
	(19, 5, 1, 2.99, 0, 1, 1, 0, 0, 'Freshly Brewed Coffee', 'What can be better than freshly made coffee in the morning.', 'Coffee', '5-19.jpg'),
	(20, 5, 136, 3.99, 0, 1, 1, 0, 1, 'Cranberry Juice', 'Our freshly made cranberry juice is not just delicious, it is also healthy. Get yourself a better drink right now.', 'Cranberry', '5-20.jpg'),
	(21, 6, 805, 23.87, 0, 0, 0, 0, 0, 'Tuscan Salmon Combo ($1 Savings)', 'Consists of Tuscan Salmon with Rosemary Orzo, Brie Stuffed Mushrooms and Orange Juice', 'Fish, Mushrooms, Orange', '6-21.jpg'),
	(22, 6, 800, 23.67, 0, 0, 0, 0, 0, 'Brisket Combo ($1 Savings)', 'Consists of Pomegranate Brisket, Roasted Tomato Bruschetta and Green Tea', 'Cheese, Beef, Pomegranate, Lemon', '6-22.jpg'),
	(23, 6, 950, 14.66, 1, 0, 0, 0, 0, 'Hawaiian Chicken Combo ($1 Savings)', 'Consists of Hawaiian Chicken With Long-Grain Rice, Eggplant Caponata and Orange Juice', 'Wheat, Ginger, Orange', '6-23.jpg'),
	(24, 6, 950, 21.86, 0, 0, 0, 0, 0, 'Pork Loin Combo ($1 Savings)', 'Consists of Roasted Pork Loin, Crustless Zucchini And Basil Mini-Quiches and Cranberry Juice', 'Beans, Pork, Lime, Cheese, Eggs, Cranberry', '6-24.jpg'),
	(25, 7, 350, 3.99, 0, 0, 0, 0, 0, 'Chicken Breasts with Yummy Potatoes', 'Your kids will love this tenderly cooked chicked breasts topped with pistachio pesto and tomatoes, served with baked potatoes', 'Pistachios', '7-25.jpg'),
	(26, 7, 325, 4.99, 0, 0, 0, 0, 0, 'Meatballs With Spaghetti', 'You already probably know kids\' affection to this Italian meal. What you did not know is that we keep our meals healthy, so you can order their favorite item without worrying about effects on their health.', 'Wheat', '7-26.jpg'),
	(27, 7, 370, 4.99, 0, 0, 1, 0, 0, 'Penne Pasta With Tomato Sauce', 'Yet another delicious Italian meal that will please your kids. It simple and we keep it healthy: penne pasta is made from whole wheat and we use only fresh and organic ingredients for our secret tomato sauce.', 'Wheat', '7-27.jpg'),
	(28, 7, 275, 6.99, 0, 0, 0, 0, 0, 'Honey Lime Tilapia With Southwest Farro Salad', 'Our chefs special Honey Lime Tilapia with Southwest Farro Salad will not make you disappointed in our efforts to keep  kids\' meals healthy.', 'Fish, Lime, Beans', '7-28.jpg');
/*!40000 ALTER TABLE `menuitem` ENABLE KEYS */;


-- Dumping structure for view restms.oimi
DROP VIEW IF EXISTS `oimi`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `oimi` (
	`id` INT(16) UNSIGNED NOT NULL,
	`o_id` INT(16) UNSIGNED NULL,
	`c_state` TINYINT(1) UNSIGNED NULL,
	`p_state` TINYINT(1) UNSIGNED NULL,
	`mi_id` INT(16) UNSIGNED NULL,
	`name` VARCHAR(100) NULL COLLATE 'utf8_general_ci',
	`custom` VARCHAR(255) NULL COLLATE 'utf8_general_ci',
	`price` DECIMAL(10,2) UNSIGNED NULL
) ENGINE=MyISAM;


-- Dumping structure for table restms.ordereditem
DROP TABLE IF EXISTS `ordereditem`;
CREATE TABLE IF NOT EXISTS `ordereditem` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `mi_id` int(16) unsigned DEFAULT NULL,
  `o_id` int(16) unsigned DEFAULT NULL,
  `c_state` tinyint(1) unsigned DEFAULT NULL,
  `p_state` tinyint(1) unsigned DEFAULT NULL,
  `custom` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mi_id` (`mi_id`),
  KEY `o_id` (`o_id`),
  KEY `state` (`c_state`),
  CONSTRAINT `FK_ordereditem_menuitem` FOREIGN KEY (`mi_id`) REFERENCES `menuitem` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `FK_ordereditem_orders` FOREIGN KEY (`o_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8;

-- Dumping data for table restms.ordereditem: ~195 rows (approximately)
DELETE FROM `ordereditem`;
/*!40000 ALTER TABLE `ordereditem` DISABLE KEYS */;
INSERT INTO `ordereditem` (`id`, `mi_id`, `o_id`, `c_state`, `p_state`, `custom`) VALUES
	(1, 1, 1, 2, 1, NULL),
	(2, 2, 1, 2, 1, NULL),
	(3, 3, 1, 2, 1, NULL),
	(4, 4, 1, 2, 1, NULL),
	(5, 5, 1, 2, 1, NULL),
	(6, 6, 1, 2, 1, NULL),
	(7, 5, 1, 2, 1, NULL),
	(8, 3, 2, 2, 1, NULL),
	(9, 2, 2, 2, 1, NULL),
	(10, 1, 2, 2, 1, NULL),
	(11, 4, 2, 2, 1, NULL),
	(12, 5, 2, 2, 1, NULL),
	(13, 6, 2, 2, 1, NULL),
	(14, 1, 3, 2, 1, NULL),
	(15, 2, 3, 2, 1, NULL),
	(16, 3, 3, 2, 1, NULL),
	(17, 4, 3, 2, 1, NULL),
	(18, 5, 3, 2, 1, NULL),
	(19, 6, 3, 2, 1, NULL),
	(20, 3, 3, 2, 1, NULL),
	(21, 6, 3, 2, 1, NULL),
	(22, 4, 3, 2, 1, NULL),
	(23, 4, 3, 2, 1, NULL),
	(24, 1, 4, 2, 1, NULL),
	(25, 2, 4, 2, 1, NULL),
	(26, 3, 4, 2, 1, NULL),
	(27, 2, 4, 2, 1, NULL),
	(28, 6, 4, 2, 1, NULL),
	(29, 4, 4, 2, 1, NULL),
	(30, 5, 4, 2, 1, NULL),
	(31, 6, 4, 2, 1, NULL),
	(32, 1, 4, 2, 1, NULL),
	(33, 2, 4, 2, 1, NULL),
	(34, 3, 4, 2, 1, NULL),
	(35, 4, 4, 2, 1, NULL),
	(36, 6, 4, 2, 1, NULL),
	(37, 1, 5, 2, 1, NULL),
	(38, 2, 5, 2, 1, NULL),
	(39, 6, 5, 2, 1, NULL),
	(40, 1, 6, 2, 1, NULL),
	(41, 2, 6, 2, 1, NULL),
	(42, 3, 6, 2, 1, NULL),
	(43, 6, 6, 2, 1, NULL),
	(44, 1, 7, 2, 1, NULL),
	(45, 2, 7, 2, 1, NULL),
	(46, 6, 7, 2, 1, NULL),
	(47, 3, 8, 2, 1, NULL),
	(48, 1, 8, 2, 1, NULL),
	(49, 6, 8, 2, 1, NULL),
	(50, 1, 9, 2, 1, NULL),
	(51, 2, 9, 2, 1, NULL),
	(52, 6, 9, 2, 1, NULL),
	(53, 1, 10, 2, 1, NULL),
	(54, 2, 10, 2, 1, NULL),
	(55, 3, 10, 2, 1, NULL),
	(56, 6, 10, 2, 1, NULL),
	(57, 1, 11, 2, 1, NULL),
	(58, 2, 11, 2, 1, NULL),
	(59, 3, 11, 2, 1, NULL),
	(60, 6, 11, 2, 1, NULL),
	(61, 1, 12, 2, 1, NULL),
	(62, 6, 12, 2, 1, NULL),
	(63, 5, 12, 2, 1, NULL),
	(64, 6, 12, 2, 1, NULL),
	(65, 5, 13, 2, 1, NULL),
	(66, 11, 13, 2, 1, NULL),
	(67, 14, 13, 2, 1, NULL),
	(68, 1, 14, 2, 1, NULL),
	(69, 2, 14, 2, 1, NULL),
	(70, 14, 14, 2, 1, NULL),
	(71, 1, 15, 2, 1, NULL),
	(72, 2, 15, 2, 1, NULL),
	(73, 7, 15, 2, 1, NULL),
	(74, 1, 16, 2, 1, NULL),
	(75, 2, 16, 2, 1, NULL),
	(76, 14, 16, 2, 1, NULL),
	(77, 1, 17, 2, 1, NULL),
	(78, 2, 17, 2, 1, NULL),
	(79, 7, 17, 2, 1, NULL),
	(80, 1, 18, 2, 1, NULL),
	(81, 7, 18, 2, 1, NULL),
	(82, 2, 18, 2, 1, NULL),
	(83, 11, 18, 2, 1, NULL),
	(84, 2, 19, 2, 1, NULL),
	(85, 18, 19, 2, 1, NULL),
	(86, 17, 19, 2, 1, NULL),
	(87, 11, 19, 2, 1, NULL),
	(88, 4, 20, 2, 1, NULL),
	(89, 8, 20, 2, 1, NULL),
	(90, 9, 20, 2, 1, NULL),
	(91, 11, 20, 2, 1, NULL),
	(92, 2, 21, 2, 1, NULL),
	(93, 7, 21, 2, 1, NULL),
	(94, 14, 21, 2, 1, NULL),
	(95, 11, 21, 2, 1, NULL),
	(96, 1, 22, 2, 1, NULL),
	(97, 14, 22, 2, 1, NULL),
	(98, 13, 22, 2, 1, NULL),
	(99, 1, 23, 2, 1, NULL),
	(100, 7, 23, 2, 1, NULL),
	(101, 2, 23, 2, 1, NULL),
	(102, 3, 23, 2, 1, NULL),
	(103, 3, 24, 2, 1, NULL),
	(104, 9, 24, 2, 1, NULL),
	(105, 18, 24, 2, 1, NULL),
	(106, 12, 25, 2, 1, NULL),
	(107, 18, 25, 2, 1, NULL),
	(108, 9, 25, 2, 1, NULL),
	(109, 12, 26, 2, 1, NULL),
	(110, 20, 26, 2, 1, NULL),
	(111, 8, 26, 2, 1, NULL),
	(112, 12, 27, 2, 1, NULL),
	(113, 18, 27, 2, 1, NULL),
	(114, 12, 28, 2, 1, NULL),
	(115, 18, 28, 2, 1, NULL),
	(116, 9, 29, 2, 1, NULL),
	(117, 12, 29, 2, 1, NULL),
	(118, 18, 29, 2, 1, NULL),
	(119, 12, 30, 2, 1, NULL),
	(120, 9, 30, 2, 1, NULL),
	(121, 18, 30, 2, 1, NULL),
	(122, 12, 31, 2, 1, NULL),
	(123, 18, 31, 2, 1, NULL),
	(124, 12, 32, 2, 1, NULL),
	(125, 18, 32, 2, 1, NULL),
	(126, 9, 33, 2, 1, NULL),
	(127, 12, 33, 2, 1, NULL),
	(128, 18, 33, 2, 1, NULL),
	(129, 12, 34, 2, 1, NULL),
	(130, 18, 34, 2, 1, NULL),
	(131, 12, 35, 2, 1, NULL),
	(132, 9, 35, 2, 1, NULL),
	(133, 18, 35, 2, 1, NULL),
	(134, 9, 36, 2, 1, NULL),
	(135, 12, 36, 2, 1, NULL),
	(136, 18, 36, 2, 1, NULL),
	(137, 9, 37, 2, 1, NULL),
	(138, 12, 37, 2, 1, NULL),
	(139, 18, 37, 2, 1, NULL),
	(140, 9, 38, 2, 1, NULL),
	(141, 12, 38, 2, 1, NULL),
	(142, 9, 39, 2, 1, NULL),
	(143, 18, 39, 2, 1, NULL),
	(144, 9, 40, 2, 1, NULL),
	(145, 12, 40, 2, 1, NULL),
	(146, 18, 40, 2, 1, NULL),
	(147, 9, 41, 2, 1, NULL),
	(148, 12, 41, 2, 1, NULL),
	(149, 18, 41, 2, 1, NULL),
	(150, 9, 42, 2, 1, NULL),
	(151, 18, 42, 2, 1, NULL),
	(152, 12, 43, 2, 1, NULL),
	(153, 18, 43, 2, 1, NULL),
	(154, 15, 43, 2, 1, NULL),
	(155, 12, 44, 2, 1, NULL),
	(156, 18, 44, 2, 1, NULL),
	(157, 9, 44, 2, 1, NULL),
	(158, 11, 45, 2, 1, NULL),
	(159, 6, 45, 2, 1, NULL),
	(160, 17, 45, 2, 1, NULL),
	(161, 9, 46, 2, 1, NULL),
	(162, 12, 46, 2, 1, NULL),
	(163, 18, 46, 2, 1, NULL),
	(164, 5, 47, 2, 2, NULL),
	(165, 6, 47, 2, 2, NULL),
	(166, 4, 48, 2, 1, 'no peppers'),
	(167, 9, 48, 2, 1, NULL),
	(168, 18, 48, 2, 1, NULL),
	(169, 5, 49, 2, 1, NULL),
	(170, 11, 49, 2, 1, NULL),
	(171, 15, 50, 2, 1, NULL),
	(172, 9, 50, 2, 1, NULL),
	(173, 8, 51, 2, 1, NULL),
	(174, 4, 51, 2, 1, NULL),
	(175, 18, 51, 2, 1, NULL),
	(176, 3, 51, 2, 1, NULL),
	(177, 3, 51, 2, 1, NULL),
	(178, 3, 51, 2, 1, NULL),
	(179, 3, 51, 2, 1, NULL),
	(180, 22, 52, 2, 1, NULL),
	(181, 12, 53, 2, 1, NULL),
	(182, 11, 54, 2, 1, NULL),
	(183, 14, 55, 2, 1, NULL),
	(184, 18, 55, 2, 1, NULL),
	(185, 15, 56, 2, 1, NULL),
	(186, 16, 56, 2, 1, NULL),
	(187, 18, 56, 2, 1, NULL),
	(188, 5, 57, 2, 1, NULL),
	(189, 4, 57, 2, 1, NULL),
	(190, 18, 57, 2, 1, NULL),
	(191, 27, 57, 2, 1, NULL),
	(192, 12, 58, 2, 1, NULL),
	(193, 20, 58, 2, 1, NULL),
	(194, 26, 58, 2, 1, NULL),
	(195, 21, 59, 2, 1, NULL),
	(196, 2, 60, 0, 1, NULL);
/*!40000 ALTER TABLE `ordereditem` ENABLE KEYS */;


-- Dumping structure for table restms.orders
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `c_id` int(16) unsigned DEFAULT NULL,
  `cp_id` int(16) unsigned DEFAULT NULL,
  `tw_id` int(16) unsigned DEFAULT NULL,
  `start_time` datetime DEFAULT NULL,
  `end_time` datetime DEFAULT NULL,
  `o_state` tinyint(1) unsigned DEFAULT NULL COMMENT 'Order State',
  `r_state` tinyint(1) unsigned DEFAULT NULL COMMENT 'Refill state',
  `tips` decimal(10,2) unsigned DEFAULT NULL,
  `paid` decimal(10,2) unsigned DEFAULT NULL,
  `total` decimal(10,2) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `c_id` (`c_id`),
  KEY `cp_id` (`cp_id`),
  KEY `o_state` (`o_state`),
  KEY `r_state` (`r_state`),
  KEY `FK_orders_waiterxtable` (`tw_id`),
  CONSTRAINT `FK_orders_coupon` FOREIGN KEY (`cp_id`) REFERENCES `coupon` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `FK_orders_customer` FOREIGN KEY (`c_id`) REFERENCES `customer` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  CONSTRAINT `FK_orders_waiterxtable` FOREIGN KEY (`tw_id`) REFERENCES `waiterxtable` (`id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8;

-- Dumping data for table restms.orders: ~59 rows (approximately)
DELETE FROM `orders`;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` (`id`, `c_id`, `cp_id`, `tw_id`, `start_time`, `end_time`, `o_state`, `r_state`, `tips`, `paid`, `total`) VALUES
	(1, 1, NULL, 2, '2013-11-11 04:14:02', '2013-11-11 04:39:09', 1, 0, 9.41, 50.13, 0.00),
	(2, 5, NULL, 3, '2013-11-11 04:39:57', '2013-11-11 05:02:01', 1, 0, 8.00, 38.13, 0.00),
	(3, 5, NULL, 10, '2013-11-11 07:02:50', '2013-11-11 07:08:43', 1, 0, 4.75, 25.26, 0.00),
	(4, 5, NULL, 2, '2013-11-11 07:11:16', '2013-11-11 07:41:56', 1, 0, 9.41, 63.50, 0.00),
	(5, 1, NULL, 9, '2013-11-12 03:27:36', '2013-11-12 03:31:33', 1, 0, 2.25, 11.95, 0.00),
	(6, 1, NULL, 12, '2013-11-12 03:31:59', '2013-11-12 03:48:50', 1, 0, 3.74, 19.93, 0.00),
	(7, 5, NULL, 14, '2013-11-12 03:49:57', '2013-11-12 04:15:56', 1, 0, 2.24, 11.95, 0.00),
	(8, 5, NULL, 11, '2013-11-12 04:57:17', '2013-11-12 05:03:46', 1, 0, 3.24, 17.28, 0.00),
	(9, 1, NULL, 5, '2013-11-12 05:04:19', '2013-11-12 05:05:11', 1, 0, 2.24, 11.95, 0.00),
	(10, 1, NULL, 16, '2013-11-12 05:06:45', '2013-11-12 05:08:11', 1, 0, 3.00, 20.00, 0.00),
	(11, 3, NULL, 5, '2013-11-12 05:12:36', '2013-11-12 05:13:59', 1, 0, 3.74, 19.93, 0.00),
	(12, 3, NULL, 4, '2013-11-12 05:14:14', '2013-11-12 05:29:10', 1, 0, 3.75, 24.96, 0.00),
	(13, 1, NULL, 18, '2013-11-14 16:17:29', '2013-11-15 06:14:46', 1, 0, 5.00, 37.00, 0.00),
	(14, 1, NULL, 15, '2013-11-14 16:28:20', '2013-11-15 06:12:46', 1, 0, 5.00, 20.00, 0.00),
	(15, 1, NULL, 20, '2013-11-14 16:29:00', '2013-11-15 06:15:41', 1, 0, 3.00, 20.00, 0.00),
	(16, 1, NULL, 1, '2013-11-14 16:30:46', '2013-11-15 06:16:40', 1, 0, 4.00, 20.00, 0.00),
	(17, 1, NULL, 19, '2013-11-14 16:46:26', '2013-11-15 06:15:08', 1, 0, 3.00, 20.00, 0.00),
	(18, 1, NULL, 14, '2013-11-14 16:46:48', '2013-11-15 06:13:53', 1, 0, 5.00, 38.00, 0.00),
	(19, 1, NULL, 6, '2013-11-14 16:48:00', '2013-11-15 06:17:03', 1, 0, 5.00, 35.00, 0.00),
	(20, 1, NULL, 6, '2013-11-14 16:50:13', '2013-11-15 06:17:19', 1, 0, 5.00, 35.00, 0.00),
	(21, 1, NULL, 2, '2013-11-14 16:54:17', '2013-11-15 06:09:42', 1, 0, 5.00, 36.00, 0.00),
	(22, 1, NULL, 11, '2013-11-14 16:57:22', '2013-11-15 06:11:12', 1, 0, 5.00, 30.00, 0.00),
	(23, 1, NULL, 1, '2013-11-15 04:03:44', '2013-11-15 05:57:03', 1, 0, 5.00, 28.00, 0.00),
	(24, 5, NULL, 9, '2013-11-15 06:31:55', '2013-11-15 07:36:48', 1, 0, 3.50, 16.00, 0.00),
	(25, 1, NULL, 17, '2013-11-15 09:14:33', '2013-11-15 09:15:26', 1, 0, 6.99, 38.00, 0.00),
	(26, 1, NULL, 19, '2013-11-15 09:15:48', '2013-11-15 09:45:48', 1, 0, 6.67, 36.00, 0.00),
	(27, 1, NULL, 21, '2013-11-15 09:19:56', '2013-11-15 09:20:57', 1, 0, 5.49, 30.00, 0.00),
	(28, 1, NULL, 1, '2013-11-15 09:21:12', '2013-11-15 09:54:53', 1, 0, 5.00, 30.00, 0.00),
	(29, 1, NULL, 21, '2013-11-15 09:23:17', '2013-11-15 10:13:15', 1, 0, 4.00, 35.00, 0.00),
	(30, 1, NULL, 4, '2013-11-15 09:24:42', '2013-11-15 10:12:01', 1, 0, 4.00, 35.00, 0.00),
	(31, 1, NULL, 5, '2013-11-15 09:26:12', '2013-11-15 10:12:55', 1, 0, 3.00, 28.00, 0.00),
	(32, 1, NULL, 4, '2013-11-15 09:27:50', '2013-11-15 10:12:16', 1, 0, 3.00, 28.00, 0.00),
	(33, 1, NULL, 13, '2013-11-15 09:31:40', '2013-11-15 10:10:30', 1, 0, 5.00, 36.00, 0.00),
	(34, 1, NULL, 6, '2013-11-15 09:33:22', '2013-11-15 10:10:41', 1, 0, 5.00, 30.00, 0.00),
	(35, 1, NULL, 20, '2013-11-15 09:34:07', '2013-11-15 10:13:06', 1, 0, 4.00, 35.00, 0.00),
	(36, 1, NULL, 18, '2013-11-15 09:36:21', '2013-11-15 10:12:27', 1, 0, 4.00, 35.00, 0.00),
	(37, 1, NULL, 12, '2013-11-15 09:37:07', '2013-11-15 10:10:00', 1, 0, 5.00, 35.00, 0.00),
	(38, 1, NULL, 3, '2013-11-15 09:37:31', '2013-11-15 10:11:00', 1, 0, 3.00, 33.00, 0.00),
	(39, 1, NULL, 8, '2013-11-15 09:38:19', '2013-11-15 10:10:12', 1, 0, 3.00, 13.00, 0.00),
	(40, 1, NULL, 3, '2013-11-15 09:38:50', '2013-11-15 10:11:12', 1, 0, 4.00, 35.00, 0.00),
	(41, 1, NULL, 13, '2013-11-15 09:39:12', '2013-11-15 10:11:21', 1, 0, 4.00, 35.00, 0.00),
	(42, 1, NULL, 16, '2013-11-15 09:41:22', '2013-11-15 10:11:37', 1, 0, 3.00, 13.00, 0.00),
	(43, 1, NULL, 15, '2013-11-15 09:42:12', '2013-11-15 10:11:46', 1, 0, 5.00, 35.00, 0.00),
	(44, 1, NULL, 17, '2013-11-15 09:43:10', '2013-11-15 10:12:34', 1, 0, 4.00, 35.00, 0.00),
	(45, 1, NULL, 10, '2013-11-15 09:43:36', '2013-11-15 10:09:38', 1, 0, 4.00, 30.00, 0.00),
	(46, 1, NULL, 8, '2013-11-16 00:47:21', '2013-11-16 00:47:41', 1, 0, 3.36, 34.00, 0.00),
	(47, 1, NULL, 1, '2013-11-19 02:10:00', '2013-11-19 16:23:55', 1, 0, 0.00, 0.00, 0.00),
	(48, 1, 4, 1, '2013-11-26 16:21:18', '2013-11-26 16:26:53', 1, 0, 3.30, 16.00, 0.00),
	(49, 1, NULL, 1, '2013-11-28 00:59:11', '2013-11-28 01:01:13', 1, 0, 5.18, 34.00, 0.00),
	(50, 1, NULL, 1, '2013-11-28 01:02:44', '2013-11-28 01:12:30', 1, 0, 1.00, 1.00, 0.00),
	(51, 1, NULL, 1, '2013-11-28 01:21:34', '2013-11-30 07:04:50', 1, 0, 6.00, 40.00, 0.00),
	(52, 1, NULL, 1, '2013-11-30 05:18:03', '2013-11-30 05:18:40', 1, 0, 3.55, 30.00, 0.00),
	(53, 1, NULL, 10, '2013-11-30 06:18:52', '2013-11-30 06:19:42', 1, 0, 2.00, 24.00, 0.00),
	(54, 1, NULL, 9, '2013-11-30 06:20:02', '2013-11-30 07:02:24', 1, 0, 3.97, 21.17, 0.00),
	(55, 1, NULL, 9, '2013-11-30 07:06:08', '2013-11-30 07:10:25', 1, 0, 1.25, 7.00, 0.00),
	(56, 1, NULL, 9, '2013-11-30 07:10:43', '2013-11-30 07:15:04', 1, 0, 1.30, 15.00, 0.00),
	(57, 1, NULL, 10, '2013-11-30 07:29:25', '2013-11-30 07:29:56', 1, 0, 2.95, 25.00, 0.00),
	(58, 1, NULL, 10, '2013-11-30 07:35:24', '2013-11-30 07:35:42', 1, 0, 5.99, 32.00, 0.00),
	(59, 1, NULL, 10, '2013-11-30 07:41:22', '2013-11-30 07:42:11', 1, 0, 0.00, 0.00, 0.00),
	(60, 1, NULL, 10, '2013-11-30 08:18:15', '2013-11-30 08:23:38', 1, 0, 1.42, 7.58, 0.00);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;


-- Dumping structure for view restms.oxwt
DROP VIEW IF EXISTS `oxwt`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `oxwt` (
	`id` INT(16) UNSIGNED NOT NULL,
	`c_id` INT(16) UNSIGNED NULL,
	`cp_id` INT(16) UNSIGNED NULL,
	`start_time` DATETIME NULL,
	`end_time` DATETIME NULL,
	`o_state` TINYINT(1) UNSIGNED NULL COMMENT 'Order State',
	`tips` DECIMAL(10,2) UNSIGNED NULL,
	`paid` DECIMAL(10,2) UNSIGNED NULL,
	`w_id` INT(16) UNSIGNED NULL,
	`t_id` INT(16) UNSIGNED NULL
) ENGINE=MyISAM;


-- Dumping structure for table restms.waiterxtable
DROP TABLE IF EXISTS `waiterxtable`;
CREATE TABLE IF NOT EXISTS `waiterxtable` (
  `id` int(16) unsigned NOT NULL AUTO_INCREMENT,
  `w_id` int(16) unsigned NOT NULL DEFAULT '0',
  `t_id` int(16) unsigned NOT NULL DEFAULT '0',
  `cw_state` tinyint(1) unsigned DEFAULT NULL COMMENT 'Call a Waiter State',
  `t_state` tinyint(1) unsigned DEFAULT NULL COMMENT 'Table State',
  PRIMARY KEY (`id`),
  KEY `w_id` (`w_id`),
  KEY `t_id` (`t_id`),
  KEY `cw_state` (`cw_state`),
  KEY `t_state` (`t_state`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- Dumping data for table restms.waiterxtable: ~21 rows (approximately)
DELETE FROM `waiterxtable`;
/*!40000 ALTER TABLE `waiterxtable` DISABLE KEYS */;
INSERT INTO `waiterxtable` (`id`, `w_id`, `t_id`, `cw_state`, `t_state`) VALUES
	(1, 3, 6, 0, 0),
	(2, 3, 7, 0, 0),
	(3, 3, 8, 0, 0),
	(4, 3, 9, 0, 0),
	(5, 3, 10, 0, 0),
	(6, 3, 11, 0, 0),
	(7, 3, 12, 0, 0),
	(8, 4, 13, 0, 0),
	(9, 4, 14, 0, 0),
	(10, 4, 15, 0, 1),
	(11, 4, 16, 0, 0),
	(12, 4, 17, 0, 0),
	(13, 4, 18, 0, 0),
	(14, 4, 19, 0, 0),
	(15, 5, 20, 0, 0),
	(16, 5, 21, 0, 0),
	(17, 5, 22, 0, 0),
	(18, 5, 23, 0, 0),
	(19, 5, 24, 0, 0),
	(20, 5, 25, 0, 0),
	(21, 5, 26, 0, 0);
/*!40000 ALTER TABLE `waiterxtable` ENABLE KEYS */;


-- Dumping structure for view restms.wt_view
DROP VIEW IF EXISTS `wt_view`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `wt_view` (
	`tw_id` INT(16) UNSIGNED NOT NULL,
	`w_id` INT(16) UNSIGNED NOT NULL,
	`t_name` VARCHAR(25) NULL COLLATE 'utf8_general_ci',
	`t_state` TINYINT(1) UNSIGNED NULL COMMENT 'Table State',
	`cw_state` TINYINT(1) UNSIGNED NULL COMMENT 'Call a Waiter State',
	`id` INT(16) UNSIGNED NULL,
	`c_id` INT(16) UNSIGNED NULL,
	`start_time` DATETIME NULL,
	`o_state` TINYINT(1) UNSIGNED NULL COMMENT 'Order State',
	`r_state` TINYINT(1) UNSIGNED NULL COMMENT 'Refill state',
	`tips` DECIMAL(10,2) UNSIGNED NULL,
	`paid` DECIMAL(10,2) UNSIGNED NULL
) ENGINE=MyISAM;


-- Dumping structure for view restms.wxtname
DROP VIEW IF EXISTS `wxtname`;
-- Creating temporary table to overcome VIEW dependency errors
CREATE TABLE `wxtname` (
	`id` INT(16) UNSIGNED NOT NULL,
	`w_name` VARCHAR(25) NULL COLLATE 'utf8_general_ci',
	`t_name` VARCHAR(25) NULL COLLATE 'utf8_general_ci',
	`cw_state` TINYINT(1) UNSIGNED NULL COMMENT 'Call a Waiter State',
	`t_state` TINYINT(1) UNSIGNED NULL COMMENT 'Table State',
	`w_id` INT(16) UNSIGNED NOT NULL,
	`t_id` INT(16) UNSIGNED NOT NULL
) ENGINE=MyISAM;


-- Dumping structure for view restms.a_orders
DROP VIEW IF EXISTS `a_orders`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `a_orders`;
CREATE ALGORITHM=UNDEFINED DEFINER=`restms`@`%` SQL SECURITY DEFINER VIEW `a_orders` AS select `orders`.`id` AS `id`,`orders`.`c_id` AS `c_id`,`orders`.`cp_id` AS `cp_id`,`orders`.`tw_id` AS `tw_id`,`orders`.`start_time` AS `start_time`,`orders`.`end_time` AS `end_time`,`orders`.`o_state` AS `o_state`,`orders`.`r_state` AS `r_state`,`orders`.`tips` AS `tips`,`orders`.`paid` AS `paid`,`orders`.`total` AS `total` from `orders` where (`orders`.`o_state` = 0);


-- Dumping structure for view restms.k_view
DROP VIEW IF EXISTS `k_view`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `k_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`restms`@`%` SQL SECURITY DEFINER VIEW `k_view` AS select `oi`.`id` AS `id`,`oi`.`o_id` AS `o_id`,`oi`.`c_state` AS `c_state`,`o`.`start_time` AS `start_time`,`wxtname`.`w_name` AS `w_name`,`wxtname`.`t_name` AS `t_name`,`oi`.`name` AS `name`,`oi`.`custom` AS `custom` from ((`oimi` `oi` left join `orders` `o` on((`oi`.`o_id` = `o`.`id`))) left join `wxtname` on((`o`.`tw_id` = `wxtname`.`id`))) where (`oi`.`c_state` = 0);


-- Dumping structure for view restms.oimi
DROP VIEW IF EXISTS `oimi`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `oimi`;
CREATE ALGORITHM=UNDEFINED DEFINER=`restms`@`%` SQL SECURITY DEFINER VIEW `oimi` AS select `ordereditem`.`id` AS `id`,`ordereditem`.`o_id` AS `o_id`,`ordereditem`.`c_state` AS `c_state`,`ordereditem`.`p_state` AS `p_state`,`menuitem`.`id` AS `mi_id`,`menuitem`.`name` AS `name`,`ordereditem`.`custom` AS `custom`,`menuitem`.`price` AS `price` from (`ordereditem` left join `menuitem` on((`ordereditem`.`mi_id` = `menuitem`.`id`)));


-- Dumping structure for view restms.oxwt
DROP VIEW IF EXISTS `oxwt`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `oxwt`;
CREATE ALGORITHM=UNDEFINED DEFINER=`restms`@`%` SQL SECURITY DEFINER VIEW `oxwt` AS select `o`.`id` AS `id`,`o`.`c_id` AS `c_id`,`o`.`cp_id` AS `cp_id`,`o`.`start_time` AS `start_time`,`o`.`end_time` AS `end_time`,`o`.`o_state` AS `o_state`,`o`.`tips` AS `tips`,`o`.`paid` AS `paid`,`wt`.`w_id` AS `w_id`,`wt`.`t_id` AS `t_id` from (`orders` `o` left join `waiterxtable` `wt` on((`o`.`tw_id` = `wt`.`id`)));


-- Dumping structure for view restms.wt_view
DROP VIEW IF EXISTS `wt_view`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `wt_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`restms`@`%` SQL SECURITY DEFINER VIEW `wt_view` AS select `wxt`.`id` AS `tw_id`,`wxt`.`w_id` AS `w_id`,`wxt`.`t_name` AS `t_name`,`wxt`.`t_state` AS `t_state`,`wxt`.`cw_state` AS `cw_state`,`o`.`id` AS `id`,`o`.`c_id` AS `c_id`,`o`.`start_time` AS `start_time`,`o`.`o_state` AS `o_state`,`o`.`r_state` AS `r_state`,`o`.`tips` AS `tips`,`o`.`paid` AS `paid` from (`wxtname` `wxt` left join `a_orders` `o` on((`o`.`tw_id` = `wxt`.`id`)));


-- Dumping structure for view restms.wxtname
DROP VIEW IF EXISTS `wxtname`;
-- Removing temporary table and create final VIEW structure
DROP TABLE IF EXISTS `wxtname`;
CREATE ALGORITHM=UNDEFINED DEFINER=`restms`@`%` SQL SECURITY DEFINER VIEW `wxtname` AS select `wt`.`id` AS `id`,`w`.`username` AS `w_name`,`t`.`username` AS `t_name`,`wt`.`cw_state` AS `cw_state`,`wt`.`t_state` AS `t_state`,`wt`.`w_id` AS `w_id`,`wt`.`t_id` AS `t_id` from ((`waiterxtable` `wt` left join `access` `t` on((`wt`.`t_id` = `t`.`id`))) left join `access` `w` on((`wt`.`w_id` = `w`.`id`)));
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
