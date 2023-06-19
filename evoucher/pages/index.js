import LayoutPage from "../components/layout"
import { useEffect, useState } from "react";
import { fetchDataClientSite } from "@/tools/axios";
import { Space, Table, Tag } from 'antd';

export default function Home() {


  return (
    <>
      HOME
    </>
  )
}

Home.getLayout = function getLayout(page) {
  return (
    <LayoutPage>
      <Home />
    </LayoutPage>
  );
};


export async function getServerSideProps({ req, res }) {

  return {
    redirect: {
      permanent: true,
      destination: '/pages/customer/home'
    }
  }
}