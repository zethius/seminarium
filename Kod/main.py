import Objects
from kivy.app import App
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager, Screen

setsArray = Objects.rescan()

class MainScreen(Screen):
    pass


class SetsScreen(Screen):
    setsNames = []
    for set in setsArray:
        setsNames.append(set.name)
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
    setsArray[1].export()
    # setsArray = Objects.rescan()
    # print(setsArray[1].to_json())
    MainApp().run()
