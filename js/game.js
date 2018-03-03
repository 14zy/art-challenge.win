Vue.component('game-screen', {
  template: `
  <div>
        <div v-show="this.$root.zoomed" class="container-fluid fixed-top pt-3" style="pointer-events: none; font-size:22px; color: white;">
          <div class="row">
            <div class="col-2"></div>
            <div class="col-8"></div>
            <div class="col-2 text-right">
              <!-- <span class="p-1 px-2" style='background-color: rgba(0,0,0,0.1); border-radius: 50px'><i class="fa fa-comments"></i></span> -->
            </div>
          </div>
        </div>
    <question></question>

    <div v-show="this.$root.hint" class="container-fluid pt-3" style="color: white; font-size:18px;">
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8 text-center text-dark mb-2">
            <img src="img/ui/tap3.png" class="m-2" width="48">
            <p class="">Click on picture to answer</p>
          </div>
          <div class="col-2"></div>
        </div>
      </div>
  </div>`,
  methods: {
    // returnURL() {
    //   return "http://artchallenge.me/painters/" + this.$root.currentPainter.id + "/" + this.$root.currentPicture + ".jpg";
    //   // window.open(url);
    // }
  }
});

Vue.component('scoresTen', {
  template: `<div class="">
    <i class="fa fa-star text-warning" v-for="correct in this.$root.correctAnswers"></i><i class="fa fa-star text-dark" v-for="questionMark in (this.$root.questions-this.$root.correctAnswers -1 )"></i><i style="" class="fa fa-gift text-dark"></i>
    </div>`
});

Vue.component('scoresMax', {
  template: `
  <div class='text-dark'>
    {{this.$root.correctAnswers}}
    <i class="fa fa-star text-warning"></i>
  </div>`
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
      this.$root.hint = false;
      // if (this.$root.zoomed) {
      //   this.style = "height: auto; width: 100%";
      // } else {
      //   this.style = "height: 100%; width: auto;";
      // }
    }
  }
});

Vue.component('answers', {
  template: `
    <div class="">
      <div class='row m-0 painter-button pt-1' style="background-color: rgba(255,255,255,1)">
        <div class="col-2 text-left">
          <a href="/" class="text-dark">
            <i class="fa fa-arrow-left"></i>
          </a>
        </div>
        <div class="col-8 text-center">
          <div v-if="this.$root.correctAnswers < 10">
            <scoresTen></scoresTen>
          </div>
          <div v-else>
            <scoresMax></scoresMax>
          </div>
        </div>
        <div class="col-2 text-right" style='font-size:20px'>
          <a target="_blank" :href="returnURL()" class="text-dark">
            <i class="fa fa-download"></i>
          </a>
        </div>
      </div>

      <div class='row m-0' style="background-color: rgba(255,255,255,1)">
        <painterBtn style='cursor: pointer; border-radius:0; min-width: 150px' v-for="painter in this.$root.currentAnswers" :key="painter.id" :painter="painter"></painterBtn>
      </div>
    </div>`,
    methods: {
      returnURL() {
        return "http://artchallenge.me/painters/" + this.$root.currentPainter.id + "/" + this.$root.currentPicture + ".jpg";
      }
    }
});

