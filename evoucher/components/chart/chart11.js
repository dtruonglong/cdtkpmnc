import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
const Pie = dynamic(() => import('@ant-design/plots').then(({ Pie }) => Pie),
    { ssr: false }
);


export const Chart11 = ({
    acceptedVouchers,
    ignoredVouchers,
    waitingVouchers }) => {
    const data = [
        {
            type: 'Accepted Vouchers',
            value: acceptedVouchers.length,
        },
        {
            type: 'Ignored Vouchers',
            value: ignoredVouchers.length,
        },
        {
            type: 'Waiting Vouchers',
            value: waitingVouchers.length,
        }
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };
    return <>
        <Pie {...config} />
    </>;
};

