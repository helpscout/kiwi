#!/usr/bin/bash

sync_wiki() {
  echo "Syncing $1..."
  # cd "../$1.wiki"
  # git clean -f -d
  # git checkout .
  # git pull
  # touch hello.md
  # echo "Weee!" > hello.md
  # git add .
  # git commit -m "update"
  # git push
  # cd -
}

sync_wiki hsds-core-ui
sync_wiki hsds-product-ui
sync_wiki hsds-marketing-ui
sync_wiki hsds-ios-ui
sync_wiki hsds-embed-ui