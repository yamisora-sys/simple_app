import * as SQLite from 'expo-sqlite';
const dbName = 'todo.db';

export const getDBConection = ()  => {
    return SQLite.openDatabase(dbName)
}

export const DeleteDB = (db) => {
    db.transaction(tx => {
        tx.executeSql(
            `DROP DATABASE ${dbName}`
        )
    })
}

export const createTable = (db, tableName, fields) => {
    console.log(`CREATE TABLE IF NOT EXISTS ${tableName} (${fields})`);
    try{ 
        db.transaction(tx => {
            tx.executeSql(
                `DROP TABLE IF EXISTS ${tableName}`
            )
            tx.executeSql(
                `CREATE TABLE IF NOT EXISTS ${tableName} (${fields})`
            )
        })
    }
    catch(err){
        console.log(err)
    }
}

export const insertData = (db, tableName, fields, values) => {
    console.log(`INSERT INTO ${tableName} (${fields}) VALUES (${values})`);
    try {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT INTO ${tableName} (${fields}) VALUES (${values})`
            )
        })
    }
    catch(err){
        console.log(err)
    }
}

export const deleteData = (db, tableName, where) => {
    console.log(`DELETE FROM ${tableName} WHERE ${where}`);
    db.transaction(tx => {
        tx.executeSql(
            `DELETE FROM ${tableName} WHERE ${where}`
        )
    })
}

export const updateData = (db, tableName, set, where) => {
    console.log(`UPDATE ${tableName} SET ${set} WHERE ${where}`);
    db.transaction(tx => {
        tx.executeSql(
            `UPDATE ${tableName} SET ${set} WHERE ${where}`
        )
    })
}

export  async function getData(db, tableName) : Promise<any> {
    let data = [];
    console.log(`select * from ${tableName}`);
    db.transaction(tx => {
        tx.executeSql(`select * from ${tableName}`, [], (_, { rows : {_array} }) => {
            data = [..._array]
        });
    });
    return data;
}