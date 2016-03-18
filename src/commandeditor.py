# editor file for the json command storage


import json

class strie (object):

    def __init__(self):
        with open("commands.json", 'r') as wordbase:
            words = json.loads(wordbase.read())
            self.trie = words
    def __repr__(self):
        return str(self.trie)
    def statement(self, phrase):
        phrase = phrase.lower()
        words = phrase.split()
        current = self.trie
        while len(words) > 0:
            word = words.pop(0)
            if word in current.keys():
                current = current[word]
            else:
                current[word] = {}
                current = current[word]
    def istrue(self, phrase):
        phrase = phrase.lower()
        words = phrase.split()
        current = self.trie
        while len(words) > 0:
            word = words.pop(0)
            if word in current.keys():
                current = current[word]
            else:
                return False
        return True
    def savetrie(self):
        word_data = json.dumps(self.trie)
        with open("commands.json", 'w') as wordbase:
            wordbase.write(word_data)
            wordbase.close()
            return "Text is Stored"
    def processstring(self, string):
        return string.lower()
 #initializes the json tree
jsoneditor = strie()

while True:
    entry = input("json> ")
    if entry == "close":
        jsoneditor.savetrie()
        break
    #shows available trie
    elif entry == "show":
        for elem in jsoneditor.trie.keys():
            print(jsoneditor.trie[elem])
    else:
        jsoneditor.statement(entry)