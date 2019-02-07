const fs = require("fs");
const path = require("path");
const glob = require("fast-glob");
const { log } = require("./utils");

const githubUser = process.env.GITHUB_USER || "helpscout";

exports.generateFiles = async (repo = "") => {
  if (!repo) return;

  const mockupFiles = (await getMockupFiles(repo)).map(remapFileToProps(repo));
  const pages = getPagesFromFiles(mockupFiles);

  log(`Generating markdown files for ${repo}...`);

  await generateMarkdownFromPages(repo)(pages);

  log(`Created ${repo} wiki files!`);
};

const getRepoPath = repo => path.resolve(__dirname, "../", repo);
const getRepoWikiPath = repo => path.resolve(__dirname, "../", `${repo}.wiki/`);

const getMockupFilePaths = repoPath => [
  path.join(repoPath, "_Usage", "/**/*.png"),
  path.join(repoPath, "_References", "/**/*.png"),
  path.join(repoPath, "_Reference", "/**/*.png")
];

const getMockupFiles = async repo => {
  const repoPath = getRepoPath(repo);
  const mockupFilePaths = getMockupFilePaths(repoPath);

  return (await glob.sync(mockupFilePaths)) || [];
};

const remapFileToProps = repo => file => {
  const fileDest = file.split(repo)[1];
  const fileName = path.basename(file);
  const page = path
    .dirname(file)
    .split("/")
    .pop();
  const name = fileName.replace(".png", "").trim();

  return {
    localPath: file,
    name,
    page,
    fileName,
    fileDest
  };
};

const getPagesFromFiles = files => {
  const pages = {};

  files.forEach(file => {
    const pageName = file.page;
    if (!pages[pageName]) {
      pages[pageName] = [];
    }
    pages[pageName].push(file);
  });

  return pages;
};

const getImagePath = repo => file => {
  const basePath = `https://github.com/${githubUser}/`;
  const { fileDest } = file;

  return `${basePath}${repo}/blob/master${fileDest}`;
};

const encodeImagePath = imagePath => {
  return imagePath.replace(/\ /g, "%20");
};

const generateTemplateFromFiles = repo => files => {
  let template = "";

  files.forEach(file => {
    const { name } = file;
    const imagePath = getImagePath(repo)(file);
    const encodedImagePath = encodeImagePath(imagePath);

    template += `### ${name}\n`;
    template += `![${name} Usage](${encodedImagePath})\n\n`;
  });

  return template.trim();
};

const generateMarkdownFromPages = repo => async pages => {
  try {
    const writeTasks = [];

    Object.keys(pages).forEach(key => {
      const pageFileName = `${key}.md`;
      const files = pages[key];
      const markdown = generateTemplateFromFiles(repo)(files);

      writeTasks.push(writeMarkdownToFile(repo)(pageFileName, markdown));
    });

    await Promise.all(writeTasks);

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};

const writeMarkdownToFile = repo => async (fileName, content) => {
  const wikiPath = getRepoWikiPath(repo);
  const destPath = path.join(wikiPath, fileName);

  try {
    fs.writeFileSync(destPath, content);
    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
};
