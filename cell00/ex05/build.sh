#!/bin/bash

if [ "$#" -eq 0 ]; then
    echo "No arguments supplied"
    exit 1
fi

for arg in "$@"
do
    folder="ex$arg"
    if [ -d "$folder" ]; then
        echo "Directory $folder already exists"
    else
        mkdir "$folder"
        echo "Created directory $folder"
    fi

    ls -ld "$folder"
done