import { updateVoucher } from "@/service/vouchers"

export default async function handler(req, res) {

    const { code } = req.body

    const result = await updateVoucher({ code, action:"USE_VOUCHER" })

    res.status(200).json(result)
}