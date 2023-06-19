import { selectVouchers, selectGroupVouchers } from "@/service/vouchers"
import Cookies from "cookies";
import { decode } from "@/tools/utils";


export default async function handler(req, res) {
    const cookies = new Cookies(req, res)
    const token = cookies.get("token")

    const { type } = req.body

    try {

        const { decoded } = await decode(token)
        const { role, username } = decoded


        if (type == "waiting_group") {
            const result = await selectGroupVouchers({ type, username, role })

            res.status(200).json(result)
        }

        //console.log({decoded})

        const result = await selectVouchers({ type, role, username })

        res.status(200).json(result)

    } catch (err) {
        //console.log({err})
        const { isError, error } = err
        res.status(200).json({ isError, error })
    }
}