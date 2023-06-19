import { updateUser } from "@/service/user";
import Cookies from "cookies";



export default async function handler(req, res) {
    const cookies = new Cookies(req, res)
    const role = cookies.get("role")
    const { username, status } = req.body

    if (role == "admin") {
        const result = await updateUser({ username, status })
        console.log({result})
        res.status(200).json(result)
    } else {
        res.status(200).json({ error: "you are not admin" })
    }
}