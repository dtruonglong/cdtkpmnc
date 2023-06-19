import { insertUser } from "@/service/user"

export default async function handler(req, res) {

    const { username, fullname, password, role, phone, address } = req.body
    const resultService = await insertUser({ username, fullname, password, role, phone, address })

    if (resultService.error) {
        res.status(200).json({ error: resultService.error.detail })
    }
    if (resultService.result) {
        res.status(200).json({ rows: resultService.result.rows, rowCount: resultService.result.rowCount })
    }
}