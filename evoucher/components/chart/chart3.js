import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import { groupBy } from '@/tools/utils';

import { getAllUser } from '@/tools/utils';

const Bar = dynamic(() => import('@ant-design/plots').then(({ Bar }) => Bar),
    { ssr: false }
);

const Column = dynamic(() => import('@ant-design/plots').then(({ Column }) => Column),
    { ssr: false }
);


export const Chart3 = ({ groupByDiscount }) => {

    const keys = Object.keys(groupByDiscount);
    const data = [];

    for (const key of keys) {
        data.push({
            'percent': "voucher discount: " + key + "%",
            'count': groupByDiscount[key].length + " vouchers",
        })
    }


    const config = {
        data,
        xField: 'percent',
        yField: 'count',
        seriesField: 'count'
    }

    return <Bar {...config} />;
};




export const Chart31 = ({ groupByPartner, users }) => {

    const [data, setData] = useState([]);


    useEffect(() => {
        const finalData = []

        const partners = Object.keys(groupByPartner);

        for (const partner of partners) {

            finalData.push({
                name: "Voucher",
                XX: users[partner]?.[0]?.fullname,
                YY: groupByPartner[partner].length
            })

            finalData.push({
                name: "Campaign",
                XX: users[partner]?.[0]?.fullname,
                YY: Object.keys(groupBy(groupByPartner[partner], 'id_group')).length
            })


        }

        setData(finalData)
    },)

    const config = {
        data,
        isGroup: true,
        xField: 'XX',
        yField: 'YY',
        seriesField: 'name',
        // 分组柱状图 组内柱子间的间距 (像素级别)
        dodgePadding: 2,
        label: {
            // 可手动配置 label 数据标签位置
            position: 'middle',
            // 'top', 'middle', 'bottom'
            // 可配置附加的布局方法
            layout: [
                // 柱形图数据标签位置自动调整
                {
                    type: 'interval-adjust-position',
                }, // 数据标签防遮挡
                {
                    type: 'interval-hide-overlap',
                }, // 数据标签文颜色自动调整
                {
                    type: 'adjust-color',
                },
            ],
        },
    };

    return <Column {...config} />;
};

