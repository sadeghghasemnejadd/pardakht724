import Breadcrumb from "components/custom/Breadcrumb";
import React from "react";
import AppLayout from "../../../layout/AppLayout";
import HomeNotifications from "./HomeNotifications";
import HomeRow from "./HomeRow";

// لیست بردکامپ ها
const list = [
  {
    path: "/",
    text: "داشبورد",
  },
  {
    path: "/home",
    text: "خانه",
  },
];

export default function Home() {
  return (
    <AppLayout>
      <Breadcrumb title="داشبورد" list={list} />
      <HomeNotifications />
      <HomeRow title="خدمات و محصولات مورد علاقه" />
      <div className="separator mb-5"></div>
      <HomeRow title="تازه ها" />
      <HomeRow title="محبوب ترین ها" />
      <HomeRow title="خدمات ویزا مستر" />
      <HomeRow title="خدمات پی پال" />
    </AppLayout>
  );
}
