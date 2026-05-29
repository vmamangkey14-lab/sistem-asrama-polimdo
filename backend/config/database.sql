-- ========================================================
-- SKEMA DATABASE: SISTEM INFORMASI ASRAMA MODERN
-- ========================================================

CREATE DATABASE IF NOT EXISTS sistem_asrama;
USE sistem_asrama;

-- 1. Tabel Admin
CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tabel Mahasiswa
CREATE TABLE IF NOT EXISTS mahasiswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  nim VARCHAR(50) NOT NULL UNIQUE,
  jurusan VARCHAR(100) NOT NULL,
  jenis_kelamin ENUM('Laki-laki', 'Perempuan') NOT NULL,
  no_hp VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 3. Tabel Kamar
CREATE TABLE IF NOT EXISTS kamar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nomor_kamar VARCHAR(50) NOT NULL,
  jenis_asrama ENUM('Asrama Putra', 'Asrama Putri') NOT NULL,
  kapasitas INT NOT NULL DEFAULT 4,
  terisi INT NOT NULL DEFAULT 0,
  status ENUM('Tersedia', 'Penuh') NOT NULL DEFAULT 'Tersedia',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Tabel Pendaftaran
CREATE TABLE IF NOT EXISTS pendaftaran (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mahasiswa_id INT NOT NULL,
  kamar_id INT DEFAULT NULL,
  status_pendaftaran ENUM('Menunggu Verifikasi', 'Terverifikasi', 'Sudah Ditempatkan', 'Ditolak') NOT NULL DEFAULT 'Menunggu Verifikasi',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mahasiswa_id) REFERENCES mahasiswa(id) ON DELETE CASCADE,
  FOREIGN KEY (kamar_id) REFERENCES kamar(id) ON DELETE SET NULL
) ENGINE=InnoDB;
