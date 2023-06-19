import { selectUser } from "@/service/user"
const jwt = require("jsonwebtoken");
import Cookies from "cookies";
import { decode } from "@/tools/utils";


export default async function handler(req, res) {

    const cookies = new Cookies(req, res)

    const fullname = cookies.get("fullname")

    res.status(200).json({ fullname })
}