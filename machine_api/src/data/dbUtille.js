import fs from 'node:fs';
import path from 'node:path';

function loadDB() {
    try {
        const raw = fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8');
        return JSON.parse(raw || '{}');
    } catch (e) {
        return {};
    }
}

module.exports = { loadDB };
