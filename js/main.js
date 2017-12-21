
Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
});

var app = new Vue({
    el: '#app',
    data: {
        message: "Hello World",
        food_items: ["hamburger", "hotdog", "fries"],
        seen: true,
        groceryList: [
            { text: 'Vegetables' },
            { text: 'Cheese' },
            { text: 'Whatever else humans are supposed to eat' }
        ]
    },
    methods: {
        buttonClick: function() {
            this.seen = !this.seen;
        }
    }
});




/*
Главный экран
  Список баннеров
    Баннер {картинка, текст, ссылка}
  Список уровней
    Уровень {сложность, список художников, картинка, описание, название, id, пройден/не пройден, secret}
  Рекламный блок

Экран игры
  Выбранный уровень
  Текущие очки
  Кнопки Назад и Опции
  Текущий вопрос
    Картина
    Название
    Художник
  Варианты ответов
    Имя
    Годы
    Страна
    Фото
  Экран правильного ответа
  Экран неправильного ответа (adunit)
  Экран победы текущего уровня

  Опции
    Язык
    Удалить данные
    Пожаловаься на картинку (?)
    Donate

  Подробнее о Картине

//////////////
Как это работает на VUE?

0) Показывем ему список уровней.
Чекаем localStorage, чтобы понять какие уровни у него пройдены

1) Человек выбирает уровень
  Переходит по ссылке вида #game_id_1

2) Начинается игра в этом уровне (идет анимаця)
  В текущем уровне генерим случайного художника и его картину
  Наполняем варианты ответов еще 3 художниками (в зависимости от сложности)

  Проверяем ответ, если парвильно +1, если нет -1, меньше 0 опуститься не может
  Если 10 ответов - показывем компонент Win, помечаем уровень как пройденный
  Если человек нажимает Next - запускаем следующий уровень
  Если нажимается Share - показываем системный деиалог по Share


Данные о пройденных уровнях сохраняются в localStorage
*/

// ===EXAMPLE===
//
// Vue.component('button-counter', {
//   props: ['title', 'body'],
//   template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
//   data: function () {
//     return {
//       counter: 0
//     }
//   },
//   methods: {
//     incrementCounter: function () {
//       this.counter += 1
//       this.$emit('increment')
//     },
//     hideMessage() {
//      this.isVisible = false;
//     }
//   }
// })
//
// new Vue({
//   el: '#counter-event-example',
//   data: {
//     total: 0
//   },
//   methods: {
//     incrementTotal: function () {
//       this.total += 1
//     }
//   }
// })
