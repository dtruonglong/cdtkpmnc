import conn from "@/tools/pg"
import format from "pg-format"

export async function insertUser({ username, password, fullname, role, phone, address }) {

    const values = [[username, password, fullname, role, phone, address]]
    let sql = 'INSERT INTO users(username, password, fullname, role,phone, address) VALUES %L'
    sql = format(sql, values)

    try {
        const result = await conn.query(sql, [])
        return { result };
    } catch (error) {
        return { error }
    }
}

export async function selectUser({ username }) {
    let sql = ` SELECT * 
                FROM users
                WHERE username = '${username}'
                `
    try {
        const result = await conn.query(sql, [])
        return { result };
    } catch (error) {
        return { error }
    }
}

export async function selectUsers() {
    let sql = `SELECT * FROM users`
    try {
        const result = await conn.query(sql, [])
        return { result };
    } catch (error) {
        return { error }
    }
}

export async function updateUser({ username, status }) {
    let sql = `UPDATE users
            SET status = '${status}'
            WHERE username = '${username}'
    `

    try {
        const result = await conn.query(sql, [])
        return { result };
    } catch (error) {
        return { error }
    }
}