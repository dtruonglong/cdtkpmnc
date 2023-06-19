import conn from "@/tools/pg";
import { v4 as uuidv4 } from 'uuid';
import format from "pg-format"

export async function selectCampaign() {
    let sql = ` SELECT id_group, partner, description,image, expire_time,create_time,game_type,latitude,longitude,store_type,discount,count(*)
                FROM vouchers
                WHERE is_used = 0 AND is_accepted = 1 AND customer IS null 
                GROUP BY id_group, partner, description,image,expire_time,create_time, game_type,latitude,longitude,store_type,discount
                ORDER BY create_time DESC
                `
    try {
        const result = await conn.query(sql, [])
        return { result };
    } catch (error) {
        return { error }
    }
}

export async function selectTypes() {

    let sql = `SELECT *
            FROM types
    `
    try {
        const result = await conn.query(sql, [])
        return { result };
    } catch (error) {
        return { error }
    }

}

export async function checkCampaign({ id_group }) {
    let sql = ` SELECT count(*)
    FROM vouchers
    WHERE id_group = '${id_group}'  AND customer IS NOT null
    `

    try {
        const result = await conn.query(sql, [])
        return { result };
    } catch (error) {
        return { error }
    }
}

export async function deleteCampaign({ id_group }) {
    let sql = ` DELETE FROM vouchers WHERE id_group = '${id_group}'
    `

    try {
        const result = await conn.query(sql, [])
        return { result };
    } catch (error) {
        return { error }
    }
}