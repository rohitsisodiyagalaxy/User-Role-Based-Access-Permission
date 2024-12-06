const core = require('@actions/core');
const exec = require('@actions/exec');

(async () => {
  try {
    // Install dependencies
    await exec.exec('npm', ['install']);

    // Build the Next.js project
    await exec.exec('npm', ['run', 'build']);

    // Output the success message
    core.setOutput('message', 'Next.js build completed successfully!');
  } catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
  }
})();
