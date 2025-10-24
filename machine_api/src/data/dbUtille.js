const fs = require('node:fs');
const path = require('node:path');

exports.loadDB = () => {
    try {
        const raw = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
        return JSON.parse(raw || '{}');
    } catch (e) {
        return {};
    }
}

exports.writeDB = (db) => {
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(db, null, 2), 'utf8');
}
