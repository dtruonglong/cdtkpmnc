import { checkCampaign } from "@/service/campaign"

export default async function handler(req, res) {

    const { id_group } = req.body

    try {
        const result = await checkCampaign({ id_group })
        res.status(200).json(result)
    } catch (err) {

        const { isError, error } = err
        res.status(200).json({ isError, error })
    }
}