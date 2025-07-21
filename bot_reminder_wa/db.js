import mysql from "mysql2/promise";

// Ganti dengan konfigurasi MySQL 
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

export async function getDB() {
    return pool;
}

export async function getDueTasks() {
    const db = await getDB();
    const [rows] = await db.query(`
        SELECT * FROM tasks 
        WHERE status = 'pending' AND deadline >= NOW()
    `);
    // console.log("NOW():", new Date()); // Waktu saat ini
    // console.log("Rows (Data):", rows); // Lihat data yang dikembalikan
    return rows;
}

export async function getAllTasks() {
    const db = await getDB();
    const [rows] = await db.query(
        `SELECT * FROM tasks WHERE status = 'pending' ORDER BY deadline ASC`
    );
    return rows;
}

export async function addTask(title, deadline) {
    const db = await getDB();
    const [result] = await db.query(
        `INSERT INTO tasks (title, deadline) VALUES (?, ?)`,
        [title, deadline]
    );
    return result;
}

export async function markAsDone(id) {
    const db = await getDB();
    await db.query(`UPDATE tasks SET status = 'Done' WHERE id = ?`, [id]);
}

export async function deleteTask(id) {
    const db = await getDB();
    await db.query(`DELETE FROM tasks WHERE id = ?`, [id]);
}
