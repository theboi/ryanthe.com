import { Project } from "../../../data/project";
import ProjectItem from "./projectItem";
import style from "./style.module.scss";

const placeholderProjects: Project[] = [
  {
    id: "1",
    name: "Project 1",
    description: "Description 1",
    imageURL: "https://picsum.photos/200/300",
    projectURL: "https://example.com/project1",
  },
  {
    id: "2",
    name: "Project 2",
    description: "Description 2",
    imageURL: "https://picsum.photos/200/300",
    projectURL: "https://example.com/project2",
  },
  {
    id: "3",
    name: "Project 3",
    description: "Description 3",
    imageURL: "https://picsum.photos/200/300",
    projectURL: "https://example.com/project3",
  },
];

export default function ProjectsPage() {
  return (
    <div className={style.main}>
      <header className={style.header}>
        <h1>Projects</h1>
      </header>
      <div className={style.projectsListing}>
        {/* use ProjectItem */}
        {placeholderProjects.map((project) => {
          return <ProjectItem key={project.id} project={project} />;
        })}
      </div>
    </div>
  );
}
