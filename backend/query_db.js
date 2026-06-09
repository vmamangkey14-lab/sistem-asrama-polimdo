require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('./config/db');

async function run() {
  try {
    const [rows] = await db.query("SELECT * FROM mahasiswa WHERE id = 6");
    const user = rows[0];
    const token = jwt.sign(
      { id: user.id, role: "mahasiswa" },
      process.env.JWT_SECRET || "asrama_super_secret",
      { expiresIn: "1d" }
    );
    
    console.log("=== COPY AND RUN THIS IN BROWSER CONSOLE ===");
    console.log(`localStorage.setItem('mahasiswaToken', '${token}');`);
    console.log(`localStorage.setItem('mahasiswaData', JSON.stringify(${JSON.stringify(user)}));`);
    console.log(`window.location.href = '/dashboard';`);
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}
run();
