import * as fs from 'fs';

let data = ``;
let envVarName = process.argv[2] || `GHENV_INPUT`;
const githubEnvFile = process.env[`GITHUB_ENV`] || `/tmp/GITHUB_ENV`;

process.stdin.resume();
process.stdin.setEncoding(`utf8`);
process.stdin.on(`data`, (chunk) => data += chunk);
process.stdin.on(`end`, () => {
  process.env[envVarName] = data.trim();
  fs.appendFileSync(githubEnvFile, `${envVarName}<<${process.env[`EOF`]}\n${data}\n${process.env[`EOF`] || `EOF`}\n`);
  console.log(process.env[envVarName]);
  process.exit(0);
});

setInterval(() => console.error(`working`), 1e3);
