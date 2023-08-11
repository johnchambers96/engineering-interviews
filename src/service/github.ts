export const getOrgRepos = (org: string): Promise<GetOrgsRepo[]> =>
  fetch(`https://api.github.com/orgs/${org}/repos`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  }).then((res) => res.json());
