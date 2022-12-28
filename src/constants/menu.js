const data = [
  {
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "داشبورد",
    to: "",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "خانه",
        to: "/",
      },
      {
        icon: "simple-icon-pie-chart",
        label: "لیست قیمت ارزها",
        to: "/currency-list",
      },
      {
        icon: "simple-icon-basket-loaded",
        label: "همکاری در فروش",
        to: "",
      },
      {
        icon: "simple-icon-doc",
        label: "پاداش ها",
        to: "",
      },
      {
        icon: "simple-icon-doc",
        label: "خروج",
        to: "logout",
      },
    ],
  },
  {
    id: "users",
    icon: "iconsminds-three-arrow-fork",
    label: "کاربران",
    to: "",
    subs: [
      {
        icon: "users",
        label: "مشاهده کاربران",
        to: "/users",
      },
      {
        icon: "roles",
        label: "مشاهده نقش ها",
        to: "/roles",
      },
      {
        icon: "permissions",
        label: "مدیریت دسترسی ها",
        to: "/permissions",
      },
      {
        icon: "tasks",
        label: "مدیریت وظایف",
        to: "/tasks",
      },
      {
        icon: "currencies",
        label: "مدیریت ارز ها",
        to: "/currencies",
      },
      {
        icon: "pay method",
        label: "مدیریت روش های پرداخت",
        to: "/pay-methods",
      },
      {
        icon: "simple-icon-check",
        label: "تاریخچه درخواست های پشتیبانی",
        to: "",
      },
    ],
  },
  {
    id: "orders",
    icon: "iconsminds-digital-drawing",
    label: "سفارش ها",
    to: "",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "ثبت سفارش جدید",
        to: "",
      },
      {
        icon: "simple-icon-pie-chart",
        label: "تاریخچه سفارش ها",
        to: "",
      },
    ],
  },
  {
    id: "accounts",
    icon: "iconsminds-air-balloon-1",
    label: "حسابداری",
    to: "",
    subs: [
      {
        icon: "simple-icon-check",
        label: "واریز وجه",
        to: "",
      },
      {
        icon: "simple-icon-calculator",
        label: "برداشت وجه",
        to: "",
      },
      {
        icon: "simple-icon-bubbles",
        label: "تاریخچه صورت حساب ها",
        to: "",
      },
      {
        icon: "simple-icon-bubbles",
        label: "تاریخچه تراکنش ها",
        to: "",
      },
    ],
  },
  {
    id: "user_account",
    icon: "iconsminds-pantone",
    label: "حساب کاربری",
    to: "",
    subs: [
      {
        icon: "simple-icon-check",
        label: "ارتقا سطح کاربری",
        to: "/profile/upgrade-user-level",
      },
      {
        icon: "simple-icon-check",
        label: "تغییر رمز عبور",
        to: "/profile/update-password",
      },
      {
        icon: "simple-icon-check",
        label: "ویرایش اطلاعات شخصی",
        to: "",
      },
      {
        icon: "simple-icon-check",
        label: "مدیریت کارت های بانکی",
        to: "",
      },
      {
        icon: "simple-icon-check",
        label: "سوابق ورود",
        to: "",
      },
      {
        icon: "simple-icon-check",
        label: "امنیت حساب کاربری",
        to: "",
      },
    ],
  },
  {
    id: "support",
    icon: "iconsminds-three-arrow-fork",
    label: "پشتیبانی",
    to: "",
    subs: [
      {
        icon: "simple-icon-check",
        label: "ارسال درخواست پشتیبانی",
        to: "",
      },
      {
        icon: "simple-icon-check",
        label: "تاریخچه درخواست های پشتیبانی",
        to: "",
      },
    ],
  },
];
export default data;
