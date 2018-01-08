Vue.component('game-screen', {
  template: `
  <div>
      <div v-show="!this.$root.zoomed" class="container-fluid fixed-top pt-3" style="color: white; font-size:18px;">
        <div class="row">
          <div class="col-2 text-left">
            <span @click="window.history.back();" class="p-1 px-2" style='background-color: rgba(0,0,0,0.1); border-radius: 50px'><i class="fa fa-arrow-left"></i></span>
          </div>
          <div class="col-8 text-center">
            <i class="fa fa-star text-warning" v-for="correct in this.$root.correctAnswers"></i><i class="fa fa-star" v-for="questionMark in (this.$root.questions-this.$root.correctAnswers -1 )"></i><i style="color: white" class="fa fa-gift"></i>
          </div>
          <div class="col-2 text-right" style='font-size:20px'>
            <span @click="swal('Settings will be here')" class="p-1 px-2" style='background-color: rgba(0,0,0,0.1); border-radius: 50px'><i class="fa fa-gear"></i></span>
          </div>
        </div>
      </div>

      <div v-show="this.$root.zoomed" class="container-fluid fixed-top pt-3" style="pointer-events: none; font-size:22px; color: white;">
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8"></div>
          <div class="col-2 text-right">
            <span class="p-1 px-2" style='background-color: rgba(0,0,0,0.1); border-radius: 50px'><i class="fa fa-close"></i></span>
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
  <div class="text-center img-scroll">
    <img @click="zoom()" :style="this.style" class="painting" :src="pictureURL()"/>
  </div>`,
  data: function () {
    return {
      style: ""
    }
  },
  methods: {
    pictureURL() {
      // localhost:4444
      // artchallenge.me
      var imgSrc = "";
      if (this.$root.currentPainter) {
        imgSrc = "http://artchallenge.me/painters/"+this.$root.currentPainter.id+"/" + this.$root.currentPicture + ".jpg";
      } else {
        imgSrc = "img/ui/white.jpg";
      }
      return imgSrc;

    },
    zoom() {
      this.$root.zoomed = !this.$root.zoomed;
      if (this.$root.zoomed) {
        this.style="max-width: 180%; width: 180%;";
      } else {
        this.style="";
      }
    }
  }
});

