import conn from "@/tools/pg";
import { v4 as uuidv4 } from 'uuid';
import format from "pg-format"
import { makeid } from "@/tools/utils";

export async function insertVoucher({ latitude,
    longitude, vouchers, description, image, create_time, expire_time, game_type, store_type, link_use_voucher }) {

    let sql = 'INSERT INTO vouchers(latitude,longitude,id,id_group,code,discount,expire_time,partner,description,image,create_time,game_type,store_type,link_use_voucher) VALUES %L'
    const values = []
    const id_group = uuidv4().toString().replaceAll("-", "")

    for (const iterator of vouchers) {

        const num = iterator?.num

        for (let index = 0; index < num; index++) {
            const code = makeid(8)
            const id = uuidv4()
            values.push([latitude, longitude, id, id_group, code, iterator?.discount, expire_time, iterator.partner, description, image, create_time, game_type, store_type, link_use_voucher])
        }
    }

    sql = format(sql, values)


    try {
        const result = await conn.query(sql, [])


        return { result };
    } catch (error) {

        console.log({ error })
        return { error }
    }
}

export async function updateGroupVouchers({ id_group, action }) {


    const sql = `
        UPDATE vouchers
        SET is_accepted = ${action}
        WHERE id_group = '${id_group}'
    `

    try {
        const result = await conn.query(sql, [])
        return { result };
    } catch (error) {
        return { error }
    }
}

export async function updateVoucher({ code, action }) {
    let sql = ``

    if (action == "USE_VOUCHER") {
        sql = `
        UPDATE vouchers
        SET is_used = 1
        WHERE code = '${code}'
    `
    }



    try {
        const result = await conn.query(sql, [])
        return { result };
    } catch (error) {
        return { error }
    }
}

export async function selectVouchers({ type, role, username }) {

    let sql = `
    `

    if (type == "available") {
        sql = `
        SELECT *
        FROM vouchers
        WHERE is_accepted = 1 
        AND is_used = 0
    `
    }
    else if (type == "used") {
        sql = `
        SELECT *
        FROM vouchers
        WHERE is_accepted = 1
        AND is_used = 1
    `
    }
    else if (type == "all") {
        if (role == "admin") {
            sql = `
            SELECT *
            FROM vouchers
        `
        }
        else if (role == "partner") {
            sql = `
            SELECT *
            FROM vouchers
            WHERE partner = '${username}'
        `
        } else {
            sql = `
            SELECT *
            FROM vouchers
            WHERE customer   = '${username}'
        `
        }
    }

    try {
        const result = await conn.query(sql, [])

        return { result };

    } catch (error) {
        return { error }
    }
}

export async function UpdateVoucher2({ username, id_group }) {


    try {
        let sql = `
        SELECT *
        FROM vouchers
        WHERE id_group = '${id_group}' AND is_used = 0
    
        `

        const result = await conn.query(sql, [])

        const num_voucher = result.rows.length || 0

        let randomNum = 0
        if (num_voucher == 0) {
            return { code: 'out of vouchers' };
        }
        else {
            randomNum = parseInt(Math.random() * num_voucher);
        }

        const voucher = result.rows?.[randomNum]

        sql = `
        UPDATE vouchers
        SET customer = '${username}'
        WHERE code = '${voucher.code}' 
        `

        const result2 = await conn.query(sql, [])

        return { code: voucher.discount };

    } catch (error) {
        console.log(error)
        return { error }
    }
}

export async function selectGroupVouchers({ type, username, role }) {

    //type = waiting_group
    let sql = ''
    if (role == 'admin') {
        sql = `
    SELECT id_group, partner,create_time,image,is_accepted,description, expire_time, game_type, count(*)
    FROM vouchers 
    GROUP BY id_group,partner,create_time,image,is_accepted,description, expire_time, game_type 
    ORDER BY create_time DESC
    `}
    else {
        sql = `
        SELECT id_group, partner,create_time,image,is_accepted,description, expire_time, game_type, count(*)
        FROM vouchers 
        WHERE partner = '${username}'
        GROUP BY id_group,partner,create_time,image,is_accepted,description, expire_time, game_type
        ORDER BY create_time DESC
        `
    }

    try {
        const result = await conn.query(sql, [])

        console.log({ result })

        return { result };
    } catch (error) {
        console.log({ error })
        return { error }

    }
}


export async function updateVoucherUser({ code, action }) {
    let sql = ``

    if (action == "USE_VOUCHER1") {
        sql = `
        UPDATE vouchers
        SET customer = null
        WHERE code = '${code}'
    `
    }



    try {
        const result = await conn.query(sql, [])
        return { result };
    } catch (error) {
        return { error }
    }
}

