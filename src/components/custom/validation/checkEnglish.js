const regExp = new RegExp(/^[a-zA-Z]+$/);

const checkEnglish = (val) => regExp.test(val);

export default checkEnglish;
