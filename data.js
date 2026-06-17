// data.js — Все 29 тем Python Theory Map
export const categories = [
    { id: 'intro', title: 'Введение и Синтаксис', icon: 'play_circle' },
    { id: 'logic', title: 'Логика и Циклы', icon: 'route' },
    { id: 'collections', title: 'Структуры Данных', icon: 'data_object' },
    { id: 'functions', title: 'Функции и ООП', icon: 'functions' },
    { id: 'advanced', title: 'Продвинутые темы', icon: 'rocket_launch' },
    { id: 'tools', title: 'Инструменты', icon: 'build' }
];

export const topics = [
    // ═══ INTRO (5) ═══
    {
        id: 'setup', category: 'intro', level: 'basic',
        title: 'Установка и Начало', time: '5 мин',
        keywords: 'установка настройка начало python install path',
        desc: 'Настройка окружения, установка интерпретатора Python 3.14+ и первый запуск скрипта.',
        code: `# Проверка установки\npython --version\n\n# Запуск скрипта\npython script.py`,
        links: [
            { url: 'https://realpython.com/installing-python/', text: 'Real Python', primary: true },
            { url: 'https://www.python.org/downloads/', text: 'Python.org' },
            { url: 'https://learn.microsoft.com/ru-ru/windows/python/beginners', text: 'Microsoft' }
        ]
    },
    {
        id: 'variables', category: 'intro', level: 'basic',
        title: 'Переменные и Типы', time: '8 мин',
        keywords: 'переменные types data типы variable int float str bool',
        desc: 'Динамическая типизация, основные типы данных (int, float, str, bool), ссылки на объекты.',
        code: `name = "Python"\nage = 30\nprice = 19.99\nis_active = True`,
        links: [
            { url: 'https://docs.python.org/3/tutorial/introduction.html', text: 'Python Docs', primary: true },
            { url: 'https://realpython.com/python-variables/', text: 'Real Python' },
            { url: 'https://www.datacamp.com/tutorial/python-variables', text: 'DataCamp' }
        ]
    },
    {
        id: 'io', category: 'intro', level: 'basic',
        title: 'Ввод и Вывод', time: '6 мин',
        keywords: 'ввод вывод input print console f-string format',
        desc: 'Функции input() для получения данных, print() и f-strings для форматированного вывода.',
        code: `name = input("Имя: ")\nprint(f"Привет, {name}!")`,
        links: [
            { url: 'https://realpython.com/python-print/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/inputoutput.html', text: 'Python Docs' },
            { url: 'https://www.programiz.com/python-programming/input-output', text: 'Programiz' }
        ]
    },
    {
        id: 'strings', category: 'intro', level: 'basic',
        title: 'Строки', time: '10 мин',
        keywords: 'строки string текст методы f-string срезы slice unicode',
        desc: 'Индексация, срезы, методы строк, f-strings, неизменяемость, Unicode.',
        code: `s = "Hello"\nprint(s.upper())  # HELLO\nprint(s[1:4])     # ell\nprint(f"Длина: {len(s)}")`,
        links: [
            { url: 'https://realpython.com/python-strings/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/library/stdtypes.html#string-methods', text: 'Python Docs' },
            { url: 'https://www.geeksforgeeks.org/python-strings/', text: 'GeeksforGeeks' }
        ]
    },
    {
        id: 'numbers', category: 'intro', level: 'basic',
        title: 'Числа и Операции', time: '7 мин',
        keywords: 'числа математика arithmetic math операции int float complex',
        desc: 'Целые, вещественные, комплексные числа, арифметика, приоритет операций, интернирование.',
        code: `print(10 // 3)   # 3 (целое деление)\nprint(10 % 3)    # 1 (остаток)\nprint(2 ** 3)    # 8 (степень)`,
        links: [
            { url: 'https://realpython.com/python-numbers/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/library/stdtypes.html#numeric-types-int-float-complex', text: 'Python Docs' },
            { url: 'https://www.datacamp.com/tutorial/python-numbers', text: 'DataCamp' }
        ]
    },

    // ═══ LOGIC (2) ═══
    {
        id: 'conditions', category: 'logic', level: 'basic',
        title: 'Условия If / Else', time: '8 мин',
        keywords: 'условия if else elif логика and or not',
        desc: 'Условные конструкции if/elif/else, логические операторы, тернарный оператор.',
        code: `if age >= 18:\n    print("Взрослый")\nelif age >= 13:\n    print("Подросток")\nelse:\n    print("Ребёнок")`,
        links: [
            { url: 'https://realpython.com/python-conditional-statements/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/controlflow.html', text: 'Python Docs' },
            { url: 'https://www.programiz.com/python-programming/if-elif-else', text: 'Programiz' }
        ]
    },
    {
        id: 'loops', category: 'logic', level: 'basic',
        title: 'Циклы (For и While)', time: '10 мин',
        keywords: 'цикл for while loop break continue range enumerate',
        desc: 'Итерация for по последовательностям, while, break/continue, range(), enumerate().',
        code: `for i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\nwhile x > 0:\n    x -= 1`,
        links: [
            { url: 'https://realpython.com/python-for-loop/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/controlflow.html#for-statements', text: 'Python Docs' },
            { url: 'https://www.geeksforgeeks.org/loops-in-python/', text: 'GeeksforGeeks' }
        ]
    },

    // ═══ COLLECTIONS (4) ═══
    {
        id: 'lists', category: 'collections', level: 'basic',
        title: 'Списки (Lists)', time: '12 мин',
        keywords: 'списки list array методы срезы append sort',
        desc: 'Изменяемые последовательности, методы (append, extend, sort), срезы, производительность.',
        code: `nums = [1, 2, 3]\nnums.append(4)\nprint(nums[0])     # 1\nprint(nums[1:3])   # [2, 3]`,
        links: [
            { url: 'https://realpython.com/python-lists-tuples/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/datastructures.html#more-on-lists', text: 'Python Docs' },
            { url: 'https://www.dataquest.io/blog/python-data-structures-tutorial/', text: 'Dataquest' }
        ]
    },
    {
        id: 'tuples', category: 'collections', level: 'basic',
        title: 'Кортежи (Tuples)', time: '6 мин',
        keywords: 'кортежи tuple неизменяемый распаковка named tuple',
        desc: 'Неизменяемые последовательности, упаковка/распаковка, namedtuple, использование как ключей.',
        code: `point = (10, 20)\nx, y = point  # распаковка\nprint(point[0])  # 10`,
        links: [
            { url: 'https://realpython.com/python-lists-tuples/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/datastructures.html#tuples-and-sequences', text: 'Python Docs' },
            { url: 'https://www.geeksforgeeks.org/python-tuples/', text: 'GeeksforGeeks' }
        ]
    },
    {
        id: 'dicts', category: 'collections', level: 'basic',
        title: 'Словари (Dictionaries)', time: '12 мин',
        keywords: 'словари dictionary dict ключ значение items keys values defaultdict',
        desc: 'Пары ключ-значение, хеш-таблицы, методы, defaultdict, merge operator (|=).',
        code: `user = {"name": "Alex", "age": 25}\nprint(user["name"])      # Alex\nprint(user.get("email", "N/A"))`,
        links: [
            { url: 'https://realpython.com/python-dicts/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/datastructures.html#dictionaries', text: 'Python Docs' },
            { url: 'https://www.datacamp.com/tutorial/python-dictionaries', text: 'DataCamp' }
        ]
    },
    {
        id: 'sets', category: 'collections', level: 'medium',
        title: 'Множества (Sets)', time: '8 мин',
        keywords: 'множества set уникальные пересечение frozenset union intersection',
        desc: 'Уникальные элементы, операции (|, &, -, ^), frozenset, производительность поиска O(1).',
        code: `a = {1, 2, 3}\nb = {3, 4, 5}\nprint(a & b)  # {3} пересечение\nprint(a | b)  # {1,2,3,4,5} объединение`,
        links: [
            { url: 'https://realpython.com/python-sets/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/datastructures.html#sets', text: 'Python Docs' },
            { url: 'https://www.programiz.com/python-programming/set', text: 'Programiz' }
        ]
    },

    // ═══ FUNCTIONS & OOP (5) ═══
    {
        id: 'functions', category: 'functions', level: 'basic',
        title: 'Функции', time: '15 мин',
        keywords: 'функции def arguments args kwargs return scope',
        desc: 'def, аргументы (positional, keyword, default), return, области видимости, *args и **kwargs.',
        code: `def greet(name, age=18):\n    return f"Привет, {name}!"\n\ngreet("Alex")\ngreet(name="Bob")`,
        links: [
            { url: 'https://realpython.com/defining-your-own-python-function/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions', text: 'Python Docs' },
            { url: 'https://www.datacamp.com/tutorial/python-functions', text: 'DataCamp' }
        ]
    },
    {
        id: 'lambda', category: 'functions', level: 'medium',
        title: 'Lambda функции', time: '8 мин',
        keywords: 'lambda лямбда анонимные функции map filter sorted',
        desc: 'Анонимные функции, lambda, использование с map(), filter(), sorted(), reduce().',
        code: `square = lambda x: x ** 2\nprint(square(5))  # 25\n\nnums = [3, 1, 2]\nsorted(nums, key=lambda x: -x)`,
        links: [
            { url: 'https://realpython.com/python-lambda/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/controlflow.html#lambda-expressions', text: 'Python Docs' },
            { url: 'https://www.geeksforgeeks.org/python-lambda-anonymous-functions-filter-reduce-map/', text: 'GeeksforGeeks' }
        ]
    },
    {
        id: 'comprehension', category: 'functions', level: 'medium',
        title: 'List Comprehension', time: '10 мин',
        keywords: 'list dict set comprehension генераторы списков',
        desc: 'Синтаксис [x for x in iterable if ...], dict/set comprehensions, вложенные генераторы.',
        code: `squares = [x**2 for x in range(5)]\n# [0, 1, 4, 9, 16]\n\nevens = [x for x in range(10) if x % 2 == 0]`,
        links: [
            { url: 'https://realpython.com/list-comprehension-python/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions', text: 'Python Docs' },
            { url: 'https://www.programiz.com/python-programming/list-comprehension', text: 'Programiz' }
        ]
    },
    {
        id: 'classes', category: 'functions', level: 'medium',
        title: 'Классы и Объекты', time: '15 мин',
        keywords: 'классы объекты oop __init__ self dataclass',
        desc: 'Классы, объекты, __init__, self, атрибуты, @dataclass, магические методы.',
        code: `class Person:\n    def __init__(self, name):\n        self.name = name\n    \n    def greet(self):\n        print(f"Hi, {self.name}!")`,
        links: [
            { url: 'https://realpython.com/python3-object-oriented-programming/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/classes.html', text: 'Python Docs' },
            { url: 'https://www.datacamp.com/courses/object-oriented-programming-in-python', text: 'DataCamp' }
        ]
    },
    {
        id: 'inheritance', category: 'functions', level: 'medium',
        title: 'Наследование', time: '12 мин',
        keywords: 'наследование oop super override polymorphism mro',
        desc: 'class Child(Parent), super(), переопределение методов, MRO, множественное наследование.',
        code: `class Student(Person):\n    def __init__(self, name, grade):\n        super().__init__(name)\n        self.grade = grade`,
        links: [
            { url: 'https://realpython.com/inheritance-composition-python/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/classes.html#inheritance', text: 'Python Docs' },
            { url: 'https://python-course.eu/oop/inheritance.php', text: 'Python Course' }
        ]
    },

    // ═══ ADVANCED (7) ═══
    {
        id: 'files', category: 'advanced', level: 'medium',
        title: 'Работа с файлами и Pathlib', time: '12 мин',
        keywords: 'файлы file read write open with pathlib path',
        desc: 'Модуль pathlib (современный подход), open(), чтение/запись, контекстный менеджер.',
        code: `from pathlib import Path\n\npath = Path("file.txt")\npath.write_text("Hello!")\ncontent = path.read_text()`,
        links: [
            { url: 'https://realpython.com/python-pathlib/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/library/pathlib.html', text: 'Python Docs' },
            { url: 'https://oneuptime.com/blog/post/2026-01-27-use-pathlib-for-file-paths-python/view', text: 'OneUptime 2026' }
        ]
    },
    {
        id: 'exceptions', category: 'advanced', level: 'medium',
        title: 'Обработка Исключений', time: '10 мин',
        keywords: 'ошибки исключения exceptions try except finally raise',
        desc: 'try/except/else/finally, свои исключения, best practices (fail fast, EAFP).',
        code: `try:\n    result = 10 / 0\nexcept ZeroDivisionError as e:\n    print(f"Ошибка: {e}")\nfinally:\n    print("Завершено")`,
        links: [
            { url: 'https://realpython.com/ref/best-practices/exception-handling/', text: 'Real Python Best Practices', primary: true },
            { url: 'https://docs.python.org/3/tutorial/errors.html', text: 'Python Docs' },
            { url: 'https://derekarmstrong.dev/blog/professional-guide-to-python-exception-handling/', text: 'Derek Armstrong 2025' }
        ]
    },
    {
        id: 'decorators', category: 'advanced', level: 'advanced',
        title: 'Декораторы', time: '15 мин',
        keywords: 'декораторы decorator @wrapper functools wraps',
        desc: 'Функции-обёртки, @decorator, functools.wraps, декораторы с аргументами, классовые.',
        code: `from functools import wraps\n\ndef timer(func):\n    @wraps(func)\n    def wrapper(*args):\n        # замер времени\n        return func(*args)\n    return wrapper`,
        links: [
            { url: 'https://realpython.com/primer-on-python-decorators/', text: 'Real Python', primary: true },
            { url: 'https://www.freecodecamp.org/news/the-python-decorator-handbook/', text: 'freeCodeCamp Handbook' },
            { url: 'https://www.datacamp.com/tutorial/decorators-python', text: 'DataCamp' }
        ]
    },
    {
        id: 'generators', category: 'advanced', level: 'advanced',
        title: 'Генераторы (yield)', time: '12 мин',
        keywords: 'генераторы yield iterator итераторы generator expression',
        desc: 'Функции-генераторы, yield, yield from, генераторные выражения, ленивые вычисления.',
        code: `def count_up(n):\n    for i in range(n):\n        yield i\n\nfor num in count_up(3):\n    print(num)  # 0, 1, 2`,
        links: [
            { url: 'https://realpython.com/introduction-to-python-generators/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/howto/functional.html#generator-expressions-and-list-comprehensions', text: 'Python HOWTO' },
            { url: 'https://www.geeksforgeeks.org/generators-in-python/', text: 'GeeksforGeeks' }
        ]
    },
    {
        id: 'async', category: 'advanced', level: 'advanced',
        title: 'Async / Await', time: '20 мин',
        keywords: 'async await асинхронность asyncio coroutine event loop',
        desc: 'async def, await, asyncio.run(), корутины, задачи, TaskGroup (3.11+), best practices.',
        code: `import asyncio\n\nasync def fetch(url):\n    await asyncio.sleep(1)\n    return "data"\n\nasync def main():\n    async with asyncio.TaskGroup() as tg:\n        tg.create_task(fetch("url1"))`,
        links: [
            { url: 'https://realpython.com/async-io-python/', text: 'Real Python 2025', primary: true },
            { url: 'https://docs.python.org/3/library/asyncio.html', text: 'Python 3.14 Docs' },
            { url: 'https://chavkov.com/posts/python-async-await-practical-guide', text: 'Practical Guide 2025' }
        ]
    },
    {
        id: 'context', category: 'advanced', level: 'advanced',
        title: 'Контекстные менеджеры', time: '10 мин',
        keywords: 'context manager with __enter__ __exit__ contextlib',
        desc: 'Протокол __enter__/__exit__, contextlib, @contextmanager, асинхронные менеджеры.',
        code: `from contextlib import contextmanager\n\n@contextmanager\ndef timer():\n    start = time.time()\n    yield\n    print(time.time() - start)`,
        links: [
            { url: 'https://realpython.com/python-with-statement/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/library/contextlib.html', text: 'Python 3.14 Docs' },
            { url: 'https://www.freecodecamp.org/news/context-managers-in-python/', text: 'freeCodeCamp' }
        ]
    },
    {
        id: 'regex', category: 'advanced', level: 'advanced',
        title: 'Регулярные выражения', time: '15 мин',
        keywords: 'regex регулярные выражения re match search findall sub',
        desc: 'Модуль re, re.search, re.findall, re.sub, named groups, compiled patterns.',
        code: `import re\n\ntext = "Email: test@example.com"\nmatch = re.search(r'\\w+@\\w+\\.\\w+', text)\nprint(match.group())`,
        links: [
            { url: 'https://realpython.com/regex-python/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/howto/regex.html', text: 'Python Regex HOWTO' },
            { url: 'https://www.datacamp.com/tutorial/python-regular-expressions', text: 'DataCamp' }
        ]
    },

    // ═══ TOOLS (6) ═══
    {
        id: 'json-csv', category: 'tools', level: 'medium',
        title: 'JSON и CSV', time: '10 мин',
        keywords: 'json csv работа данные сериализация pandas',
        desc: 'json.load/dump, csv.DictReader, pandas для работы с данными.',
        code: `import json, csv\n\ndata = json.loads('{"name": "Alex"}')\nwith open("out.json", "w") as f:\n    json.dump(data, f, indent=2)`,
        links: [
            { url: 'https://realpython.com/python-json/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/library/json.html', text: 'Python Docs json' },
            { url: 'https://docs.python.org/3/library/csv.html', text: 'Python Docs csv' }
        ]
    },
    {
        id: 'modules', category: 'tools', level: 'basic',
        title: 'Модули и Пакеты', time: '8 мин',
        keywords: 'модули import from библиотеки пакет __init__',
        desc: 'Создание модулей, импорт (from, as), пакеты с __init__.py, относительные импорты.',
        code: `import math\nfrom datetime import datetime\nfrom mypackage import mymodule\n\nprint(math.pi)`,
        links: [
            { url: 'https://realpython.com/python-modules-packages/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/modules.html', text: 'Python Docs' },
            { url: 'https://www.geeksforgeeks.org/python-modules/', text: 'GeeksforGeeks' }
        ]
    },
    {
        id: 'pip', category: 'tools', level: 'basic',
        title: 'pip и PyPI', time: '8 мин',
        keywords: 'pip pypi пакеты установка требования requirements uv poetry',
        desc: 'Установка пакетов, requirements.txt, современные менеджеры: uv, Poetry, pipx.',
        code: `# Установка пакета\npip install requests\n\n# Сохранить зависимости\npip freeze > requirements.txt`,
        links: [
            { url: 'https://packaging.python.org/en/latest/tutorials/installing-packages/', text: 'PyPA Guide', primary: true },
            { url: 'https://pypi.org/', text: 'PyPI' },
            { url: 'https://realpython.com/what-is-pip/', text: 'Real Python' }
        ]
    },
    {
        id: 'venv', category: 'tools', level: 'basic',
        title: 'Виртуальное окружение', time: '6 мин',
        keywords: 'venv виртуальное окружение virtualenv uv',
        desc: 'venv, изоляция проектов, активация, современные альтернативы: uv, Poetry, conda.',
        code: `# Создать окружение\npython -m venv .venv\n\n# Активировать (Linux/Mac)\nsource .venv/bin/activate`,
        links: [
            { url: 'https://realpython.com/python-virtual-environments-a-primer/', text: 'Real Python', primary: true },
            { url: 'https://docs.python.org/3/tutorial/venv.html', text: 'Python Docs' },
            { url: 'https://docs.astral.sh/uv/', text: 'uv (Modern)' }
        ]
    },
    {
        id: 'git', category: 'tools', level: 'basic',
        title: 'Git: Основы', time: '10 мин',
        keywords: 'git контроль версий commit branch merge',
        desc: 'Система контроля версий, commit, branch, merge, rebase, .gitignore.',
        code: `git init\ngit add .\ngit commit -m "Initial commit"\ngit branch feature\ngit checkout feature`,
        links: [
            { url: 'https://realpython.com/python-git/', text: 'Real Python', primary: true },
            { url: 'https://git-scm.com/doc', text: 'Git Official Docs' },
            { url: 'https://www.freecodecamp.org/news/learn-the-basics-of-git-in-under-10-minutes-da548267cc91/', text: 'freeCodeCamp' }
        ]
    },
    {
        id: 'typehints', category: 'tools', level: 'advanced',
        title: 'Type Hints (Аннотации типов)', time: '12 мин',
        keywords: 'type hints аннотации типов typing mypy pyright',
        desc: 'Аннотации, typing module, mypy, Pyright, Generic, Protocol, dataclasses.',
        code: `from typing import List, Optional\n\ndef greet(name: str) -> str:\n    return f"Hello, {name}!"\n\ndef get_item(items: List[int], idx: int) -> Optional[int]:\n    return items[idx] if idx < len(items) else None`,
        links: [
            { url: 'https://mypy-lang.org/', text: 'MyPy Official', primary: true },
            { url: 'https://realpython.com/python-type-checking/', text: 'Real Python' },
            { url: 'https://khaled-jallouli.medium.com/python-typing-in-2025-a-comprehensive-guide-d61b4f562b99', text: 'Comprehensive Guide 2025' }
        ]
    }
];