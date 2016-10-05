import Objects
import os
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.app import App
from kivy.uix.selectableview import SelectableView
from kivy.uix.gridlayout import GridLayout


setsArray = Objects.rescan()

class SetsListItem(SelectableView, GridLayout):
    def remove_press(self, setName):
        print(setName)
    pass

class MainScreen(Screen):
    pass

class SetsScreen(Screen):
    sets = []
    for set in setsArray:
        sets.append({'name': set.name, 'icon': os.getcwd().replace("\\", "/") + str(set.icon)})

    def sets_converter(self, row_index, sets):
        return {'text': sets['name'],
                'icon': sets['icon'],
                'size_hint_y': None,
                'height': 50}
    pass


class TestsScreen(Screen):
    pass


class ScreenManagement(ScreenManager):
    pass

presentation = Builder.load_file("main.kv")


class MainApp(App):
    def build(self):
        return presentation


if __name__ == '__main__':
    #setsArray[1].export()
    # setsArray = Objects.rescan()
    # print(setsArray[1].to_json())
    MainApp().run()
