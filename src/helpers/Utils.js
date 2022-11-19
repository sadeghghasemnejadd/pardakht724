import {
  defaultDirection,
  defaultLocale,
  defaultColor,
  localeOptions,
  themeColorStorageKey,
  themeRadiusStorageKey,
} from "constants/defaultValues";

export const mapOrder = (array, order, key) => {
  // eslint-disable-next-line func-names
  array.sort(function (a, b) {
    const A = a[key];
    const B = b[key];
    if (order.indexOf(`${A}`) > order.indexOf(`${B}`)) {
      return 1;
    }
    return -1;
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}.${mm}.${yyyy}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

export const getDirection = () => {
  let direction = defaultDirection;
  return {
    direction,
    isRtl: true,
  };
};
export const setDirection = (localValue) => {
  let direction = "rtl";
  if (localValue === "rtl" || localValue === "ltr") {
    direction = localValue;
  }
  try {
    localStorage.setItem("direction", direction);
  } catch (error) {}
};

export const getCurrentColor = () => {
  let currentColor = defaultColor;
  try {
    if (localStorage.getItem(themeColorStorageKey)) {
      currentColor = localStorage.getItem(themeColorStorageKey);
    }
  } catch (error) {
    currentColor = defaultColor;
  }
  return currentColor;
};

export const setCurrentColor = (color) => {
  try {
    localStorage.setItem(themeColorStorageKey, color);
  } catch (error) {}
};

export const getCurrentRadius = () => {
  let currentRadius = "rounded";
  try {
    if (localStorage.getItem(themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(themeRadiusStorageKey);
    }
  } catch (error) {
    currentRadius = "rounded";
  }
  return currentRadius;
};
export const setCurrentRadius = (radius) => {
  try {
    localStorage.setItem(themeRadiusStorageKey, radius);
  } catch (error) {}
};

export const getCurrentLanguage = () => {
  let language = defaultLocale;
  try {
    language =
      localStorage.getItem("currentLanguage") &&
      localeOptions.filter(
        (x) => x.id === localStorage.getItem("currentLanguage")
      ).length > 0
        ? localStorage.getItem("currentLanguage")
        : defaultLocale;
  } catch (error) {
    language = defaultLocale;
  }
  return language;
};
export const setCurrentLanguage = (locale) => {
  try {
    localStorage.setItem("currentLanguage", locale);
  } catch (error) {}
};

export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem("gogo_current_user") != null
        ? JSON.parse(localStorage.getItem("gogo_current_user"))
        : null;
  } catch (error) {
    user = null;
  }
  return user;
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem("gogo_current_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("gogo_current_user");
    }
  } catch (error) {}
};
