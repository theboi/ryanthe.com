enum Notability {
  High, Medium, Low
}

enum Discipline {
  Computing,Design,Engineering,English,Humanities,Innovation,Leadership,Math,Robotics,Science
}

enum Type {
  Certification,Competition,Project,Service,Title
}

export interface WorkProperties {
  lastEdited: string;
  id: string;
  name: string;
  fullName: string;
  date: string;
  recognition: string;
  url: string;
  writeUp: string;
  media: any;
  notability: Notability;
  discipline: Discipline[];
  type: Type[];
}

export function getWorkProperties(entry): WorkProperties {
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
    media: entry.properties["Media"]?.files.map((f) => ({
      name: f.name,
      url: f.external == "external" ? f.external.url : f.file.url
    })),
    notability: entry.properties["Notability"]?.select?.name ?? "Low",
    discipline: entry.properties["Discipline"]?.multi_select.map(o => o?.name ?? "") ?? [],
    type: entry.properties["Type"]?.multi_select.map(o => o?.name ?? "") ?? [],
  })
}