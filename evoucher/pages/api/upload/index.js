import formidable from 'formidable';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default (req, res) => {
    const promise = new Promise((resolve, reject) => {

        const form = new formidable.IncomingForm({
            uploadDir: './public/upload/', keepExtensions: true,
        });
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        })
    })

    return promise.then(async ({ fields, files }) => {

        //console.log({ fields, files })

        //const data = fs.readFileSync(files.image.filepath);
        const result = Object.keys(files).map((key) => [key, files[key]["newFilename"]])

        res.status(200).json({ result })
    })
}