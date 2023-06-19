import { selectUsers } from "@/service/user"


export default async function handler(req, res) {
    try {
        const result = await selectUsers()
        res.status(200).json(result)
    } catch (error) {
        res.status(200).json({ error })
    }
}