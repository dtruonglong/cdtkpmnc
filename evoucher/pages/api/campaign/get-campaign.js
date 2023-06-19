import { selectCampaign } from "@/service/campaign";
import Cookies from "cookies";
import { decode } from "@/tools/utils";

export default async function handler(req, res) {
    const cookies = new Cookies(req, res)
    const token = cookies.get("token")

    try {

        const { decoded } = await decode(token)
        const { username } = decoded
        const result = await selectCampaign()
        res.status(200).json(result)
    } catch (err) {
        const { isError, error } = err
        res.status(200).json({ isError, error })
    }
}