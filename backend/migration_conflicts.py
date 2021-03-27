#!/usr/bin/env python
import sys, os


all_prefixes = {}
for file in os.listdir("db/migrations"):
    prefix = file.split("_")[0]
    if prefix:
        if prefix in all_prefixes:
            print("A migration conflict was found for", prefix)
            sys.exit(1)
        all_prefixes[prefix] = True
