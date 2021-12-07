-- Privilege FILE for root 
GRANT FILE ON *.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- *****************
-- * ebay Database *
-- *****************

-- Create and use database
DROP DATABASE IF EXISTS ebay;
CREATE DATABASE ebay DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
USE ebay;

-- Create tables
CREATE TABLE Utilisateur (
	idU int NOT NULL AUTO_INCREMENT,
	nomU varchar(30),
	prenomU varchar(30),
	mailU varchar(80),
	pseudoU varchar(50),
	motDePasseU varchar(50),
	photoU varchar(255),
	geolocalisationLatU decimal(10,8),
	geolocalisationLongU decimal(10,8),
	adresseU varchar(255),
	PRIMARY KEY (idU),
	UNIQUE KEY mail (mailU),
	UNIQUE KEY pseudo (pseudoU)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
DESC Utilisateur;

CREATE TABLE Bien (
	idB int NOT NULL AUTO_INCREMENT,
	nomB varchar(60),
	descriptionB longtext,
	prixPlancherB float,
	dateCreationB datetime,
	photoB varchar(255),
	etatB varchar(255),
	UTILISATEURidU int,
	PRIMARY KEY (idB),
	CONSTRAINT fk_bien_utilisateur FOREIGN KEY (UTILISATEURidU) REFERENCES UTILISATEUR (idU)
)ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
DESC Bien;

CREATE TABLE Encherir (
	UTILISATEURidU int,
	BIENidB int,
	prix float,
	PRIMARY KEY (UTILISATEURidU, BIENidB, prix),
	CONSTRAINT fk_encherir_utilisateur FOREIGN KEY (UTILISATEURidU) REFERENCES UTILISATEUR (idU),
	CONSTRAINT fk_encherir_bien FOREIGN KEY (BIENidB) REFERENCES BIEN (idB)
)ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
DESC Encherir;

CREATE TABLE Livraison (
	BIENidB int,
	UTILISATEURidU int,
	dateL datetime,
	PRIMARY KEY (BIENidB),
	CONSTRAINT fk_livraison_utilisateur FOREIGN KEY (UTILISATEURidU) REFERENCES UTILISATEUR (idU),
	CONSTRAINT fk_livraison_bien FOREIGN KEY (BIENidB) REFERENCES BIEN (idB)
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
DESC Livraison;


-- Display all tables created in the database
SHOW TABLES;


-- ********
-- * DATA *
-- ******** 

-- Utilisateur
INSERT INTO Utilisateur (nomU, prenomU, mailU, pseudoU, motDePasseU, photoU, geolocalisationLatU, geolocalisationLongU, adresseU) VALUES ('Dupon', 'Toto', 'dupon.toto@mail.com', 'Toto31400', 'root', 'uploads\\avatar.jpg', 48.8621580582768, 2.294842784851807, 'Paris, France');
INSERT INTO Utilisateur (nomU, prenomU, mailU, pseudoU, motDePasseU, photoU, geolocalisationLatU, geolocalisationLongU, adresseU) VALUES ('Porta', 'Alain', 'porta.alain@mail.com', 'Alain', 'root', 'uploads\\avatar2.jpg', 43.56221840, 1.46993010, '326 Allée Théodore Despeyrous, Toulouse, France');
SELECT * FROM Utilisateur;

-- Bien
INSERT INTO Bien (nomB, descriptionB, prixPlancherB, dateCreationB, photoB, etatB, UTILISATEURidU) VALUES ('Iphone','Un téléphone apple',700, date_format(NOW() - 10000, '%Y-%m-%d %H:%i:%s'),'uploads\\iphone.jpg',"vendu",2);
INSERT INTO Bien (nomB, descriptionB, prixPlancherB, dateCreationB, photoB, etatB, UTILISATEURidU) VALUES ('Table','Une table de compétition',500.67, date_format(NOW() - 10000, '%Y-%m-%d %H:%i:%s'),'uploads\\table.jpg',"livre",2);
SELECT * FROM Bien;



-- Enchere 
-- Toto a acheté l'iphone d'Alain
INSERT INTO Encherir VALUES (1,2,710);
-- Toto a acheté la table d'Alain
INSERT INTO Encherir VALUES (1,3,512.14);
SELECT * FROM Encherir;


-- Livraison
-- Toto a recu la table d'Alain
INSERT INTO Livraison VALUES (3,1,NOW());
SELECT * FROM Livraison; 