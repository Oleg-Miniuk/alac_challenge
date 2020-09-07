const util = require('util');
const exec = util.promisify(require('child_process').exec);

const build = async () => {
  try {
    const { stdout, stderr } = await exec('npm run build');
    console.log('build stdout:', stdout);
    console.log('build stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
};

const archive = async () => {
  try {
    const { stdout, stderr } = await exec('7z a ./dist/app.zip ./dist/ ./package.json ./package-lock.json');
    console.log('archive stdout:', stdout);
    console.log('archive stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
};

const uploadToAWSEb = async () => {
  try {
    const { stdout, stderr } = await exec('eb deploy');
    console.log('archive stdout:', stdout);
    console.log('archive stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
};

const deploy = async () => {
  await build();
  await archive();
  await uploadToAWSEb();
};

deploy();
