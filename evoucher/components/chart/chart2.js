import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
const Column = dynamic(() => import('@ant-design/plots').then(({ Column }) => Column),
  { ssr: false }
);


export const Chart2 = ({ groupByPartner }) => {

  const keys = Object.keys(groupByPartner);
  const data = [];

  for (const key of keys) {
    data.push({
      type: key,
      number: groupByPartner[key].length
    })
  }


  /*
  const data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];
  */
  const config = {
    data,
    xField: 'type',
    yField: 'number',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} />;
};


