# 🥝 Kiwi

> Seamless syncing for Design Wikis

Kiwi was specifically designed to handle automatic Wiki deploys for [Help Scout's](https://www.helpscout.com/) Design System.

## Setup

Add the following global environment variables to your build/CI tool:

```
GITHUB_USER = bob_belcher_2019
GITHUB_REPO = baby-you-can-chive-my-car-burger
TOKEN = CV9$Xc]6iZVJRJiE*uV6MooXg
```

##### `GITHUB_USER`

The Github user name of your repository.

##### `GITHUB_REPO`

The Github repository name.

##### `TOKEN`

Your super secret [Github personal access token](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

## Usage

Once you have the above ☝️ set up (it's very important!), all you have to do is run:

```
npx @helpscout/kiwi
```
