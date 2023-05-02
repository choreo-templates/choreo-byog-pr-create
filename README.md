# choreo-byog-pr-create
Choreo BYOG Pull Request Create 

#### Sample Usage

```
    name: Create a PR on user repo
    uses: choreo-templates/choreo-byog-pr-create@v1.0.3
    with:
      token: ${{ secrets.APP_GH_TOKEN }}
      org: ${{ env.APP_ORG_NAME }}
      userRepoName: ${{ env.CHOREO_USER_APP }}
      branch: choreo-eeb34be5-bba9-4e98-8f53-118a8d10a01c
      title: Add Choreo related template and config files
      body: |-
        This pull request (PR) contains the metadata files required to connect this repository to Choreo. Merge this PR to proceed.
      defaultBranch: ${{ env.APP_BRANCH }}
      labels: ${{ env.COMPONENT_ID }}
```
