Vue.component('quest', {
  props: ['quest'],
  // computed: {
  //       countPainters() {
  //         return this.quest.painters.length
  //       }
  //     },
  template: `
  <div class="card p-2 mb-3" @click="app.loading = true; setTimeout(function(){window.location.href='game.html?quest='+quest.id},500);">
    <div class="card-block">
      <div class="row">
        <div class="col-8"><h4>{{quest.title}}</h4></div>
        <div class="col-4 text-right">
          <span v-if="quest.completed">
            <img class="img-fluid" width="20" src="img/awards/2.png">
          </span>
          <span v-else>
            <img class="img-fluid" width="20" src="img/ui/play-icon.png">
          </span>
        </div>
      </div>
      {{quest.description}}
      <div class="row pt-2">
        <div class="col-4 text-left">{{quest.painters}} Painters</div>
        <div v-if='quest.difficult == "easy"' class="col-8 text-right text-success text-capitalize">
          {{quest.difficult}}
        </div>
        <div v-else-if='quest.difficult == "basic"' class="col-8 text-right text-primary text-capitalize">
          {{quest.difficult}}
        </div>
        <div v-else-if='quest.difficult == "hard"' class="col-8 text-right text-danger text-capitalize">
          {{quest.difficult}}
        </div>
      </div>
    </div>
  </div>
  `,
  // filters: {
  //   capitalize: function (value) {
  //     if (!value) return ''
  //     value = value.toString()
  //     return value.charAt(0).toUpperCase() + value.slice(1)
  //   }
  // }
});



Vue.component('quests-list', {
  template: `
  <div>
    <quest v-for="quest in this.$root.quests" :quest="quest"></quest>
  </div>
  `
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
          {id: "monet", difficult: "easy", title: "Monet or Manet?", description: "Know the difference in 2 minutes", painters: 2, completed: true, hidden: false},
          {id: "picasso", difficult: "easy", title: "Picasso or Dali?", description: "Know the difference in 2 minutes", painters: 2, completed: false, hidden: false},
          {id: "popular", difficult: "basic", title: "Popular painters", description: "Know the difference in 2 minutes", painters: 44, completed: false, hidden: false},
          {id: "french", difficult: "basic", title: "French painters", description: "Know the difference in 2 minutes", painters: 45, completed: false, hidden: false},
          {id: "russian", difficult: "basic", title: "Russian painters", description: "Know the difference in 2 minutes", painters: 46, completed: false, hidden: false},
          {id: "all", difficult: "hard", title: "All painters", description: "Know the difference in 2 minutes", painters: 47, completed: false, hidden: false},
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
