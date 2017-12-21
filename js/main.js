
Vue.component('quest', {
  props: ['quest'],
  computed: {
        countPainters() {
          return 56 //this.quest.id//'#' + this.name;
        }
      },
  template: `
  <div class="card p-2 mb-3">
    <div class="card-block">
      <div class="row">
        <div class="col-8"><h4>{{quest.title}}</h4></div>
        <div class="col-4 text-right">{{quest.completed}}</div>
      </div>
      {{quest.description}}
      <div class="row pt-2">
        <div class="col-8">{{quest.difficult}}</div>
        <div class="col-4 text-right">{{countPainters}}</div>
      </div>
    </div>
  </div>
  `
});

Vue.component('quests-list', {
  template: `
  <div>
    <quest v-for="quest in quests" :quest="quest"></quest>
  </div>
  `,
  data() {
    return {
      quests: [
        {id: "monet", difficult: "easy", title: "Monet or Manet?", description: "Know the difference in 2 minutes", painters: [24,21,23,12,1,2], completed: false, hidden: false},
        {id: "picasso", difficult: "easy", title: "Picasso or Dali?", description: "Know the difference in 2 minutes", painters: [24,21,23,12,1,2], completed: false, hidden: false},
        {id: "popular", difficult: "basic", title: "Popular painters", description: "Know the difference in 2 minutes", painters: [24,21,23,12,1,2], completed: false, hidden: false},
        {id: "french", difficult: "basic", title: "French painters", description: "Know the difference in 2 minutes", painters: [24,21,23,12,1,2], completed: false, hidden: false},
        {id: "italian", difficult: "basic", title: "Italian painters", description: "Know the difference in 2 minutes", painters: [24,21,23,12,1,2], completed: false, hidden: false},
        {id: "all", difficult: "hard", title: "All painters", description: "Know the difference in 2 minutes", painters: [24,21,23,12,1,2], completed: false, hidden: false},
        //сложность, список художников, картинка, описание, название, id, пройден/не пройден, secret
      ]
    }
  }
});


var app = new Vue({
    el: '#app',
    // data: {
    //     message: "Hello World",
    //     food_items: ["hamburger", "hotdog", "fries"],
    //     seen: true,
    //     groceryList: [
    //         { text: 'Vegetables' },
    //         { text: 'Cheese' },
    //         { text: 'Whatever else humans are supposed to eat' }
    //     ]
    // },
    // methods: {
    //     buttonClick: function() {
    //         this.seen = !this.seen;
    //     }
    // }
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