Vue.component('answers', {
  template: `
  <div class="">
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
  <div class="py-2 painter-button" @click="answer(painter);">
      <img onerror="this.src='/img/ui/person.png';" width="92" height="92" style="margin: 0 0 -2% -4%" :src="'img/painters/' + painter.id + '.png'" />
      <span class="text-right" style='right: 5%; top:10%; position: absolute;'>
        <div class='painter-name'>{{ painter.name }}</div>
      </span>
      <span class="text-right" style='right: 5%; bottom:10%; position: absolute;'>
        <img width="18" :src="'img/nationality/' + painter.nationality[0] + '.png'" />
        <div class="painter-years small">{{ painter.years }}</div>
      </span>
  </div>`,
  data: function () {
    return {
      style: ""
    }
  },
  methods: {
   answer: function (painter) {

     if (painter.id == this.$root.currentPainter.id) {
       window.app.correctAnswers += 1;
       window.app.celebrating = true;
       setTimeout(function () {
         window.app.celebrating = false;
       }, 1200);
       if (window.app.correctAnswers == 10) {
         window.app.winner();
       } else {
         swal({
           position: "center",
           title: this.painter.name,
            text: this.$root.goodPhrase(),
            imageUrl: 'img/painters/' + this.$root.currentPainter.id + '.png',
            imageWidth: 260,
            timer: 1600,
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

       setTimeout(function () {
         window.app.nextQuestion();
       }, 1000);

     } else {

       window.app.correctAnswers = window.app.correctAnswers - 1;
       if (window.app.correctAnswers < 0) {
         window.app.correctAnswers = 0;
       }
       swal({
         title: 'No!',
          position: 'bottom',
          text: "It was " + this.$root.currentPainter.name,
          imageUrl: 'img/painters/' + this.$root.currentPainter.id + '.png',
          imageWidth: 260,
          timer: 1800,
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

        setTimeout(function () {
          window.app.nextQuestion();
        }, 600);
     }
   }
 },
});

var router = new VueRouter({
    mode: 'history',
    routes: []
});

$.getScript( "data/language.en.json.js" ).done(function() {});

  window.app = new Vue({
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
          completedQuests: [],
          currentQuestDifficult: "",
          goodPhrases: window.goodPhrases
      },
      methods: {
          endGame: function() {
            //not using anymore?
          },
          goodPhrase: function() {
            return window.goodPhrases[Math.floor(Math.random() * window.goodPhrases.length)];
          },
          winner: function() {
            window.app.celebrating = true;
            swal({
              title: 'You are a winner!',
               position: 'center',
               text: "Congratulations. Only 14% of people can complete this quest",
               imageUrl: 'img/animations/correct-animated-gif-13.gif',
               showCloseButton: true,
               showCancelButton: true,
               confirmButtonText: "Share it",
               imageWidth: 220,
               cancelButtonText: "Go next",
               cancelButtonColor: 'green'
             }).then((result) => {
                  if (result.value) {
                    swal(
                      'ok!',
                      'Share function will be there',
                      'info'
                    )
                  } else if (result.dismiss === 'cancel') {
                    window.history.back();
                  }
                });

            if (this.completedQuests) {
              var newQuestWinning = true;
              for (var i = 0; i < this.completedQuests.length; i++) {
                if (this.completedQuests[i] == this.currentQuest) {
                  console.log("winnig this quest not first time");
                  newQuestWinning = false;
                }
              }
              if (newQuestWinning) {
                this.completedQuests.push(this.currentQuest);
                console.log("winnig this quest in first time!");
              }
            } else {
              this.completedQuests = [];
              this.completedQuests.push(this.currentQuest);
            }
            localStorage.setItem("completed", this.completedQuests);
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

            if (this.currentQuestDifficult == "basic") {
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
            }

            if (this.currentQuestDifficult == "easy") {
              while (this.currentAnswers.length < 2) {
                if (this.currentAnswers.length == 1) {
                  random = this.randomPainter();
                  if (random.id != this.currentAnswers[0].id) {this.currentAnswers.push(random);}
                }
              }
              shuffle(this.currentAnswers);
            }

          },
          newRound: function() {
            this.nextQuestion();
          }
      },
      mounted: function() {
         if (this.$route.path == "/game.html") {
           if (this.$route.query.quest) {
             this.currentQuest = this.$route.query.quest;
             this.currentQuestDifficult = this.$route.query.difficult;

             // Загружаем художников из текущего режима в questionsDB
             $.getJSON( "../data/quests/"+this.currentQuest+".json", function(data) {
               paintersDB = data.paintersDB;
               window.app.questionsDB = paintersDB;
               window.app.newRound();
             })

             //Смотрим локалсторадж
             this.completedQuests = localStorage.getItem("completed");
             if (this.completedQuests) {
               this.completedQuests = this.completedQuests.split(",");
               // console.log(this.completedQuests);
               // for (var i = 0; i < this.quests.length; i++) {
               //   if (this.completedQuests.slice(-1)[0] == this.quests[i].id) {
               //     for (var z = 0; z < i; z++) {
               //       this.quests[z].completed = true;
               //     }
               //     this.quests[i].completed = true;
               //     this.quests[i+1].available = true;
               //     if (this.quests[i].available) {
               //       this.quests[i].available = false;
               //     }
               //     console.log(this.quests[i+1]);
               //   }
               // };
             } else {
               // this.quests[0].available = true;
             }
             //Смотрим локалсторадж

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

document.addEventListener('contextmenu', event => event.preventDefault());
