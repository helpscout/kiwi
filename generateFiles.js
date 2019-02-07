const fs = require("fs");
const path = require("path");
const glob = require("glob");
const { log } = require("./utils");

const USAGE_DIR = "_Reference";

exports.generateFiles = async (repo = "") => {
  if (!repo) return;

  const mockupFiles = (await getMockupFiles(repo)).map(remapFileToProps(repo));

  log(`Generating markdown files for ${repo}...`);
  const template = generateTemplateFromFiles(repo)(mockupFiles);
  await writeTemplateToFile(repo)(template);

  log(`Created ${repo} wiki files!`);
};

const getRepoPath = repo => path.resolve(__dirname, "../", repo);
const getRepoWikiPath = repo => path.resolve(__dirname, "../", `${repo}.wiki/`);

const getMockupPath = repoPath => path.resolve(repoPath, USAGE_DIR);

const getMockupFiles = async repo => {
  const repoPath = getRepoPath(repo);
  const mockupPath = getMockupPath(repoPath);
  const mockupFilePath = path.join(mockupPath, "/**/*.png");

  return (await glob.sync(mockupFilePath)) || [];
};

const remapFileToProps = repo => file => {
  const fileDest = file.split(repo)[1];
  const fileName = path.basename(file);
  const name = fileName.replace(".png", "").trim();

  return {
    localPath: file,
    name,
    fileName,
    fileDest
  };
};

const getImagePath = repo => file => {
  const basePath = "https://github.com/helpscout/";
  const { fileDest } = file;

  return `${basePath}${repo}/blob/master${fileDest}`;
};

const encodeImagePath = imagePath => {
  return imagePath.replace(/\ /g, "%20");
};

const generateTemplateFromFiles = (repo, page) => files => {
  let template = "";

  files.forEach(file => {
    const { name, fileName } = file;
    const imagePath = getImagePath(repo)(file);
    const encodedImagePath = encodeImagePath(imagePath);

    template += `### ${name}\n`;
    template += `![${name} Usage](${encodedImagePath})\n\n`;
  });

  return template.trim();
};

const writeTemplateToFile = repo => async template => {
  const wikiPath = getRepoWikiPath(repo);
  const destPath = path.join(wikiPath, "Home.md");

  try {
    fs.writeFileSync(destPath, template);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
