const permissionList = [
  "photos.index",
  "photos.store",
  "photos.show",
  "photos.put",
  "photos.update",
  "photos.destory",
  "users.index",
  "products",
  "orders.store",
];

export function checkPermission(item = "") {
  if (permissionList.includes(item)) return true;
  return false;
}

export function checkPermissionPages(pageName) {
  const currentPageName = pageName.replace("/", "");

  let permission;
  let items = [];

  permissionList.forEach((item) => {
    if (item.indexOf(currentPageName) >= 0) {
      permission = true;
      items.push(item);
    }
  });

  return { permission, items };
}
