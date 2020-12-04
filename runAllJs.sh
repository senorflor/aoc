#! /usr/bin/env bash

# scope shopt in case sourced
(
  shopt -s globstar 2> /dev/null
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

  if [ ${#broken[@]} -eq 0 ]; then
    echo "EVERYTHING IS AWESOME"
  else
    echo "BROKEN SCRIPTS:"
    for broken_script in "${broken[@]}"
    do
      echo "$broken_script"
    done
  fi
)
