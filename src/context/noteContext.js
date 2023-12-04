import {createContext, useState, useEffect, useCallback} from 'react';
import {getDBConection, getData, insertData, updateData, deleteData} from '@config/db';

export const NoteContext = createContext(null);

export const ADD = "ADD";
export const UPDATE = "UPDATE";
export const DELETE = "DELETE";

export function NoteProvider({children}) {
    const db = getDBConection();
    const [note, setNote] = useState([]);
    const fetchData = useCallback(async () => {
        db.transaction((tx) => {
            tx.executeSql("select * from List", [], (_, { rows }) => {
                setNote(rows._array);
            });
        })
    }, []);
    const createAndupdateData = (data, type) => {
        const id = data.id; 
        const title = data.title;
        const description = data.description;
        const now = new Date();
        const db = getDBConection();
        if(type === UPDATE){
            updateData(db, "List", `title = '${title}', description = '${description}'`, `id = ${id}`);
        }
        else if (type === ADD){
            insertData(db, "List", "title, description, created_at, updated_at", `'${title}', '${description}', '${now}', '${now}'`);
        }
        else if (type === DELETE){
            deleteData(db, "List", `id = ${id}`);
        }
        fetchData();
    }
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <NoteContext.Provider
            value={[note, createAndupdateData]}>
            {children}
        </NoteContext.Provider>
    );
}