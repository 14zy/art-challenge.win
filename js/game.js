Vue.component('game-screen', {
  template: `
  <div>
      <div v-show="!this.$root.zoomed" class="container-fluid fixed-top pt-3" style="color: white; font-size:18px;">
        <div class="row">
          <div class="col-2 text-left">
            <span @click="window.location.href='/';" class="p-1 px-2" style='notbackground-color: rgba(0,0,0,0.1); border-radius: 50px'><i class="fa fa-arrow-left"></i></span>
          </div>

          <div class="col-8 text-center">
            <i class="fa fa-star text-warning" v-for="correct in this.$root.correctAnswers"></i><i class="fa fa-star" v-for="questionMark in (this.$root.questions-this.$root.correctAnswers -1 )"></i><i style="color: white" class="fa fa-gift"></i>
          </div>

          <div class="col-2 text-right" style='font-size:20px'>
            <span @click="download()" class="p-1 px-2" style='notbackground-color: rgba(0,0,0,0.1); border-radius: 50px'><i class="fa fa-download"></i></span>
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
    <div class="text-capitalize text-muted text-center p-1 pb-2">{{this.$root.currentPictureName}}</div>
  </div>`,
  methods: {
    download() {
      url = "http://artchallenge.me/painters/" + this.$root.currentPainter.id + "/" + this.$root.currentPicture + ".jpg";
      window.open(url);
    }
  }
});

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
  data: function() {
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
        imgSrc = "http://artchallenge.me/painters/" + this.$root.currentPainter.id + "/" + this.$root.currentPicture + ".jpg";
      } else {
        imgSrc = "img/ui/white.jpg";
      }
      return imgSrc;
    },
    zoom() {
      this.$root.zoomed = !this.$root.zoomed;
      if (this.$root.zoomed) {
        this.style = "max-width: 180%; width: 180%;";
      } else {
        this.style = "";
      }
    }
  }
});

Vue.component('answers', {
  template: `
    <div class="container">
      <div class='row'>
        <painterBtn class="col-6 p-1" style='paddig: 0' v-for="painter in this.$root.currentAnswers" :key="painter.id" :painter="painter"></painterBtn>
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
        <img width="18" :src="'img/nationality/' + painter.nationality[0] + '.png'"/>
        <div style='line-height: 1.2;' class="painter-years small">{{ painter.years }}</div>
      </span>

  </div>`,
  data: function() {
    return {
      style: ""
    }
  },
  methods: {
    answer: function(painter) {

      if (painter.id == this.$root.currentPainter.id) {

        // this.$root.zoomed = true;

        window.app.correctAnswers += 1;
        window.app.celebrating = true;
        setTimeout(function() {
          window.app.celebrating = false;
        }, 1200);
        if (window.app.correctAnswers == 10) {
          window.app.winner();
        } else {
          setTimeout(function() {
            window.app.nextQuestion();
          }, 100);
          swal({
            position: "top",
            title: "<i class='fa fa-check text-success'></i> "+this.$root.goodPhrase(),
            timer: 1600,
            backdrop: false,
            width: "320px",
            toast: false,
            background: "rgba(255,255,255,0.9)",
            animation: true,
            customClass: "text-goodPhrase text-center",
            showConfirmButton: false,
            padding: "1em",
            // showCloseButton: true,
            onClose: () => {

            }
          }).then((result) => {
            if (result.dismiss === 'timer') {
              //console.log('I was closed by the timer')
            }
          });

          // swal({
          //   position: "center",
          //   title: this.painter.name,
          //   text: this.$root.goodPhrase(),
          //   imageUrl: 'img/painters/' + this.$root.currentPainter.id + '.png',
          //   imageWidth: 260,
          //   timer: 1600,
          //   showConfirmButton: false,
          //   // showCloseButton: true,
          //   onOpen: () => {
          //     //swal.showLoading()
          //   }
          // }).then((result) => {
          //   if (result.dismiss === 'timer') {
          //     //console.log('I was closed by the timer')
          //   }
          // });

        }
      } else {
        window.app.correctAnswers = window.app.correctAnswers - 1;
        if (window.app.correctAnswers < 0) {
          window.app.correctAnswers = 0;
        }

        setTimeout(function() {
          window.app.nextQuestion();
        }, 100);

        swal({
          title: "<i class='fa fa-check text-danger'></i> "+this.$root.currentPainter.name,
          text: this.$root.currentPainter.years,
          position: 'bottom',
          imageUrl: 'img/painters/' + this.$root.currentPainter.id + '.png',
          imageWidth: 260,
          timer: 3600,
          showCloseButton: true,
          focusConfirm: false,
          background: "rgba(255,255,255,0.9)",
          showConfirmButton: true,
          confirmButtonText:'More info',
          // cancelButtonText:'',
          showCancelButton: true,
          // focusConfirm: true,
          // showCloseButton: true,
          onOpen: () => {
            // swal.showLoading()
          }
        });
        setTimeout(function() {
          // $('.swal2-image').addClass('animated flash');
        }, 100);

      }
    }
  },
});

