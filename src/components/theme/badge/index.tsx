import clsx from "clsx";
import { WorksDiscipline } from "../../../data/works";

import style from "./style.module.scss";

function getColor(d: WorksDiscipline) {
  switch (d) {
    case WorksDiscipline.Computing: return "blue"
    case WorksDiscipline.Design: return "indigo"
    case WorksDiscipline.Engineering: return "purple"
    case WorksDiscipline.English: return "pink"
    case WorksDiscipline.Humanities: return "red"
    case WorksDiscipline.Innovation: return "orange"
    case WorksDiscipline.Leadership: return "yellow"
    case WorksDiscipline.Math: return "green"
    case WorksDiscipline.Robotics: return "teal"
    case WorksDiscipline.Science: return "cyan"
  }
}

export default function ThemeBadge({ children, discipline }: { children: React.ReactNode, discipline: WorksDiscipline }) {
  return <span className={clsx(style.wrapper, getColor(discipline))}>{children}</span>;
}
