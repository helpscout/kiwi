# 🥝 Kiwi

> Seamless syncing for Design Github Wikis

Kiwi was specifically designed to handle automatic Wiki deploys for [Help Scout's](https://www.helpscout.com/) Design System.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Setup](#setup)
  - [CI Variables](#ci-variables)
  - [Git User](#git-user)
- [Usage](#usage)
- [Examples](#examples)
  - [Netlify](#netlify)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Setup

### CI Variables

Add the following global environment variables to your build/CI tool:

```
GITHUB_USER = bob_belcher_2019
GITHUB_REPO = baby-you-can-chive-my-car-burger
TOKEN = CV9$Xc]6iZVJRJiE*uV6MooXg
LOCAL_DIR = burger-project
```

##### `GITHUB_USER`

The Github user name of your repository.

##### `GITHUB_REPO`

The Github repository name.

##### `TOKEN`

Your super secret [Github personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

##### `LOCAL_DIR`

The directory of your (CI) local directory.

### Git User

Since Kiwi needs to push to a Github wiki, ensure that your environment's Git has been set up with a username and email:

```
git config --global user.email "bob@bobsburgers.com"
git config --global user.name "bob_belcher_2019"
```

## Usage

Once you have the above ☝️ set up (it's very important!), all you have to do is run:

```
npx @helpscout/kiwi
```

## Examples

### Netlify

For [Netlify](https://www.netlify.com/), you can create a simple `netlify.sh` file (or call it whatever you'd like 😍)

```
# Configures the Git name and email for the commits
git config --global user.email "bob@bobsburgers.com"
git config --global user.name "bob_belcher_2019"

# Set the environment variables
export GITHUB_USER=bob_belcher_2019
export GITHUB_REPO=baby-you-can-chive-my-car-burger
export TOKEN=CV9$Xc]6iZVJRJiE*uV6MooXg
export LOCAL_DIR=repo

# Runs Kiwi
npx @helpscout/kiwi

# Creates an empty page for Netlify to deploy
mkdir public
touch public/index.html
```

With that, you can set up the following:

- **Build command**: `sh netlify.sh`
- **Publish directory**: `public`
