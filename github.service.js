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

    async createPullRequest(title, body, head, base) {
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
            console.log(`Created pull request: ${createPrRes.data.html_url}`);
        } catch (e) {
            console.error(`Error creating pull request: ${e.message}`);
            throw e;
        }
    }

}

export {GitHubService};
