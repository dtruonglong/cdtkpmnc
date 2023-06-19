import { selectCampaign } from "@/service/campaign";


export default async function handler(req, res) {


    const result = await selectCampaign()

    res.status(200).json(result)

}