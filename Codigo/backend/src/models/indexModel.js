import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import { fileURLToPath } from 'url';
import sequelize from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

// Carregar dinamicamente os modelos
const modelDirs = [__dirname];

for (const dir of modelDirs) {
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter(file => {
            return (
                file.indexOf('.') !== 0 &&
                file !== path.basename(__filename) &&
                file.slice(-3) === '.js' &&
                file !== 'index.js'
            );
        });

        for (const file of files) {
            const modelPath = path.join(dir, file);
            const modelModule = await import(`file://${modelPath}`);
            const modelFunction = modelModule.default;
            if (typeof modelFunction === 'function') {
                const model = modelFunction(sequelize, DataTypes);
                db[model.name] = model;
            }
        }
    }
}

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
