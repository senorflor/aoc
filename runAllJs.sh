#! /usr/bin/env bash

declare -a broken
while read -r file; do
  echo $file
  pushd $(dirname "$file") > /dev/null
  node $(basename "$file")
  if [ $? -ne 0 ]; then
    broken+=( "$file" )
  fi
  popd > /dev/null
  echo
done < <(ls | grep -E '\d+' | xargs -I % find  % -name '*.js')
# ^ `ls` to `find` pipeline maintains per-day folder order

if [ ${#broken[@]} -eq 0 ]; then
  echo "EVERYTHING IS AWESOME"
else
  echo "BROKEN SCRIPTS:"
  for broken_script in "${broken[@]}"
  do
    echo "$broken_script"
  done
fi
unset broken # in case file is sourced
