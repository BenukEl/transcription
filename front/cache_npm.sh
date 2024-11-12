#!/usr/bin/bash 

mkdir cache
cd cache

for package in $(jq -r '.dependencies | keys[]' ../package.json); do
    npm pack $package
done

# Pour inclure aussi les devDependencies :
for package in $(jq -r '.devDependencies | keys[]' ../package.json); do
    npm pack $package
done
