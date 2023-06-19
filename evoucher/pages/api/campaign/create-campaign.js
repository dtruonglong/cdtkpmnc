import { insertVoucher } from "@/service/vouchers";
import { decode } from "@/tools/utils";
import Cookies from "cookies";


export default async function handler(req, res) {

    const cookies = new Cookies(req, res)
    const { vouchers, description,
        image, create_time, expire_time,
        game_type, store_type,
        link_use_voucher, latitude,
        longitude } = req.body;

    const token = cookies.get("token")

    try {

        const { decoded } = await decode(token)
        const { role } = decoded
        const isPartner = role == 'partner' ? true : false

        if (!isPartner) {
            res.status(200).json({ isError: true })
        }

        const resp = await insertVoucher({
            latitude, longitude,
            vouchers, description, image, create_time,
            expire_time, game_type, store_type, link_use_voucher
        })
        res.status(200).json(resp)
    } catch (err) {
        const { isError, error } = err
        res.status(200).json({ isError, error })
    }
}