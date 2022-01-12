import csv, json, re, itertools, os

def handleHeaderToKeys(it):
  return itertools.chain([re.sub(r"[- ]", "_", next(it).lower())], it)

contentData = {}
contentFileNames = os.listdir("./src/data/works/works")
for fileName in contentFileNames:
  if re.match(r".*\w{32}\.md", fileName):
    with open('./src/data/works/works/{}'.format(fileName), encoding='utf-8', mode='r') as fin:
      fileData = fin.read()
      title = re.match(r'# (.*)', fileData.split('\n')[0]).group(1)
      body = re.sub(r".+\n(\n.*: .*)+(\n\n)?", "", fileData, 1)
      contentData[title] = body

with open("./src/data/works/works.csv", encoding='utf-8-sig', mode='r') as fin:
  with open("./src/data/works/works.json", mode="w") as fout:
    csv_data = csv.DictReader(handleHeaderToKeys(fin))
    json_data = {}

    for (_i, row) in enumerate(csv_data):
      i = _i + 2
      
      try:
        k = re.sub(r"([^A-Za-z0-9_.\-~])+", "-", row.get("name").lower())
        row["key"] = k
        json_data[k] = row

        row["body"] = contentData[row["name"]]
      except:
        raise RuntimeError("Error occurred on Row {}. This error may or may not have been due to input data.".format(i))
    
    # print(json.dumps(json_data, indent=2))
    fout.write(json.dumps(json_data, indent=2))