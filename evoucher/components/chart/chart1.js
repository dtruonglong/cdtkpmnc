import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
const Pie = dynamic(() => import('@ant-design/plots').then(({ Pie }) => Pie),
    { ssr: false }
);

const Gauge = dynamic(() => import('@ant-design/plots').then(({ Gauge }) => Gauge),
    { ssr: false }
);

export const Chart1 = ({ usedVouchers, unusedVouchers }) => {
    const data = [
        {
            type: 'Used vouchers',
            value: usedVouchers.length,
        },
        {
            type: 'unUsed vouchers',
            value: unusedVouchers.length,
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

export const DemoGauge = ({ usedVouchers, unusedVouchers }) => {
    const config = {
        percent: usedVouchers.length / (unusedVouchers.length + usedVouchers.length),
        range: {
            color: '#30BF78',
        },
        indicator: {
            pointer: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
            pin: {
                style: {
                    stroke: '#D0D0D0',
                },
            },
        },
        axis: {
            label: {
                formatter(v) {
                    return Number(v) * 100;
                },
            },
            subTickLine: {
                count: 3,
            },
        },
        statistic: {
            content: {
                formatter: ({ percent }) => `Rate: ${(percent * 100).toFixed(0)}%`,
                style: {
                    color: 'rgba(0,0,0,0.65)',
                    fontSize: 48,
                },
            },
        },
    };
    return <Gauge {...config} />;
};

