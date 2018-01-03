Vue.component('game-screen', {
  template: `
  <div>
    <div class="container-fluid">
      <div class="row">
        <div class="col-2 text-left">
          <p @click="window.history.back();" class="pl-1 pt-3">🔙</p>
        </div>
        <div class="col-8 text-center">
          <div class="pt-3">
            <i class="text-success" v-for="correct in this.$root.correctAnswers">X</i><i v-for="questionMark in (this.$root.questions-this.$root.correctAnswers)">X</i><i>P</i>
          </div>
        </div>
        <div class="col-2 text-right">
          <p @click="swal('Settings will be here')" class="pt-3 pr-1">⚙️</p>
        </div>
      </div>
    </div>
    <question></question>
  </div>`
})

Vue.component('question', {
  template: `
  <div>
    <div class="px-3">
      <questionPicture></questionPicture>
    </div>
    <div class="py-4">
      <answers></answers>
    </div>
  </div>`
});

Vue.component('questionPicture', {
  template: `
  <div>
    <img class="painting" :src="pictureURL()"/>
  </div>`,
  methods: {
    pictureURL() {
      return "http://artchallenge.me/painters/"+this.$root.currentPainter.id+"/" + this.$root.currentPicture + ".jpg";
    }
  }
});

Vue.component('answers', {
  template: `
  <div class='mb-4'>
    <painterBtn v-for="painter in this.$root.currentAnswers" :painter="painter"></painterBtn>
  </div>`
});

Vue.component('painterBtn', {
  props: ["painter"],
  template: `
  <div class="card p-2" style="border-radius: 0" @click="answer(painter);">
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
  </div>`,
  methods: {
   answer: function (painter) {
     if (painter.id == this.$root.currentPainter.id) {
       if (app.correctAnswers == 9) {
         swal("STAR",'You are winner!', 'success');
         app.correctAnswers += 1;
         app.winner();
       } else {
         swal(this.painter.name,'You are awesome!', 'success');
         app.correctAnswers += 1;
         app.nextQuestion();
       }
     } else {
       swal('Oops!','It was ' + this.$root.currentPainter.name, 'error')
       app.correctAnswers = 0;
       app.endGame();
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
        currentQuest: "",
        questions: 10,
        correctAnswers: 0,
        questionsDB: [],
        currentPainter: "",
        currentPicture: "",
        currentAnswers: []
    },
    methods: {
        endGame: function() {
          app.nextQuestion();
        },
        winner: function() {
          console.log("winner is here");
        },
        randomPainter: function() {
          return this.questionsDB[Math.floor(Math.random() * this.questionsDB.length)]
        },
        nextQuestion: function() {
          this.currentPicture = "";
          //generate new question
          this.currentPainter = this.randomPainter();
          //generate new picture
          this.currentPicture = Math.floor(Math.random() * this.currentPainter.paintings);
          //generate new answers //need generate more answers (2/16)
          this.currentAnswers = [];
          this.currentAnswers.push(this.currentPainter);
          while (this.currentAnswers.length < 4) {
            if (this.currentAnswers.length == 1) {
              random = this.randomPainter();
              if (random.id != this.currentAnswers[0].id) {this.currentAnswers.push(random);}
            } else {
              random = this.randomPainter();
              var duplicate = false;
              for (var i = 0; i < this.currentAnswers.length; i++) {
                if (this.currentAnswers[i].id == random.id) {duplicate = true}
              };
              if (!duplicate) {this.currentAnswers.push(random);}
            }
          }
          shuffle(this.currentAnswers);
        },
        newRound: function() {
          this.nextQuestion();
        }
    },
    mounted: function() {
       if (this.$route.path == "/game.html") {
         if (this.$route.query.quest) {
           this.currentQuest = this.$route.query.quest;
           // TODO Загружаем художников из текущего режима в questionsDB
           this.questionsDB = [
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
           {  "id": 9,
              "name": "Claude Monet",
              "years": "1840 - 1926",
              "nationality": ["France"],
              "paintings": 73
           },
           {  "id": 14,
              "name": "Rene Magritte",
              "years": "1898 - 1967",
              "nationality": ["Belgium"],
              "paintings": 194
           },
           {  "id": 15,
              "name": "Salvador Dali",
              "years": "1904 - 1989",
              "nationality": ["Spain"],
              "paintings": 139
           },
           {  "id": 17,
              "name": "Eduard Manet",
              "years": "1832 - 1883",
              "nationality": ["France"],
              "paintings": 90
           },
           {  "id": 4,
              "name": "Vasiliy Kandinskiy",
              "years": "1866 - 1944",
              "nationality": ["Russia"],
              "paintings": 88
           }];

           this.newRound();
         }
       }
     }
});

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}
