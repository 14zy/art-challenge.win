Vue.component('game', {
  template: `
  <div>
    <top-bar></top-bar>
    <question></question>
  </div>
  `
})

Vue.component('top-bar', {
  template: `
  <div class="container-fluid">

    <div class="row">
      <div class="col-2 text-left">
        <p @click="window.history.back();" class="pl-1 pt-3">🔙</p>
      </div>

      <div class="col-8 text-center">
        <div class="pt-3">
          <span v-for="question in questions">{{question}}</span>
        </div>
      </div>

      <div class="col-2 text-right">
        <p @click="alert('Settings will be there')" class="pt-3 pr-1">⚙️</p>
      </div>
    </div>
  </div>
  `,
  data: function() {
    return questions = 10;
  }
});

Vue.component('question', {
  template: `
  <div>
    <div class="px-3">
      <painting></painting>
    </div>
    <div class="pt-4">
      <answers></answers>
    </div>
  </div>
  `
});

Vue.component('painting', {
  template: `
  <div>
    <img style="width: 100%; height: auto; box-shadow: 0 3px 2px #777;" src="http://artchallenge.me/painters/36/184.jpg"/>
  </div>
  `
});

Vue.component('answers', {
  template: `
  <div>
    <painterBtn v-for="painter in possiblePainters" :painter="painter"></painterBtn>
  </div>
  `,
  computed: {
    possiblePainters() {
      // return ['Белучи', "Хуючи", "Петручи", "Талучи"]
      return this.$root.paintersSet
    }
  }
});

Vue.component('painterBtn', {
  props: ["painter"],
  template: `
  <div class="card p-2" style="border-radius: 0" @click="answer();">
    <div class="card-block">
      <div class="row mr-0">
        <div class="col-2 text-right">
          <img width="60" :src="'img/painters/' + painter.id + '.png'" />
        </div>
        <div class="col-6">
          <span class="small">{{ painter.name.split(" ")[0] }}</span>
          <h4>{{ painter.name.split(" ").pop() }}</h4>
        </div>
        <div class="col-4 text-right text-nowrap pr-0">
          <img width="20" class='mb-1' :src="'img/nationality/' + painter.nationality[0] + '.png'" />
          <br>
          <span class="small pr-1">{{ painter.years }}</span>
        </div>
      </div>
    </div>
  </div>
  `,
  methods: {
   answer: function () {
     if (1 == 1) {
       swal(this.painter.name,'You are awesome!', 'success')
       // emit rightAnswer
     } else {
       swal('Oops!','Gustav Klimt' + ' was correct answer', 'error')
       // emit wrongAnswer
     }
   }
 },
});

var router = new VueRouter({
    mode: 'history',
    routes: []
});

var app = new Vue({
    router,
    el: '#app',
    data: {
        loading: false,
        quests: [
          {id: "monet", difficult: "easy", title: "Monet or Manet?", description: "Know the difference in 2 minutes", painters: [24,21], completed: true, hidden: false},
          {id: "picasso", difficult: "easy", title: "Picasso or Dali?", description: "Know the difference in 2 minutes", painters: [24,21], completed: false, hidden: false},
          {id: "popular", difficult: "basic", title: "Popular painters", description: "Know the difference in 2 minutes", painters: [1, 4, 7, 9, 14, 15, 17, 19, 21, 22, 24, 26, 27, 28, 29, 30, 32, 33, 34, 35, 36, 39, 40, 41, 42, 43, 45, 46, 49, 50, 53, 54, 55, 57, 58, 61, 62, 63, 69, 72, 73, 75, 77, 79, 80, 82, 83, 94, 95, 112, 118], completed: false, hidden: false},
          {id: "french", difficult: "basic", title: "French painters", description: "Know the difference in 2 minutes", painters: [2, 9, 17, 30, 36, 40, 49, 53, 57, 58, 61, 64, 65, 69, 70, 73, 75, 77, 93, 94, 96, 97], completed: false, hidden: false},
          {id: "russian", difficult: "basic", title: "Russian painters", description: "Know the difference in 2 minutes", painters: [3, 4, 5, 6, 8, 10, 11, 12, 13, 16, 19, 20, 23, 25, 26, 27, 37, 38, 44, 47, 48, 76, 81, 84, 85, 86, 103, 105, 107, 109, 113, 115], completed: false, hidden: false},
          {id: "all", difficult: "hard", title: "All painters", description: "Know the difference in 2 minutes", painters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116], completed: false, hidden: false},
        ],
        paintersSet: [
          {  "id": 1,
             "name": "Amedeo Modigliani",
             "years": "1884 - 1920",
             "nationality": ["Italy"],
             "paintings": 193
          },
          {  "id": 2,
             "name": "Henri Lebasque",
             "years": "1865 - 1937",
             "nationality": ["France"],
             "paintings": 119
          },
          {  "id": 3,
             "name": "Arkhip Kuinji",
             "years": "1842 - 1910",
             "nationality": ["Russia"],
             "paintings": 179
          },
          {  "id": 4,
             "name": "Vasiliy Kandinskiy",
             "years": "1866 - 1944",
             "nationality": ["Russia"],
             "paintings": "88"
          }
        ]
    },
    mounted: function() {

       if (this.$route.path == "/game.html") {
         if (this.$route.query.quest) {
           console.log(this.$route.query.quest);

           // Загружаем художников из текущего режима в PaintersSet
           // Генерим случайного на начало раунда
           // Генерим ответы
           //
         }
       }

     },
    methods: {
        // buttonClick: function() {
        //     this.seen = !this.seen;
        // }
    }
});
