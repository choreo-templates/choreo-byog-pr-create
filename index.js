import * as core from '@actions/core';
import {GitHubService} from "./github.service.js";

try {
    const defaultBranch = core.getInput('defaultBranch') || "main";
    const token = core.getInput('token');
    const org = core.getInput('org');
    const userRepoName = core.getInput('userRepoName');
    const branch = core.getInput('branch');
    const title = core.getInput('title');
    const githubService = new GitHubService(token, org, userRepoName)
    const body = core.getInput('body');
    const labels = core.getInput('labels');

    githubService.createPullRequest(title, body || "Choreo created PR", branch, defaultBranch, labels)
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
