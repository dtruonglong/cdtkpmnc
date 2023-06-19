import { UpdateVoucher2 } from "@/service/vouchers";
import NextCors from 'nextjs-cors';

export default async function handler(req, res) {

    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const { username, id_group } = req.body

    res.setHeader("Allow", "POST");

    const result = await UpdateVoucher2({ username, id_group })

    res.status(200).json({ result })
}