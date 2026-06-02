-- Database Migration Script
-- Run this on your MySQL database to align it with the updated application code.

USE sistem_asrama;

-- 1. Rename 'jenis_kelamin' to 'gender' in mahasiswa table if it exists
ALTER TABLE mahasiswa CHANGE COLUMN jenis_kelamin gender ENUM('Laki-laki', 'Perempuan') NOT NULL;

-- 2. Add 'foto_profile' column to mahasiswa table if it doesn't exist
ALTER TABLE mahasiswa ADD COLUMN foto_profile VARCHAR(255) DEFAULT NULL;

-- 3. Create 'pembayaran' table which was missing from the initial schema
CREATE TABLE IF NOT EXISTS pembayaran (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pendaftaran_id INT NOT NULL,
  bukti_pembayaran VARCHAR(255) NOT NULL,
  status_pembayaran ENUM('Menunggu', 'Lunas', 'Ditolak') NOT NULL DEFAULT 'Menunggu',
  tanggal_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (pendaftaran_id) REFERENCES pendaftaran(id) ON DELETE CASCADE
) ENGINE=InnoDB;
