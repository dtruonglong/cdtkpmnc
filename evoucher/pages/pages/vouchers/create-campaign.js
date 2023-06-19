import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, Upload, DatePicker, Select } from 'antd';
import Cookies from 'cookies';
import LayoutPage from "@/components/layout";
import { fetchDataClientSite } from '@/tools/axios';
import ImgCrop from 'antd-img-crop';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
const { TextArea } = Input;



export default function CreateCampain({ initialProps }) {

    const [form] = Form.useForm();

    const router = useRouter()

    const [fileList, setFileList] = useState([]);
    const [types, setTypes] = useState([])

    const imagePath = useRef("")

    const onChange = ({ file, fileList }) => {
        setFileList(fileList);

        if (file.status == "done") {
            let formData = new FormData();
            formData.append("image", fileList[0].originFileObj);

            fetchDataClientSite.post("/upload", formData).then(resp => {
                const { data } = resp
                imagePath.current = data.result[0][1]
            })
        }
        else {
            imagePath.current = ''
        }
    };

    const onPreview = async (file) => {

        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const onFinish = (values) => {

        let { vouchers, number,
            discount, description,
            create_time, expire_time,
            store_type,
            link_use_voucher,
            latitude, longitude
        } = values

        vouchers = vouchers || []
        vouchers.push({
            number,
            discount
        })
        const newVouchers = []

        const game_type = "type1"
        for (const iterator of vouchers) {
            newVouchers.push({
                discount: iterator?.discount,
                num: iterator?.number,
                partner: initialProps.username
            })
        }

        if (!imagePath.current) {
            alert("Image is required")
            return
        }

        fetchDataClientSite.post('/campaign/create-campaign', {
            image: imagePath.current,
            vouchers: newVouchers,
            description,
            create_time,
            expire_time,
            game_type,
            store_type,
            link_use_voucher,
            latitude,
            longitude
        }).then((resp) => {
            const { data } = resp
            router.push("/pages/vouchers/waiting-vouchers")
        }).catch(e => {
            console.log(e)
        })
    };

    const setCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords


            form.setFieldsValue({ latitude, longitude })
        })
    }

    useEffect(() => {
        setCurrentLocation()

        fetchDataClientSite.post("/voucher/get-types").then((resp) => {
            const { data } = resp

            const typeStore = data.result.rows || []

            const newTypeStore = []

            for (const type of typeStore) {
                newTypeStore.push({
                    value: type.name,
                    label: type.label
                })
            }

            setTypes(newTypeStore)
        })
    }, [])

    return (
        <>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
            >
                {fileList.length < 1 && '+ IMAGE'}
            </Upload>           

            <Form
                name="dynamic_form_nest_item"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                autoComplete="off"

                form={form}
            >
                <Form.Item
                    name={'description'}
                    rules={[
                        {
                            required: true,
                            message: 'Missing description',
                        },
                    ]}
                >
                    <TextArea rows={4} placeholder='Desctiption' />
                </Form.Item>

                <Form.Item
                    name={'store_type'}
                    rules={[
                        {
                            required: true,
                            message: 'Missing store type',
                        },
                    ]}
                >

                    <Select
                        style={{ width: 375 }}
                        placeholder="Select store type"
                        options={types}
                    />
                </Form.Item>

                <Space>
                    <Form.Item
                        name={'create_time'}
                        rules={[
                            {
                                required: true,
                                message: 'Missing start date',
                            },
                        ]}
                    >
                        <DatePicker placeholder='Pick an start date ' />
                    </Form.Item>

                    <Form.Item
                        name={'expire_time'}
                        rules={[
                            {
                                required: true,
                                message: 'Missing end date',
                            },
                        ]}
                    >
                        <DatePicker placeholder='Pick an end date' />
                    </Form.Item>
                </Space>

                <Space>
                    <Form.Item
                        name={'latitude'}
                        rules={[
                            {
                                required: true,
                                message: 'Missing latitude',
                            },
                        ]}
                    >
                        <Input type="number" placeholder='Input your latitude' />
                    </Form.Item>

                    <Form.Item
                        name={'longitude'}
                        rules={[
                            {
                                required: true,
                                message: 'Missing longitude',
                            },
                        ]}
                    >
                        <Input type="number" placeholder='Input your longitude' />
                    </Form.Item>
                    <Form.Item

                    >
                        <Button onClick={setCurrentLocation}>Auto set location</Button>
                    </Form.Item>


                </Space>

                <Form.Item
                    name={'link_use_voucher'}
                    rules={[
                        {
                            required: true,
                            message: 'Missing link use voucher',
                        },
                    ]}
                >
                    <Input placeholder="Link use voucher" />
                </Form.Item>


                <Space
                    style={{
                        display: 'flex',
                        marginBottom: 8,
                    }}
                    align="baseline"
                >
                    <Form.Item

                        name={'discount'}
                        rules={[
                            {
                                required: true,
                                message: 'Missing Discount',
                            },
                        ]}
                    >
                        <Input placeholder="Discount" />
                    </Form.Item>

                    <Form.Item
                        name={'number'}
                        rules={[
                            {
                                required: true,
                                message: 'Missing Number',
                            },
                        ]}
                    >
                        <Input placeholder="Number" />
                    </Form.Item>
                </Space>


                <Form.List name="vouchers">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <Space
                                    key={key}
                                    style={{
                                        display: 'flex',
                                        marginBottom: 8,
                                    }}
                                    align="baseline"
                                >
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'discount']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Discount',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Discount" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'number']}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Missing Number',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Number" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}

                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    More voucher types
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>

    )
}

CreateCampain.getLayout = function getLayout(page) {
    return (
        <LayoutPage fullname={page.props.fullname} role={page.props.role}>
            <CreateCampain initialProps={page.props} />
        </LayoutPage>
    );
};


export async function getServerSideProps({ req, res }) {

    const cookies = new Cookies(req, res)

    const token = cookies.get('token')
    const username = cookies.get('username')
    const fullname = cookies.get('fullname')
    const role = cookies.get('role')


    if (!token) return {
        redirect: {
            permanent: true,
            destination: '/pages/user/login'
        }
    }

    return { props: { token, username, fullname, role } }
}