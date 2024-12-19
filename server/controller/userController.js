const express = require('express');
const { createRecord, readRecord, readAllRecords, updateRecord, deleteRecord } = require('./crud.js');

const app = express();
app.use(express.json());

// Create - Yeni kayıt ekle
app.post('/users', async (req, res) => {
    try {
        const result = await createRecord('users', req.body);
        res.status(201).json({ success: true, id: result.insertId });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Read - Belirli bir kayıt oku
app.get('/users/:id', async (req, res) => {
    try {
        const user = await readRecord('users', req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Read All - Tüm kayıtları oku
app.get('/users', async (req, res) => {
    try {
        const users = await readAllRecords('users');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Update - Bir kaydı güncelle
app.put('/users/:id', async (req, res) => {
    try {
        const result = await updateRecord('users', req.params.id, req.body);
        res.status(200).json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Delete - Bir kaydı sil
app.delete('/users/:id', async (req, res) => {
    try {
        const result = await deleteRecord('users', req.params.id);
        res.status(200).json({ success: true, affectedRows: result.affectedRows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
