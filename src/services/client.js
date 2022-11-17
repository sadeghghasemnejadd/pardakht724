import axios from "axios";

class Client {
  constructor() {
    // در این بخش اینستنی از اکسیوس ساخته میشود که مقادیری را در ان ثبت می کنیم
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_BASE_URL,
      headers: {},
    });
    console.log(this.instance);
  }
  // این تابع ادرس و کانفیگ های مورد نظر را ورودی میگیرد
  get(endpoint, config = {}) {
    return this.instance.get(endpoint, config).then((res) => res.data);
  }

  // این تابع ادرس و بدنه یا بادی و کانفیک های مورد نظر را ورودی میگیرد
  post(endpoint, data, config = {}) {
    return this.instance.post(endpoint, data, config).then((res) => res.data);
  }

  // این تابع ادرس و بدنه یا بادی و کانفیک های مورد نظر را ورودی میگیرد
  put(endpoint, data, config = {}) {
    return this.instance.put(endpoint, data, config).then((res) => res.data);
  }
}

export const client = new Client();
