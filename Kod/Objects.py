import io
import json
import os

pathOuter = os.getcwd().replace("\\", "/")


class Card:
    """fiszka"""
    def __init__(self, front, back, color):
        self.id = 0
        self.front = front
        self.back = back
        self.color = color
        self.difficulty = 0.7

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__,  indent=4)

    def to_file(self, path):
        with io.open(path+"/"+str(self.id)+'.json', 'w+', encoding='utf-8') as f:
            f.write(self.to_json())


class Set:
    """zestaw"""
    def __init__(self, name, icon, description):
        self.name = name
        self.icon = icon
        self.description = description
        self.cardSet = []
        self.difficulty = 0.5
        self.path = "/resources/sets/"+self.name
        if not os.path.exists(pathOuter+self.path):
            os.mkdir(pathOuter+"/resources/sets/"+self.name)
       #self.refreshinfo()

    def to_json(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def addcard(self, card):
        self.cardSet.append(card)
        self.refreshinfo()

    def export(self):
        for card in self.cardSet:
            card.to_file(os.getcwd().replace("\\", "/")+self.path)

    def refreshinfo(self):
        diffsum = 0
        if len(self.cardSet) > 0:
            for card in self.cardSet:
                diffsum += card.difficulty
            self.difficulty = diffsum/len(self.cardSet)
        with io.open(pathOuter+self.path+'/.info.json', 'w+', encoding='utf-8') as f:
            f.write(self.to_json())


def rescan():
    sets_array = []
    path = pathOuter+"/resources/sets/"
    for setdir in os.listdir(path):
        tmpset = Set(setdir, 0, "")
        pathinner = path+"/"+setdir
        if os.path.isdir(pathinner):
            for card in os.listdir(pathinner):
                if os.path.isfile(pathinner+"/"+card):
                    with io.open(pathinner+"/"+card, 'r', encoding='utf-8') as f:
                        if card == ".DS_Store":
                            continue    
                        print (f)
                        info = json.load(f)
                        if card == ".info.json":
                                tmpset.name = info['name']

                                if info['icon'] == 0:
                                    tmpset.icon = "/resources/gui/icons/gears.png" #default icon
                                else:
                                    tmpset.icon = info['icon']
                                tmpset.description = info['description']
                                tmpset.difficulty = info['difficulty']
                                tmpset.refreshinfo()
                        else:
                            card = Card(info['front'], info['back'], info['color'])
                            card.difficulty = info['difficulty']
                            tmpset.addcard(card)
            sets_array.append(tmpset)
    return sets_array
