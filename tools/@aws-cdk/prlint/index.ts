import { setFailed } from '@actions/core';
import { context } from '@actions/github';
import { Octokit } from '@octokit/core';
import { restEndpointMethods } from '@octokit/plugin-rest-endpoint-methods';
import * as linter from './lint';

async function run() {
  const token = process.env.GITHUB_TOKEN;
  const octokit = Octokit.plugin(restEndpointMethods);

  const client = new octokit({
    auth: token,
  }).rest.pulls;


  const prLinter = new linter.PullRequestLinter({
    client,
    owner: context.repo.owner,
    repo: context.repo.repo,
    number: context.issue.number,
  });

  try {
    await prLinter.validate()
  } catch (error) {
    setFailed(error.message);
  }
}

run()
