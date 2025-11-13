const fs = require('node:fs');
const path = require('node:path');

exports.writeDB = (db) => {
    fs.writeFileSync(path.join(__dirname, '../data/db.json'), JSON.stringify(db, null, 2), 'utf8');
}

exports.loadDB = () => {
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/db.json'), 'utf8') || '{}');
    return db;
}

exports.findUserById = (id) => {
    const db = exports.loadDB();
    return (db.users || []).find(u => u.id === id);
}

exports.findUserByUsername = (username) => {
    const db = exports.loadDB();
    return (db.users || []).find(u => u.username === username);
}

exports.addUser = (user) => {
    const db = exports.loadDB();
    db.users = db.users || [];
    db.users.push(user);
    exports.writeDB(db);
}

exports.updateUser = (id, updates) => {
    const db = exports.loadDB();
    const userIndex = (db.users || []).findIndex(u => u.id === id); 
    if (userIndex === -1) return null;
    Object.assign(db.users[userIndex], updates);
    exports.writeDB(db);
    return db.users[userIndex];
}

exports.deleteUser = (id) => {
    const db = exports.loadDB();
    db.users = (db.users || []).filter(u => u.id !== id);
    exports.writeDB(db);
}   

exports.findMachineById = (id) => {
    const db = exports.loadDB();
    return (db.machines || []).find(m => m.id === id);
}

exports.addMachine = (machine) => {
    const db = exports.loadDB();
    db.machines = db.machines || [];
    db.machines.push(machine);
    exports.writeDB(db);
}

exports.deleteMachine = (id) => {
    const db = exports.loadDB();
    db.machines = (db.machines || []).filter(m => m.id !== id);
    exports.writeDB(db);
}

exports.updateMachine = (id, updates) => {
    const db = exports.loadDB();
    const machineIndex = (db.machines || []).findIndex(m => m.id === id); 
    if (machineIndex === -1) return null;  
    Object.assign(db.machines[machineIndex], updates);
    exports.writeDB(db);
    return db.machines[machineIndex];
}
