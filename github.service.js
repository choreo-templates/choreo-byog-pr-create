import {Octokit} from "@octokit/core";

class GitHubService {
    constructor(authToken, org, repo) {
        this.authToken = authToken;
        this.org = org;
        this.repo = repo;
        this.octokit = new Octokit({
            auth: this.authToken
        });
    }

    async createPullRequest(title, body, head, base, labels) {
        try {
            console.log(`Creating pull request for ${this.org}/${this.repo} with title: ${title}`);
            const createPrRes = await this.octokit.request('POST /repos/{owner}/{repo}/pulls', {
                owner: this.org,
                repo: this.repo,
                title: title,
                body: body,
                head: head,
                base: base
            });
            console.log(`Created pull request`);

            // add labels to the pull request
            if (labels && createPrRes) {
                var labelArr = labels.split(",").map(item => item.trim());
                await octokit.request('POST /repos/{owner}/{repo}/issues/{issue_number}/labels', {
                    owner: this.org,
                    repo: this.repo,
                    issue_number: createPrRes.data.number,
                    labels: labelArr,
                });
            }
            
            return createPrRes;
        } catch (e) {
            console.error(`Error creating pull request: ${e.message}`);
            throw e;
        }
    }

}

export {GitHubService};
