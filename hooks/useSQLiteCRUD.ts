import * as SQLite from 'expo-sqlite';

export function useSQLiteCRUD(tableName: string) {
    const db = SQLite.useSQLiteContext();

    const getAllAsync = async <T>(): Promise<T[]> => {
        return await db.getAllAsync<T>(`SELECT * FROM ${tableName}`);
    };

    const getAllByFieldNameAsync = async <T>(fieldName: string, id: string): Promise<T[]> => {
        return await db.getAllAsync<T>(`SELECT * FROM ${tableName} WHERE ${fieldName} = ${id}`);
    };

    const insertAsync = async <T>(item: T, excludeFields: string[]): Promise<number> => {
        const keys = Object.keys(item as unknown as Object).filter(key => key !== 'id' &&
            !excludeFields.includes(key));
        const values = keys.map(key => typeof (item as any)[key] === 'string' ? `'${(item as any)[key]}'` : (item as any)[key]);
        const keyPlaceholders = keys.join(', ');
        const valuesPlaceholders = values.join(', ');
        const query = `INSERT INTO ${tableName} (${keyPlaceholders}) VALUES (${valuesPlaceholders})`;
        const returnData = await db.runAsync(query);
        return returnData.lastInsertRowId;
    };

    const updateAsync = async <T>(id: string, field: string, value: T): Promise<void> => {
        await db.runAsync(`UPDATE ${tableName} SET ${field} = ${value} WHERE id = ${id}`);
    };

    const deleteAsync = async (id: string): Promise<void> => {
        await db.runAsync(`DELETE FROM ${tableName} WHERE id = ${id}`);
    };

    return {
        getAllAsync,
        getAllByFieldNameAsync,
        insertAsync,
        updateAsync,
        deleteAsync,
    };
}