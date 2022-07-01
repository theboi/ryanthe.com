export enum WorksNotability {
  High,Medium,Low,Hidden,Incomplete
}

export enum WorksDiscipline {
  Computing,Design,Engineering,English,Humanities,Innovation,Leadership,Math,Robotics,Science
}

export enum Type {
  Certification,Competition,Project,Service,Title
}

export interface WorksFile {
  name: string;
  url: string;
}

export interface WorksProperties {
  lastEdited: string;
  id: string;
  name: string;
  fullName: string;
  date: string;
  recognition: string;
  url: string;
  writeUp: string;
  notability: WorksNotability;
  discipline: WorksDiscipline[];
  type: Type[];
  media: WorksFile[];
  blurImageURL: string;
  coverImageURL: string;
}

function getNotionFileURL(f): string {
  if (f == undefined) return null
  return f.type == "external" ? f.external.url : f.file.url
}

export function getWorkProperties(entry): WorksProperties {
  return ({
    lastEdited: entry.properties["Last Edited"]?.last_edited_time,
    id: entry.properties["ID"]?.rich_text.reduce((a,c) => a+c.plain_text, "") ||
      entry.properties["Name"]?.title.reduce((a,c) => a+c.plain_text, "") ||
      entry["id"],
    name: entry.properties["Name"]?.title.reduce((a,c) => a+c.plain_text, ""),
    fullName: entry.properties["Full Name"]?.rich_text.reduce((a,c) => a+c.plain_text, ""),
    date: entry.properties["Date"]?.date?.start ?? "",
    recognition: entry.properties["Recognition"]?.rich_text.reduce((a,c) => a+c.plain_text, ""),
    url: entry.properties["URL"]?.url ?? "",
    writeUp: entry.properties["Write-up"]?.rich_text.reduce((a,c) => a+c.plain_text, ""),
    notability: WorksNotability[(entry.properties["Notability"]?.select?.name ?? "Low") as keyof typeof WorksNotability],
    discipline: entry.properties["Discipline"]?.multi_select.map(o => WorksDiscipline[o?.name] ?? "") ?? [],
    type: entry.properties["Type"]?.multi_select.map(o => Type[o?.name] ?? "") ?? [],
    media: entry.properties["Media"]?.files.map((f) => ({
      name: f.name,
      url: getNotionFileURL(f)
    })),
    blurImageURL: getNotionFileURL(entry.properties["Blur Image"]?.files[0]),
    coverImageURL: getNotionFileURL(entry.properties["Cover Image"]?.files[0])
  })
}