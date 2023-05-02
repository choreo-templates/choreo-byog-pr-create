import axios from 'axios';

class BitbucketService {

    constructor(authToken, username, org, repo) {
        this.authToken = authToken;
        this.username = username;
        this.repo = repo;
        this.org = org;
    }

    async createPullRequest(title, body, head, base, labels) {
        try {
            console.log(`Creating pull request for ${this.org}/${this.repo} with title: ${title}`);
            const createPrRes = await axios({
                method: 'POST',
                url: `https://api.bitbucket.org/2.0/repositories/${this.org}/${this.repo}/pullrequests`,
                auth: {
                    username: this.username,
                    password: this.authToken
                },
                data: {
                    title: title,
                    description: body,
                    source: {
                        branch: {
                            name: head
                        }
                    },
                    destination: {
                        branch: {
                            name: base
                        }
                    }
                }
            });
            console.log(`Created pull request`);
            return createPrRes;
        } catch (e) {
            console.error(`Error creating pull request: ${e.message}`);
            throw e;
        }
    }
}

export {BitbucketService};
