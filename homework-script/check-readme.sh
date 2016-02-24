#! /bin/sh

file="readme.md"
if [ -f "$file" ]
then
	echo "$file found."
else
	echo "$file not found."
	exit 1
fi
