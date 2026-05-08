import style from "./style.module.scss";

import Image from "next/image";
import { Project } from "../../../data/project";

export default function ProjectItem({ project }: { project: Project }) {
  return (
    <div className={style.projectItem}>
      <Image src={project.imageURL} alt="Project 1" width={150} height={150} />
      <p className={style.title}>{project.name}</p>
      <p className={style.desc}>{project.description}</p>
    </div>
  );
}
