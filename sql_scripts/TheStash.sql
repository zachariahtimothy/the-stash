-- phpMyAdmin SQL Dump
-- version 3.3.9.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 09, 2012 at 06:34 AM
-- Server version: 5.5.9
-- PHP Version: 5.3.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `TheStash`
--

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` VALUES(1, 'Mortgages/Rent');

-- --------------------------------------------------------

--
-- Table structure for table `ExpenseDates`
--

CREATE TABLE `ExpenseDates` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `expenseId` tinyint(4) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `expenseId` (`expenseId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `ExpenseDates`
--


-- --------------------------------------------------------

--
-- Table structure for table `Expenses`
--

CREATE TABLE `Expenses` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `categoryId` tinyint(4) NOT NULL,
  `userId` tinyint(4) NOT NULL,
  `frequencyId` tinyint(4) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `note` text,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `userId` (`userId`),
  KEY `frequencyId` (`frequencyId`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Expenses`
--

INSERT INTO `Expenses` VALUES(1, 1, 1, 1, 1400.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Frequencies`
--

CREATE TABLE `Frequencies` (
  `Id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `Frequencies`
--

INSERT INTO `Frequencies` VALUES(1, 'Weekly');
INSERT INTO `Frequencies` VALUES(2, 'Monthly');
INSERT INTO `Frequencies` VALUES(3, 'Bi-Monthly');

-- --------------------------------------------------------

--
-- Table structure for table `IncomeDates`
--

CREATE TABLE `IncomeDates` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `incomeId` tinyint(4) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `incomeId` (`incomeId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `IncomeDates`
--


-- --------------------------------------------------------

--
-- Table structure for table `Incomes`
--

CREATE TABLE `Incomes` (
  `id` tinyint(4) NOT NULL AUTO_INCREMENT,
  `userId` tinyint(4) NOT NULL,
  `categoryId` tinyint(4) DEFAULT NULL,
  `frequencyId` tinyint(4) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `note` text,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `frequencyId` (`frequencyId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

--
-- Dumping data for table `Incomes`
--


-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` tinyint(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(80) NOT NULL DEFAULT '',
  `email` varchar(250) NOT NULL DEFAULT '',
  `username` varchar(100) NOT NULL DEFAULT '',
  `facebook_id` int(11) DEFAULT NULL,
  `type` varchar(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` VALUES(1, 'Zach', '684c00d1f04f45c910252ec6a06ed692', 'zachariahtimothy@gmail.com', 'zachariaht', NULL, 'user');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ExpenseDates`
--
ALTER TABLE `ExpenseDates`
  ADD CONSTRAINT `ExpenseDates_ibfk_1` FOREIGN KEY (`expenseId`) REFERENCES `Categories` (`id`);

--
-- Constraints for table `Expenses`
--
ALTER TABLE `Expenses`
  ADD CONSTRAINT `Expenses_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`),
  ADD CONSTRAINT `Expenses_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `Expenses_ibfk_3` FOREIGN KEY (`frequencyId`) REFERENCES `Frequencies` (`Id`);

--
-- Constraints for table `IncomeDates`
--
ALTER TABLE `IncomeDates`
  ADD CONSTRAINT `IncomeDates_ibfk_1` FOREIGN KEY (`incomeId`) REFERENCES `Incomes` (`id`);

--
-- Constraints for table `Incomes`
--
ALTER TABLE `Incomes`
  ADD CONSTRAINT `Incomes_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `Incomes_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`),
  ADD CONSTRAINT `Incomes_ibfk_2` FOREIGN KEY (`frequencyId`) REFERENCES `Frequencies` (`Id`);
