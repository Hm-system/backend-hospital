#!/bin/bash

# Check if at least one branch name was provided
if [ "$#" -lt 1 ]; then
  echo "Usage: $0 <branch-name1> [<branch-name2> ...]"
  exit 1
fi

# Loop through each provided branch name
for BRANCH_NAME in "$@"; do

  # Switch to the main branch
  git checkout main

  # Delete the branch locally
  git branch -d $BRANCH_NAME || echo "Local branch $BRANCH_NAME does not exist or is already deleted."

  # Check if the branch exists on the remote
  if git ls-remote --heads origin $BRANCH_NAME | grep -q $BRANCH_NAME; then
    git push origin --delete $BRANCH_NAME
  else
    echo "Remote branch $BRANCH_NAME does not exist or is already deleted. Requirement already satisfied."
  fi

done
