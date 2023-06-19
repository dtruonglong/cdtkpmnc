
import { selectTypes } from "@/service/campaign"

export default async function handler(req, res) {
    
    const resp = await selectTypes()

    console.log({resp})

    res.status(200).json(resp)
}