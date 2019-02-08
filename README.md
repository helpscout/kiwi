# 🥝 Kiwi

> Seamless syncing for Design Wikis

Kiwi was specifically designed to handle automatic Wiki deploys for [Help Scout's](https://www.helpscout.com/) Design System.

## Setup

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

### Github Username/Email

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
