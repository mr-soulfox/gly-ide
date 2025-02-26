#!/usr/bin/env bash
root="$(pwd)"
cd include/gly-engine

echo "Building CLI"

./cli.sh cli-build
version="$(lua ./dist/cli.lua version)"
new_file="$root/public/engine/cli-$(
  echo "$version" | sed -r 's/[.]+/_/g'
).lua"

echo "Moving to -> $new_file"
touch $new_file

mv dist/cli.lua $new_file

echo "Updating .env version to current engine version."

cd $root
dot_env="$(cat .env)"

replace_this='VITE_ENGINE_VERSION=(\"\"|\"[0-9]{0,2}.[0-9]{0,2}.[0-9]{0,2}\"|\"[0-9]{0,2}\"|[^\n])'
replace_with="VITE_ENGINE_VERSION=\"$version\""
echo "$(echo "$dot_env" | sed -E "s/$replace_this/$replace_with/g")" >.env
