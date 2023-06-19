import { selectUser } from "@/service/user"
const jwt = require("jsonwebtoken");
import Cookies from "cookies";


export default async function handler(req, res) {


    const { username, password } = req.body


    const resultService = await selectUser({ username })

    if (resultService.error) {
        res.status(200).json({ error: resultService.error.detail })
    }
    if (resultService.result) {

        const { rows, rowCount } = resultService.result

        if (rowCount != 1) {
            res.status(200).json({ error: 'Wrong username or password' })
        }
        const user = rows[0]

        if (user.password != password) {
            res.status(200).json({ error: 'Wrong username or password' })
        }

        if (user.status == "blocked") {
            res.status(200).json({ error: 'Blocked account, contact admin' })
        }

        const token = jwt.sign({
            username: user.username,
            role: user.role
        }, process.env.JWT_KEY, { expiresIn: '1h' });

        const cookies = new Cookies(req, res)
        cookies.set("token", token)
        cookies.set("username", username)
        cookies.set("fullname", user.fullname)
        cookies.set("role", user.role)

        res.status(200).json({ token, message: 'Login successfully', role: user.role })
    }
}