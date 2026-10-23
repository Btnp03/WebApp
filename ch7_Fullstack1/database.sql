-- database.sql
-- คำสั่งสำหรับสร้างฐานข้อมูลและตารางสำหรับ Menu และ Type
-- อ้างอิงชื่อฐานข้อมูล myshop ตามสไลด์หน้า 27

CREATE DATABASE IF NOT EXISTS `myshop` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `myshop`;

-- 1. สร้างตาราง type (ประเภทอาหาร)
CREATE TABLE IF NOT EXISTS `type` (
  `typeId` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. สร้างตาราง menu (รายการอาหาร)
-- เชื่อมโยง typeId ไปยังตาราง type (Foreign Key)
CREATE TABLE IF NOT EXISTS `menu` (
  `menuId` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `isBestSeller` BOOLEAN NOT NULL DEFAULT 0,
  `typeId` INT NOT NULL,
  CONSTRAINT `fk_menu_type` FOREIGN KEY (`typeId`) REFERENCES `type` (`typeId`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ข้อมูลเริ่มต้นสำหรับการทดสอบ (Initial Sample Data)
INSERT INTO `type` (`typeId`, `name`) VALUES
(1, 'Bakery'),
(2, 'Beverage'),
(3, 'Dessert')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

INSERT INTO `menu` (`menuId`, `name`, `price`, `isBestSeller`, `typeId`) VALUES
(1, 'cake', 35.00, 1, 1),
(2, 'bread', 25.00, 0, 1),
(3, 'milk', 15.00, 1, 2),
(4, 'donut', 45.00, 0, 3),
(5, 'cookie', 55.00, 1, 1)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `price`=VALUES(`price`), `isBestSeller`=VALUES(`isBestSeller`), `typeId`=VALUES(`typeId`);
