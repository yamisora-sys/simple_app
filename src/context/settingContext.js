import {createContext, useState, useEffect, useCallback} from 'react';
import {getDBConection, getData, updateData} from '@config/db';

export const SettingContext = createContext(null);

export function SettingProvider({children}) {
    const db = getDBConection();
    const [setting, setSetting] = useState({});
    const fetchData = useCallback(async () => {
        db.transaction((tx) => {
            tx.executeSql("select * from Setting", [], (_, { rows }) => {
                setSetting(rows._array);
            });
        })
    }, []);
    const updateSetting = async (id, value) =>{
        updateData(db, "Setting", `value = ${value}`, `id = ${id}`);
        fetchData();
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <SettingContext.Provider
            value={[setting, updateSetting]}>
            {children}
        </SettingContext.Provider>
    );
}