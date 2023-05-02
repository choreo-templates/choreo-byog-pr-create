import * as core from '@actions/core';
import {GitHubService} from "./github.service.js";
import {BitbucketService} from "./bitbucket.service.js";

try {
    const defaultBranch = core.getInput('defaultBranch') || "main";
    const token = core.getInput('token');
    const org = core.getInput('org');
    const userRepoName = core.getInput('userRepoName');
    const branch = core.getInput('branch');
    const title = core.getInput('title');
    const body = core.getInput('body');
    const labels = core.getInput('labels');
    const gitProvider = core.getInput('gitProvider') || "github";
    const username = core.getInput('username');

    if (gitProvider == "github") {
        const githubService = new GitHubService(token, org, userRepoName)
        githubService.createPullRequest(title, body || "Choreo created PR", branch, defaultBranch, labels)
            .then((res) => {
                console.log(`Created PR`);
                core.setOutput('status', 'success');
        });
    } else if (gitProvider == "bitbucket") {
        const bitbucketService = new BitbucketService(token, username, org, userRepoName);
        bitbucketService.createPullRequest(title, body || "Choreo created PR", branch, defaultBranch, labels)
            .then((res) => {
                console.log(`Created PR`);
                core.setOutput('status', 'success');
        });
    } else {
        core.setOutput("choreo-status", "failed");
        core.setFailed("Invalid git provider");
        console.log("choreo-status", "failed");
        console.log("Invalid git provider");
    }
} catch (e) {
    core.setOutput("choreo-byog-pr-create-status", "failed");
    core.setFailed(e.message);
    console.log("choreo-byog-pr-create-status", "failed");
    console.log(e.message);
}