var router = new VueRouter({
  mode: 'history',
  routes: []
});

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
    currentPictureName: "",
    currentAnswers: [],
    completedQuests: [],
    currentQuestDifficult: "",
    goodPhrases: window.goodPhrases
  },
  created: function() {
    var lang = window.navigator.userLanguage || window.navigator.language;
    lang = lang.substring(0, 2).toLowerCase();
    if (this.$route.query.lang) {
     lang = this.$route.query.lang
    }
    if (lang == "ru" || lang == "en") {
        window.lang = lang;
    } else {
        window.lang = "en";
    }
    // window.lang = "ru"; //////
    $.getScript("data/lang/"+window.lang+"/phrases.js").done(function() {});
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
        title: 'Congratulations!',
        position: 'center',
        text: "You have completed this class!",
        imageUrl: 'img/animations/correct-animated-gif-13.gif',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Share",
        imageWidth: 220,
        cancelButtonText: "Go Next",
        confirmButtonClass: "text-primary",
        cancelButtonClass: "text-primary",
        cancelButtonColor: 'white',
        confirmButtonColor: 'white',
        onClose: () => {
          window.app.celebrating = false;
        }
      }).then((result) => {
        if (result.value) {
          // swal('ok!', 'Share function will be there', 'info');
          if (navigator.share) {
            navigator.share({
              title: 'Web Fundamentals',
              text: 'Check out Web Fundamentals — it rocks!',
              url: 'https://developers.google.com/web',
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
          } else {
            console.log("none");
          }
          window.app.celebrating = false;
          //this.newRound();
        } else if (result.dismiss === 'cancel') {
          window.location.href='/?completed=true';
          // window.history.back();
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

      // this.$root.zoomed = false;

      //generate new question
      this.currentPainter = this.randomPainter();

      //generate new picture
      this.currentPicture = Math.floor(Math.random() * this.currentPainter.paintings) + 1;

      //picture name
      $.ajax({
         url: 'http://178.62.133.139:5994/painters/'+this.currentPainter.id,
         type: 'get',
         dataType: 'jsonp',
         success: function(data) {
           image = data.paintings[window.app.currentPicture-1];
           window.app.currentPictureName = image.name[window.lang];
         }
      });

      //generate new answers //need generate more answers (2/16)
      this.currentAnswers = [];
      this.currentAnswers.push(this.currentPainter);

      if (this.currentQuestDifficult != "easy") {
        while (this.currentAnswers.length < 4) {
          if (this.currentAnswers.length == 1) {
            random = this.randomPainter();
            if (random.id != this.currentAnswers[0].id) {
              this.currentAnswers.push(random);
            }
          } else {
            random = this.randomPainter();
            var duplicate = false;
            for (var i = 0; i < this.currentAnswers.length; i++) {
              if (this.currentAnswers[i].id == random.id) {
                duplicate = true
              }
            };
            if (!duplicate) {
              this.currentAnswers.push(random);
            }
          }
        }
        shuffle(this.currentAnswers);
      }

      if (this.currentQuestDifficult == "easy") {
        while (this.currentAnswers.length < 2) {
          if (this.currentAnswers.length == 1) {
            random = this.randomPainter();
            if (random.id != this.currentAnswers[0].id) {
              this.currentAnswers.push(random);
            }
          }
        }
        shuffle(this.currentAnswers);
      }

    },
    newRound: function() {
      this.correctAnswers = 0;
      this.nextQuestion();
    }
  },
  mounted: function() {
      if (this.$route.query.quest) {
        this.currentQuest = this.$route.query.quest;
        this.currentQuestDifficult = this.$route.query.difficult;

        // Загружаем художников из текущего режима в questionsDB
        $.getJSON("../data/quests/" + window.lang + "/" + this.currentQuest + ".json", function(data) {
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
