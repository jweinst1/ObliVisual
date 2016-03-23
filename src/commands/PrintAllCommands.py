#python script that prints all commands in the JSON trie

import json


def visit_child_nodes(dict):
    pass

mark = "DONE$"

commands = []
currentcommand = []

with open("commands.json", 'r') as wordbase:
    commands = json.loads(wordbase.read())
    trie = commands

