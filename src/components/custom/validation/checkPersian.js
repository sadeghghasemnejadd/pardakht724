const regExpPersian = new RegExp(/^[\u0600-\u06FF\s]+$/);

const check = (val) => regExpPersian.test(val);

export default check;
