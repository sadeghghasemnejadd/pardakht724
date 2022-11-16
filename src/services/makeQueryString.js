// export function makeQueryString(obj) {
//   if (!obj) return;

//   const _obj = { ...obj };
//   Object.keys(_obj).forEach(
//     (key) => (_obj[key] === undefined || _obj[key] === "") && delete _obj[key]
//   );
//   if (Object.keys(_obj).length === 0) return;

//   const params = new URLSearchParams();

//   Object.entries( ).forEach(([key, value]) => {
//     if (Array.isArray(value)) {
//       value.forEach((value) => params.append(key + "[]", value.toString()));
//     } else {
//       params.append(key, value.toString());
//     }
//   });

//   return params.toString();

//   // const params = new URLSearchParams(_obj);
//   // return params.toString();

//   // const str = [];
//   // for (const p in obj) {
//   //   if (obj.hasOwnProperty(p)) {
//   //     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
//   //   }
//   // }
//   // return str.join("&");
// }

export function makeQueryString(url, parameters) {
  var qs = "";
  for (var key in parameters) {
    var value = parameters[key];
    qs += encodeURIComponent(key) + ":" + encodeURIComponent(value) + ",";
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    // url = url + "?" + qs;
    url = url + qs;
  }
  return url;
}
