#!/usr/bin/bash

if ! command -v node &> /dev/null
then
    echo "[error]: nodejs not installed"
    exit
fi

node ./source/menu.js $@