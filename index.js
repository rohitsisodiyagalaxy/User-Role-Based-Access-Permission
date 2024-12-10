const core = require('@actions/core');
const exec = require('child_process').execSync;

try {
  const environment = core.getInput('environment');
  console.log(`Deploying Next.js project to the ${environment} environment...`);

  // Install dependencies
  exec('npm install', { stdio: 'inherit' });

  // Build and export the project
  exec('npm run build', { stdio: 'inherit' });
  exec('npm run deploy', { stdio: 'inherit' });

  const deploymentURL = `https://your-deployment-url.com/${environment}`;
  core.setOutput('deployment_url', deploymentURL);
  console.log(`Deployment complete: ${deploymentURL}`);
} catch (error) {
  core.setFailed(`Deployment failed: ${error.message}`);
}
