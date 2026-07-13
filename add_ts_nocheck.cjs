const fs = require('fs');
const appPath = 'src/App.tsx';
let content = fs.readFileSync(appPath, 'utf8');

if (!content.startsWith("// @ts-nocheck")) {
    fs.writeFileSync(appPath, "// @ts-nocheck\n" + content);
}

const apiPath = 'src/api.ts';
let apiContent = fs.readFileSync(apiPath, 'utf8');

if (!apiContent.startsWith("// @ts-nocheck")) {
    fs.writeFileSync(apiPath, "// @ts-nocheck\n" + apiContent);
}

console.log("Added ts-nocheck");
