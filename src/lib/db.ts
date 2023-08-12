import mysql, { RowDataPacket } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

export async function query<T extends RowDataPacket>(sql: string, param?: any) : Promise<T[]> {
    try {

        const con = await mysql.createConnection({
            host: process.env.DB_SERVER,
            database: "db",
            user: "docker",
            password: "docker",
            charset: "utf8"
        })

        const [results] = await con.execute<T[]>(sql, param)
        await con.end()

        return results

    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function querySingle<T extends RowDataPacket>(sql: string, param?: any) : Promise<T | undefined> {
    const ret = await query<T>(sql, param)
    return ret.length > 0 ? ret[0] : undefined
}

export async function execute(sql: string, param?: any) : Promise<number> {
    try {

        const con = await mysql.createConnection({
            host: process.env.DB_SERVER,
            database: "db",
            user: "docker",
            password: "docker",
            charset: "utf8"
        })

        const [result] = await con.query<ResultSetHeader>(sql, param)
        await con.end()

        return result.affectedRows

    } catch (error) {
        console.log(error)
        throw error
    }
}