-- MySQL Script generated by MySQL Workbench
-- Tue Jun 26 11:16:41 2018
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema homeinventorydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `basementfinderdb` ;

-- -----------------------------------------------------
-- Schema homeinventorydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `basementfinderdb` DEFAULT CHARACTER SET latin1 ;
USE `basementfinderdb` ;

-- -----------------------------------------------------
-- Table `homeinventorydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `basementfinderdb`.`users` (
  `Username` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(80) NOT NULL,
  `Email` VARCHAR(70) NOT NULL,
  `FirstName` VARCHAR(70) NOT NULL,
  `LastName` VARCHAR(70) NOT NULL,
  `Active` BIT NOT NULL,
  `IsAdmin` BIT NOT NULL,
  `resetpasswordUUID` VARCHAR(50),
  `activateaccountUUID` VARCHAR(50),
  `passwordSalt` VARCHAR(150),
  `base64Image` VARCHAR(8000),

  PRIMARY KEY (`Username`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `basementfinderdb`.`basements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `basementfinderdb`.`basements` (
  `Username` VARCHAR(50) NOT NULL,
  `placeId` VARCHAR(250) NOT NULL,
   `latitude` VARCHAR(20) NOT NULL,
`longitude` VARCHAR(20) NOT NULL,
  `price` DOUBLE NOT NULL,
  `isSharing` BIT NOT NULL,
  `description` VARCHAR(500) NOT NULL,
 `country` VARCHAR(20) NOT NULL,
`state` VARCHAR(60) NOT NULL,
`city` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`placeId`),
CONSTRAINT `fk_basements`
FOREIGN KEY(`Username`)
REFERENCES `basementfinderdb`.`users` (`Username`)
ON DELETE NO ACTION
ON UPDATE NO ACTION
)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `basementfinderdb`.`basementImages`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `basementfinderdb`.`basementImages` (
  `imageId` INT(11) NOT NULL AUTO_INCREMENT,
  `placeId` VARCHAR(250) NOT NULL,
  `image` BLOB NOT NULL,
  `imageType` VARCHAR(50) NOT NULL,
    PRIMARY KEY (`imageId`)
)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `basementfinderdb`.`features`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `basementfinderdb`.`features` (
  `featureName` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`featureName`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `basementfinderdb`.`basementFeatures`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `basementfinderdb`.`basementFeatures` (
  `placeId` VARCHAR(250),
  `featureName` VARCHAR(40) NOT NULL,
  `featureValue` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`placeId`),
CONSTRAINT `fk_basementFeatures_featureName_features`
FOREIGN KEY(`featureName`)
REFERENCES `basementfinderdb`.`features` (`featureName`)
ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `basementfinderdb`.`amenities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `basementfinderdb`.`amenities` (
  `amenity` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`amenity`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `basementfinderdb`.`basementAmenities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `basementfinderdb`.`basementAmenities` (
  `placeId` VARCHAR(250),
  `amenity` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`placeId`),
CONSTRAINT `fk_basementAmenities_amenity`
FOREIGN KEY(`amenity`)
REFERENCES `basementfinderdb`.`amenities` (`amenity`)
ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `amenities` (`amenity`) VALUES ('Wifi');
INSERT INTO `amenities` (`amenity`) VALUES ('Cable TV');
INSERT INTO `amenities` (`amenity`) VALUES ('Free Parking on Premises');
INSERT INTO `amenities` (`amenity`) VALUES ('Heatings');
INSERT INTO `amenities` (`amenity`) VALUES ('Fire Extinguisher');
INSERT INTO `amenities` (`amenity`) VALUES ('First Aid Kit');
INSERT INTO `amenities` (`amenity`) VALUES ('Laundry');

INSERT INTO `features` (`featureName`) VALUES ('Bedroom');
INSERT INTO `features` (`featureName`) VALUES ('Kitchen');
INSERT INTO `features` (`featureName`) VALUES ('Bath ');
INSERT INTO `features` (`featureName`) VALUES ('Living Room');
INSERT INTO `features` (`featureName`) VALUES ('Bed');


INSERT INTO `users` (`Username`,`Password`,`Email`,`FirstName`,`LastName`,`Active`,`IsAdmin`,`resetpasswordUUID`,`activateaccountUUID`,`passwordSalt`,`base64Image`) VALUES ('admin','9539662b295b2588cd03e7612c04d350631a1246cbc3c6e41dfbde49aa42cb85','admin@gmail.com','Admin','Admin',1,1,NULL,NULL,"Qw3bxot7gNJzaqomtAJ21GPYHWbCR46ndGlslMuHyt0=",NULL);
INSERT INTO `users` (`Username`,`Password`,`Email`,`FirstName`,`LastName`,`Active`,`IsAdmin`,`resetpasswordUUID`,`activateaccountUUID`,`passwordSalt`,`base64Image`) VALUES ('admin2','45757ff31c99052cd9881ba4e671f98b61c7cf3b89e1890e4e9149996bd69f00','admin2@gmail.com','Admin2','Admin2',0,1,NULL,NULL,"UIwrMslybWErXJ7BmqKrKRYNA4oOlmvx3sHMpnEoVXA==",NULL);
INSERT INTO `users` (`Username`,`Password`,`Email`,`FirstName`,`LastName`,`Active`,`IsAdmin`,`resetpasswordUUID`,`activateaccountUUID`,`passwordSalt`,`base64Image`) VALUES ('anne','269070e566b2de97f286059522b4da90ef758eec836bf3cf412609bdf3b7756b','anne@gmail.com','Anne','Annerson',1,0,NULL,NULL,"ZyyrxQIxisK4Icq7LXP4YKDaksfYwhwHS9UE/aD4wrU==",NULL);
INSERT INTO `users` (`Username`,`Password`,`Email`,`FirstName`,`LastName`,`Active`,`IsAdmin`,`resetpasswordUUID`,`activateaccountUUID`,`passwordSalt`,`base64Image`) VALUES ('armaan','944e8214f26f6d357141bf6da638dd9205fef961aeae24cc1dd8987c1dac537c','armaansinghkl@gmail.com','Barb','Barber',0,0,NULL,NULL,"NBhynqzJPA19N7wVmIHrp4vSTA8ba6eapjQUIggw/v0==",NULL);

INSERT INTO `basements`  VALUES ('anne','ChIJefIHU_FhcVMRTZByKYZHtQI','51.1592051','-113.9422982',500.0,1,'Spacious room for rent in cornerstone. The room is fully furnished with Queen bed, side tables and a large closet.\nThere are 3 people who live in the house right now. We are in our middle 30''s. Husband, wife, and sister. We are very quiet, respectful, working people who do not party or smoke.\nHouse is fully furnished. The kitchen and living areas are shared.  All utilities, internet, washer, and dryer are included in rent.\nClose to grocery store, restaurants, park, bike paths, etc.\n','Canada','Alberta','Calgary');
INSERT INTO `basements`  VALUES ('anne','ChIJhdtbly1hcVMR1ZaO9v6HzoI','51.1629797','-113.9421219',700.0,0,'Two Bedroom Basement available for rent in Cornerstone NE, Separate entrance, separate laundry, close to bus stop, close to schools, close to Genesis Centre.\nRent $750 including utility and internet available asap.\nGood for small family or couple.','Canada','Alberta','Calgary');
INSERT INTO `basements`  VALUES ('anne','Ei45MDAgQ29ybmVyc3RvbmUgU3QgTkUsIENhbGdhcnksIEFCIFQzTiwgQ2FuYWRhIjESLwoUChIJK2lOPYBhcVMRmQlDGBV5xEMQhAcqFAoSCXM6foKBYXFTEf0z9gzTq795','51.1601106','-113.9424535',750.0,1,'VERY SPACIOUS BRAND NEW BASEMENT\nAVAILABLE FROM JANUARY 5TH\n2 FULL BEDROOMS WITH BIG CLOSETS\nHUGE KITCHEN\nBIG LIVING ROOM\nINTERNET INCLUDED\nSEPARATE LAUNDRY (Washer + Dryer)\nSEPARATE HEATING SYSTEM\nABSOLUTELY NO SMOKING & NO PETS\n\n$1000 INITIAL DEPOSIT\nRENT: $950 + 40% UTILITIES\n\nPLAZA WITHIN 2 BLOCK RADIUS;\n\nPUNJABI CHULLA\nPUNJABI CHULHA GROCERY STORE\nCAL CITY PIZZA\nA DOCTOR’S CLINIC\nA PHARMACY\nPHYSIOTHERAPIST\nLIQUOR STORE\nMEAT SHOP\nALONG WITH MANY MORE TO COME','Canada','Alberta','Calgary');
INSERT INTO `basements`  VALUES ('anne','Ei8xMDAwIENvcm5lcnN0b25lIFN0IE5FLCBDYWxnYXJ5LCBBQiBUM04sIENhbmFkYSIxEi8KFAoSCStpTj2AYXFTEZkJQxgVecRDEOgHKhQKEglzOn6CgWFxUxH9M_YM06u_eQ','51.16039','-113.9424579',1000.0,0,'1. One huge bedroom in the main floor close to downtown\n2. Brand new renovated, Renting one big bedroom in the main floor rent $500/monthly, deposit $ 500, basement $ 470, DD$470, Includes internet, utilities, shared kitchen, washroom, and washer/dryer.\n3. Bus#301, # 300, #3 in front of the house, go downtown only ten minutes by bus go everywhere is convenient. Parking is in the backyard.\n4. Walking distance from school, superstore, swimming pool, bowling, gym, church, and shopping mall','Canada','Alberta','Calgary');
