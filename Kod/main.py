from kivy.app import App
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.lang import Builder

Builder.load_string("""
<MainScreen>:
    BoxLayout:
        orientation: 'vertical'
        Label:
            text: 'Where is Mnemo?'
        Button:
            text: 'SETS'
            background_color: [0, 1, 0, 1]
            on_press: root.manager.current = 'sets'
        Button:
            text: 'TESTS'
            background_color:[0, 0.75, 0, 1]
            on_press: root.manager.current = 'tests'


<SetsScreen>:
    BoxLayout:
        orientation: 'vertical'
        Label:
            text: 'Sets'
        Button:
            text: 'Add'
            background_color: [0, 0.8, 0, 1]
        Button:
            text: 'Remove'
            background_color: [0.75, 0, 0, 1]
        Button:
            text: 'Back'
            on_press: root.manager.current = 'main'
<TestsScreen>:
    BoxLayout:
        orientation: 'vertical'
        Label:
            text: 'Tests'
        Button:
            text: 'Add'
            background_color: [0, 0.8, 0, 1]
        Button:
            text: 'Remove'
            background_color: [0.75, 0, 0, 1]
        Button:
            text: 'Back'
            on_press: root.manager.current = 'main'
""")


class MainScreen(Screen):
    pass


class SetsScreen(Screen):
    pass


class TestsScreen(Screen):
    pass


sm = ScreenManager()
sm.add_widget(MainScreen(name='main'))
sm.add_widget(SetsScreen(name='sets'))
sm.add_widget(TestsScreen(name='tests'))
sm.current = 'main'


class MainApp(App):
    def build(self):
        return sm


if __name__ == '__main__':
    MainApp().run()
