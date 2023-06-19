import Cookies from "cookies";

export default async function handler(req, res) {

    const cookies = new Cookies(req, res)

    cookies.set("token", '', { expires: new Date(0) })
    cookies.set("role", '', { expires: new Date(0) })
    cookies.set("fullname", '', { expires: new Date(0) })
    cookies.set("username", '', { expires: new Date(0) })

    res.status(200).json({ isError: false, message: "logout successfully" })
}