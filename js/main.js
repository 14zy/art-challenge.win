


Vue.component('quest', {
  props: ['quest'],
  computed: {
        countPainters() {
          return this.quest.painters.length
        }
      },
  template: `
  <div class="card p-2 mb-3" @click="app.loading = true; setTimeout(function(){window.location.href='game.html'},500);">
    <div class="card-block">
      <div class="row">
        <div class="col-8"><h4>{{quest.title}}</h4></div>
        <div class="col-4 text-right">
          <span v-show="quest.completed">
            <img class="img-fluid" width="20" src="img/awards/2.png">
          </span>
        </div>
      </div>
      {{quest.description}}
      <div class="row pt-2">
        <div v-show='quest.difficult == "easy"' class="col-8 text-success">
          {{quest.difficult | capitalize}}
        </div>
        <div v-show='quest.difficult == "basic"' class="col-8 text-primary">
          {{quest.difficult | capitalize}}
        </div>
        <div v-show='quest.difficult == "hard"' class="col-8 text-danger">
          {{quest.difficult | capitalize}}
        </div>
        <div class="col-4 text-right">{{countPainters}} Painters</div>
      </div>
    </div>
  </div>
  `,
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
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
        {id: "monet", difficult: "easy", title: "Monet or Manet?", description: "Know the difference in 2 minutes", painters: [24,21], completed: true, hidden: false},
        {id: "picasso", difficult: "easy", title: "Picasso or Dali?", description: "Know the difference in 2 minutes", painters: [24,21], completed: false, hidden: false},
        {id: "popular", difficult: "basic", title: "Popular painters", description: "Know the difference in 2 minutes", painters: [1, 4, 7, 9, 14, 15, 17, 19, 21, 22, 24, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 39, 40, 41, 42, 43, 45, 46, 49, 50, 53, 54, 55, 57, 58, 61, 62, 63, 69, 72, 73, 75, 77, 79, 80, 82, 83, 94, 95, 112, 118], completed: false, hidden: false},
        {id: "french", difficult: "basic", title: "French painters", description: "Know the difference in 2 minutes", painters: [2, 9, 17, 30, 36, 40, 49, 53, 57, 58, 61, 64, 65, 69, 70, 73, 75, 77, 93, 94, 96, 97], completed: false, hidden: false},
        {id: "russian", difficult: "basic", title: "Russian painters", description: "Know the difference in 2 minutes", painters: [3, 4, 5, 6, 8, 10, 11, 12, 13, 16, 19, 20, 23, 25, 26, 27, 37, 38, 44, 47, 48, 76, 81, 84, 85, 86, 103, 105, 107, 109, 113, 115], completed: false, hidden: false},
        {id: "all", difficult: "hard", title: "All painters", description: "Know the difference in 2 minutes", painters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116], completed: false, hidden: false},
        //сложность, список художников, картинка, описание, название, id, пройден/не пройден, secret
      ]
    }
  }
});


var app = new Vue({
    el: '#app',
    data: {
        message: "Hello World",
        loading: false,
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
  Загружается фулл-скрин анимация
  и переходит по ссылке вида #game_id_1

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
