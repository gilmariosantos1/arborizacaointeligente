-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema arborizacao_inteligente
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema arborizacao_inteligente
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `arborizacao_inteligente` DEFAULT CHARACTER SET utf8 ;
USE `arborizacao_inteligente` ;

-- -----------------------------------------------------
-- Table `arborizacao_inteligente`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arborizacao_inteligente`.`usuario` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `cep` VARCHAR(8) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `arborizacao_inteligente`.`contato`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arborizacao_inteligente`.`contato` (
  `id_contato` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `assunto` VARCHAR(45) NOT NULL,
  `mensagem` TEXT(300) NOT NULL,
  PRIMARY KEY (`id_contato`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `arborizacao_inteligente`.`municipalidade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arborizacao_inteligente`.`municipalidade` (
  `id_municipalidade` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_municipalidade`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `arborizacao_inteligente`.`alerta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `arborizacao_inteligente`.`alerta` (
  `id_upload` INT NOT NULL AUTO_INCREMENT,
  `assunto` VARCHAR(45) NOT NULL,
  `descricao` TEXT(300) NOT NULL,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `imagem_endereco` VARCHAR(255) NOT NULL,
  `data_alerta` DATETIME NOT NULL,
  `usuario_id_usuario` INT NOT NULL,
  `municipalidade_id_municipalidade` INT NOT NULL,
  PRIMARY KEY (`id_upload`),
  INDEX `fk_alerta_usuario_idx` (`usuario_id_usuario` ASC) VISIBLE,
  INDEX `fk_alerta_municipalidade1_idx` (`municipalidade_id_municipalidade` ASC) VISIBLE,
  CONSTRAINT `fk_alerta_usuario`
    FOREIGN KEY (`usuario_id_usuario`)
    REFERENCES `arborizacao_inteligente`.`usuario` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_alerta_municipalidade1`
    FOREIGN KEY (`municipalidade_id_municipalidade`)
    REFERENCES `arborizacao_inteligente`.`municipalidade` (`id_municipalidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
