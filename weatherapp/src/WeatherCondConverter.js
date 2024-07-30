import { ReactComponent as ClearSun } from "./assets/videos/01d.svg";
import { ReactComponent as ClearMoon } from "./assets/videos/01n.svg";
import { ReactComponent as RainDay } from "./assets/videos/10d.svg";
import { ReactComponent as RainNight } from "./assets/videos/10n.svg";
import { ReactComponent as FewCloudsD } from "./assets/videos/02d.svg";
import { ReactComponent as FewCloudsN } from "./assets/videos/02n.svg";
import { ReactComponent as ScatteredCloudsD } from "./assets/videos/03d.svg";
import { ReactComponent as BrokenCloudsD } from "./assets/videos/04d.svg";
import { ReactComponent as ShowerRainD } from "./assets/videos/09d.svg";
import { ReactComponent as ThunderStorm } from "./assets/videos/11d.svg";
import { ReactComponent as Snow } from "./assets/videos/13d.svg";
import { ReactComponent as Mist } from "./assets/videos/50d.svg";

const iconMap = {
  "01d": ClearSun,
  "01n": ClearMoon,
  "10d": RainDay,
  "10n": RainNight,
  "02d": FewCloudsD,
  "02n": FewCloudsN,
  "03d": ScatteredCloudsD,
  "04d": BrokenCloudsD,
  "04n": BrokenCloudsD,
  "09d": ShowerRainD,
  "09n": ShowerRainD,
  "11d": ThunderStorm,
  "11n": ThunderStorm,
  "13d": Snow,
  "13n": Snow,
  "50d": Mist,
  "50n": Mist,
};

export function WeatherConditionConverter(fileName) {
  return iconMap[fileName] || null;
}
