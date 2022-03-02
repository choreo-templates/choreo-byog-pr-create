import * as core from '@actions/core';
import {GitHubService} from "./github.service.js";

const defaultBranch = "main";

try {
    const token = core.getInput('token');
    const org = core.getInput('org');
    const userRepoName = core.getInput('userRepoName');
    const branch = core.getInput('branch');
    const title = core.getInput('title');
    const githubService = new GitHubService(token, org, userRepoName)

    githubService.createPullRequest(title, "Choreo created PR", branch, defaultBranch)
        .then((res) => {
            console.log(`Created PR`);
            core.setOutput('status', 'success');
        })
        .catch(e => {
            core.setOutput('status', 'failure');
            console.error(`Error: ${e}`);
            core.setOutput('error', e.message);
        });
} catch (e) {
    core.setOutput("choreo-byog-pr-create-status", "failed");
    core.setFailed(e.message);
    console.log("choreo-byog-pr-create-status", "failed");
    console.log(e.message);
}
