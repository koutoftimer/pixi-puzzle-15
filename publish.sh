#!/usr/bin/env bash

set -e

BUILD_DIR="build"
GIT_BRANCH="gh-pages"

if [[ $(git status -s) ]]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

echo "Deleting old publications"
rm -rf $BUILD_DIR
mkdir $BUILD_DIR
git worktree prune
rm -rf .git/worktrees/$BUILD_DIR

echo "Checking out $GIT_BRANCH branch into ./$BUILD_DIR/"
git worktree add -B $GIT_BRANCH $BUILD_DIR origin/$GIT_BRANCH

echo "Removing existing files"
rm -rf $BUILD_DIR/*

echo "Building.."
npm run build

echo "Updating $GIT_BRANCH branch"
cd $BUILD_DIR
git add --all
git commit -m "Publishing to $GIT_BRANCH (publish.sh)"
git push origin $GIT_BRANCH