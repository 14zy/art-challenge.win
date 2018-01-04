Vue.component('game-screen', {
  template: `
  <div>
      <div v-show="!this.$root.zoomed" class="container-fluid fixed-top" style="background-color: rgba(255,255,255,0.0);">
        <div class="row">
          <div class="col-2 text-left">
            <p @click="window.history.back();" class="pl-1 pt-3" style='color: white;'><i class="fa fa-chevron-left"></i></p>
          </div>
          <div class="col-8 text-center" style='color: #333;'>
            <div class="pt-3">
              <i class="fa fa-star text-warning" v-for="correct in this.$root.correctAnswers"></i><i style="color: white" class="fa fa-star" v-for="questionMark in (this.$root.questions-this.$root.correctAnswers -1 )"></i><i style="color: white" class="fa fa-gift"></i>
            </div>
          </div>
          <div class="col-2 text-right">
            <p @click="swal('Settings will be here')" class="pt-3 pr-1" style='color: white;'><i class="fa fa-gear"></i></p>
          </div>
        </div>
      </div>
    <question></question>
  </div>`
})

Vue.component('question', {
  template: `
  <div>
    <questionPicture></questionPicture>
  </div>`
});

Vue.component('questionPicture', {
  template: `
  <div class="">
    <div style='overflow: scroll'>
      <img @click="zoom()" :style="this.style" class="painting" :src="pictureURL()"/>
    </div>
  </div>`,
  data: function () {
    return {
      style: ""
    }
  },
  methods: {
    pictureURL() {
      return "http://artchallenge.me/painters/"+this.$root.currentPainter.id+"/" + this.$root.currentPicture + ".jpg";
    },
    zoom() {
      this.$root.zoomed = !this.$root.zoomed;
      if (this.$root.zoomed) {
        this.style="width: 100%; height: auto;";
      } else {
        this.style="";
      }

    }
  }
});

Vue.component('answers', {
  template: `
  <div class="pt-2">
    <div class="container">
      <div class='row'>
        <painterBtn class="col-6 p-1" style='paddig: 0' v-for="painter in this.$root.currentAnswers" :key="painter.id" :painter="painter"></painterBtn>
      </div>
    </div>
  </div>`
});

Vue.component('painterBtn', {
  props: ["painter"],
  template: `
  <div class="pb-2" style="" @click="answer(painter);">
    <div>
      <img width="92" style="margin: -8px 0 0 -12px" :src="'img/painters/' + painter.id + '.png'" />
      <span class="text-right" style='right:20px;  position: absolute;'>
        <div style='line-height: 1.1; width: 80px' >{{ painter.name }}</div>
        <img width="24" class='pt-2' :src="'img/nationality/' + painter.nationality[0] + '.png'" />
        <br>
        <span class="small" style='font-size: 12px'>{{ painter.years }}</span>
        <br>
        <br>
        <br>
      </span>
    </div>
  </div>`,
  methods: {
   answer: function (painter) {
     if (painter.id == this.$root.currentPainter.id) {
       app.correctAnswers += 1;

       app.celebrating = true;
       setTimeout(function () {
         app.celebrating = false;
       }, 1200);

       if (app.correctAnswers == 9) {
         app.winner();
       } else {
         swal({
           position: "center",
           title: this.$root.goodPhrase(),
            text: this.painter.name,
            imageUrl: 'img/painters/' + this.$root.currentPainter.id + '.png',
            imageWidth: 260,
            timer: 1800,
            showConfirmButton: false,
            // showCloseButton: true,
            onOpen: () => {
              //swal.showLoading()
            }
          }).then((result) => {
            if (result.dismiss === 'timer') {
              //console.log('I was closed by the timer')
            }
          });
       }

       app.nextQuestion();
     } else {

       app.correctAnswers = app.correctAnswers - 1;

       if (app.correctAnswers < 0) {
         app.correctAnswers = 0;
       }
       swal({
         title: 'Oops!',
          position: 'center',
          text: "It was " + this.$root.currentPainter.name + ", " + this.$root.currentPainter.nationality+".",
          imageUrl: 'img/painters/' + this.$root.currentPainter.id + '.png',
          imageWidth: 260,
          timer: 2200,
          showConfirmButton: false,
          // showCloseButton: true,
          onOpen: () => {
            // swal.showLoading()
          }
        }).then((result) => {
          if (result.dismiss === 'timer') {
            //console.log('I was closed by the timer')
          }
        });

       app.nextQuestion();
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
        zoomed: false,
        celebrating: false,
        currentQuest: "",
        questions: 10,
        correctAnswers: 0,
        questionsDB: [],
        currentPainter: "",
        currentPicture: "",
        currentAnswers: [],
        goodPhrases: [
          "You got it right!",
          "Bravo!",
          "Excellent!",
          "Great!",
          "Wonderful!",
          "Quite right!",
          "Absolutely!",
          "Exactly!",
          "That's right!",
          "Indeed so!",
          "Wonderful!",
          "Brilliant!",
          "Amazing!",
        ]
    },
    methods: {
        endGame: function() {
          //not using anymore?
        },
        goodPhrase: function() {
          return this.goodPhrases[Math.floor(Math.random() * this.goodPhrases.length)];
        },
        winner: function() {
          swal("STAR",'You are winner!', 'success');
        },
        randomPainter: function() {
          return this.questionsDB[Math.floor(Math.random() * this.questionsDB.length)]
        },
        nextQuestion: function() {
          this.currentPicture = "";
          //generate new question
          this.currentPainter = this.randomPainter();
          //generate new picture
          this.currentPicture = Math.floor(Math.random() * this.currentPainter.paintings) + 1;
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
