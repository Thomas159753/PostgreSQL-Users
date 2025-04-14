const pool = require('./pool');

async function getAllUsersnames() {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
}

async function insertUsername(username) {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function searchByUsername(username) {
    const { rows } = await pool.query("SELECT * FROM usernames WHERE username ILIKE $1", [`%${username}%`]);
    return rows;
}

async function deleteUsername(id) {
    await pool.query("DELETE FROM usernames WHERE id = $1", [id]);
}

module.exports = {
    getAllUsersnames,
    insertUsername,
    searchByUsername,
    deleteUsername,
}