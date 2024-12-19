const db = require('../config/db');

// Create - Yeni bir kayıt ekleme
const createRecord = async (tableName, data) => {
  const placeholders = Object.keys(data).map(() => '?').join(',');
  const query = `INSERT INTO ${tableName} (${Object.keys(data).join(',')}) VALUES (${placeholders})`;

  const [result] = await db.execute(query, Object.values(data));
  return result;
};

// Read - Belirli bir kayıt okuma
const readRecord = async (tableName, username) => {
  const query = `SELECT * FROM ${tableName} WHERE username = ?`;
  const [rows] = await db.execute(query, [username]);
  return rows[0];
};

// Read All - Tüm kayıtları okuma
const readAllRecords = async (tableName) => {
  const query = `SELECT * FROM ${tableName}`;
  const [rows] = await db.execute(query);
  return rows;
};

// // Update - Bir kaydı güncelleme
// const updateRecord = async (tableName, username, password) => {
//   const updates = Object.keys(data).map((key) => `${key} = ?`).join(',');
//   const query = `UPDATE ${tableName} SET ${updates} WHERE username = ?`;

//   const [result] = await db.execute(query, [...Object.values(data), username]);
//   return result;
// };


// Update - Bir kaydı güncelleme
const updateRecord = async (tableName, username, password) => {
  const query = `UPDATE ${tableName} SET password = "${password}" WHERE username = "${username}"`;
  console.log(query)

  const [result] = await db.execute(query, [username]);
  return result;
};

// Delete - Bir kaydı silme
const deleteRecord = async (tableName, id) => {
  const query = `DELETE FROM ${tableName} WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result;
};

module.exports = {
  createRecord,
  readRecord,
  readAllRecords,
  updateRecord,
  deleteRecord,
};
