import { Button, Modal, Select } from 'antd';
import { useState } from 'react';
import { Card } from 'antd';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
import { useRouter } from "next/router";
const { Meta } = Card;

export function GameDetail({ description, partner, expire_time, code, id_group, image, username }) {
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [game_type, setgame_type] = useState('type1')

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);

        hunting({ id_group })
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    function hunting({ id_group }) {
        
        if (username) {
            window.open(`http://localhost:5500/${game_type}.html?info=${username}_${id_group}`);
        } else {
            router.push({
                pathname: "/pages/customer/login"
            })
        }
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Xem
            </Button>
            <Modal
                footer={[

                    <>
                        Chọn game:
                        <Select style={{
                            width: 160,
                        }}
                            options={[
                                {
                                    value: 'type1',
                                    label: 'Hangman Game',
                                },
                                {
                                    value: 'type2',
                                    label: 'Snake Game',
                                },
                            ]}
                            defaultValue={"type1"}

                            onChange={(value) => setgame_type(value)}
                        > </Select></>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        Săn ngay
                    </Button>
                ]}
                title="Săn ngay voucher hấp dẫn" okText="Hunting" cancelText="Close" open={isModalOpen}
                onOk={handleOk} onCancel={handleCancel}


            >

                <Card
                    hoverable
                    style={{ height: "60%", width: "100%" }}
                    cover={<img class="image_responsive" alt="example" height="60%" src={publicRuntimeConfig.BACKEND_FILE + '/' + image} />}
                >
                    <Meta title='Chương trình siêu hấp dẫn trong tháng' description={description} />
                    
                </Card>

                
            </Modal>
        </>
    );
}