Vue.component('painterBtn', {
  props: ["painter"],
  template: `
  <div @click="answer(painter);" :class="this.class">

      <img onerror="this.src='/img/ui/person.png';" width="100" style="margin-left: -20px " :src="'img/painters/' + painter.id + '.png'" />

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
      class: ["col", "painter-button", ""]
    }
  },
  methods: {
    answer: function(painter) {
      this.$root.zoomed = true;

      if (painter.id == this.$root.currentPainter.id) {
        window.app.correctAnswers += 1;
        $('.painting').addClass('animated flash');

        window.app.celebrating = true;

        setTimeout(function() {
          window.app.celebrating = false;
        }, 1200);

        if (window.app.correctAnswers == 10) {
          window.app.winner();
          setTimeout(function() {
            window.app.nextQuestion();
          }, 100);
        } else {

          setTimeout(function() {
            window.app.nextQuestion();
          }, 400);
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
            padding: "1em"
          });

        }
      } else {


        $('.painting').addClass('animated jello');

        window.app.correctAnswers = window.app.correctAnswers - 1;
        if (window.app.correctAnswers < 0) {
          window.app.correctAnswers = 0;
        }

        setTimeout(function() {
          window.app.nextQuestion();
        }, 2200);

        swal({
          title: this.$root.currentPainter.name,
          text: this.$root.currentPainter.years,
          position: 'top',
          imageUrl: 'img/painters/' + this.$root.currentPainter.id + '.png',
          imageWidth: 142,
          timer: 3600,
          backdrop: false,
          width: '340px',
          showCloseButton: true,
          focusConfirm: false,
          background: "rgba(255,255,255,1)",
          showConfirmButton: true,
          confirmButtonText:'Read more',
          // showCancelButton: true,
          // cancelButtonText:'Close',
          animation: false,
          // type: "error",
          customClass: 'animated fadeInDown'
        }).then(function(result) {
          if (result.value) {
            $.ajax({
               url: 'http://178.62.133.139:5994/painters/'+window.app.currentPainter.id,
               type: 'get',
               dataType: 'jsonp',
               success: function(data) {
                 window.painterDetails = data;
                 image = data.paintings[window.app.currentPicture-1];
                 window.app.currentPictureName = image.name[window.lang];
                html = `
                <div class="text-left">
                  <h3><img width="64px" src="/img/painters/` + window.app.currentPainter.id + `.png">`+window.app.currentPainter.name+`</h3>
                  <img class="img-fluid pb-2" src="http://artchallenge.me/painters/`+ window.app.currentPainter.id+`/1.jpg">
                  ` + window.painterDetails.bio[window.lang]+`
                </div>
                `;

                swal({
                  // title: "<img width='48px' src='/img/painters/" + window.app.currentPainter.id + ".png'>" + window.app.currentPainter.name,
                  html: html,
                  position: 'top',
                  // imageUrl: 'img/painters/' + window.app.currentPainter.id + '.png',
                  // imageWidth: 60,
                  timer: false,
                  width: '340px',
                  showCloseButton: true,
                  background: "rgba(255,255,255,1)",
                  cancelButtonText:'Close',
                  showCancelButton: true,
                  showConfirmButton: false,
                  animation: false,
                  customClass: 'animated fadeIn'
                })
              }


            });

          }

        });

        // setTimeout(function() {
        //    $('.swal2-image').addClass('animated flash');
        // }, 100);

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
    zoomed: true,
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
    hint: true,
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
    window.lang = "en";
    $.getScript("data/lang/"+window.lang+"/phrases.js").done(function() {});
  },
  methods: {
    returnURL: function() {
      return "http://artchallenge.me/painters/" + window.app.currentPainter.id + "/" + window.app.currentPicture + ".jpg";
      // window.open(url);
    },
    endGame: function() {
      //not using anymore?
    },
    goodPhrase: function() {
      return window.goodPhrases[Math.floor(Math.random() * window.goodPhrases.length)];
    },
    winner: function() {
      window.app.celebrating = true;
      swal({
        title: 'Victory',
        position: 'center',
        text: "You have completed this class!",
        imageUrl: 'img/awards/olive.gif',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "Share",
        // imageWidth: 220,
        cancelButtonText: "Next",
        confirmButtonClass: "text-primary",
        cancelButtonClass: "text-primary",
        cancelButtonColor: 'white',
        confirmButtonColor: 'white',
        onClose: function() {
          window.app.celebrating = false;
        }
      }).then(function(result) {
        if (result.value) {
          url=`https://www.facebook.com/dialog/share?app_id=478531102278887&display=popup&href=http://artchallenge.win/?utm_source=fb-win&redirect_uri=http://artchallenge.win/`;
          window.location.href = url;
          window.app.celebrating = false;
          //yaCounter24594722.reachGoal('WINNER-SHARE-FB');
        } else if (result.dismiss === 'cancel') {
          window.location.href='/?completed=true';
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

      $('.painting').removeClass('animated jello');
      $('.painting').removeClass('animated flash');

      //generate new question
      this.currentPainter = this.randomPainter();

      //generate new picture
      this.currentPicture = Math.floor(Math.random() * this.currentPainter.paintings) + 1;

      //picture name
      // $.ajax({
      //    url: 'http://178.62.133.139:5994/painters/'+this.currentPainter.id,
      //    type: 'get',
      //    dataType: 'jsonp',
      //    success: function(data) {
      //      window.painterDetails = data;
      //      image = data.paintings[window.app.currentPicture-1];
      //      window.app.currentPictureName = image.name[window.lang];
      //    }
      // });

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

document.addEventListener('contextmenu', function (event) {
  return event.preventDefault();
});
