/* eslint-disable global-require */
import './assets/css/vendor/bootstrap.min.css';
import './assets/css/vendor/bootstrap.rtl.only.min.css';
import 'react-circular-progressbar/dist/styles.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-image-lightbox/style.css';
import 'video.js/dist/video-js.css';
import "./global.scss"
import './assets/css/sass/themes/gogo.light.blueolympic.scss'
import "react-toastify/dist/ReactToastify.css";

import {
  isMultiColorActive,
  defaultColor,
  isDarkSwitchActive,
} from './constants/defaultValues';
import { getCurrentColor, setCurrentColor } from './helpers/Utils';

const color =
  isMultiColorActive || isDarkSwitchActive ? getCurrentColor() : defaultColor;
setCurrentColor(color);

const render = () => {
  import(`./assets/css/sass/themes/gogo.light.blueolympic.scss`).then(() => {
    require('./AppRenderer');
  });
};
render();

