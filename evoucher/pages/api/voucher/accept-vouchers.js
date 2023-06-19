import { updateGroupVouchers } from "@/service/vouchers"

export default async function handler(req, res) {

    const { id_group, action } = req.body

    const resp = await updateGroupVouchers({ id_group, action })

    res.status(200).json(resp)
}