const { marked } = require('marked')

function readyFileContent(fileName) {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    fs.readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function writeFile(html) {
  return new Promise((resolve, reject) => {
    const fs = require('fs');
    fs.writeFile('build/index.html', html, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const getHtmlFromTemplate = (body) => {
  return `
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>AIGC站点导航 - ChatGPT、New Bing、文心一言、Google Bard、Midjourney等</title>
    <style>
      a {
        color: #58a6ff;
      }
    </style>
</head>
<body>
    ${body}
</body>
</html>`
}

readyFileContent('README.md').then((source) => {
  const result = marked.parse(source);
  const html = getHtmlFromTemplate(result)
  writeFile(html);
})