Vue.component('game-screen', {
  template: `
  <div>
    <question></question>
    <div v-show="this.$root.hint" class="container-fluid pt-3" style="color: white; font-size:18px;">
        <div class="row">
          <div class="col-2"></div>
          <div class="col-8 text-center text-dark mb-2">

          </div>
          <div class="col-2"></div>
        </div>
      </div>
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
    }
  }
});

Vue.component('scoresTen', {
  template: `
    <div>
      <i class="fa fa-check text-success" v-for="correct in this.$root.correctAnswers"></i><i class="fa fa-check text-darklight" v-for="questionMark in (this.$root.questions-this.$root.correctAnswers -1 )"></i><i style="" class="fa fa-check text-darklight"></i>
    </div>`
});

Vue.component('scoresMax', {
  template: `
  <div class='text-dark'>
    {{this.$root.correctAnswers}}
    <i class="fa fa-check text-success"></i>
  </div>`
});

Vue.component('answers', {
  template: `
    <div>
      <div class='row m-0 painter-button pt-1' style="background-color: rgba(255,255,255,1)">
        <div class="col-2 text-left">
          <a href="/" class="text-darklight">
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
          <a target="_blank" :href="returnURL()" class="text-darklight">
            <i class="fa fa-download"></i>
          </a>
        </div>
      </div>

      <div class='row m-0' style="background-color: rgba(255,255,255,1)">
        <painterBtn style='cursor: pointer; border-radius:0; min-width: 150px;' v-for="painter in this.$root.currentAnswers" :key="painter.id" :painter="painter"></painterBtn>
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
      <div class="text-right" style='right: 5%; top:10%; position: absolute;'>
        <div class='painter-name'>{{ painter.name }}</div>
      </div>
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

    if (!window.app.multiclick) {
        window.app.multiclick = true

      //CORRECT ANSWER
      if (painter.id == this.$root.currentPainter.id) {
        window.app.correctAnswers += 1;
        // Star aimtion here
        $('.painting').addClass('animated flash');
        // window.app.celebrating = true;
        // setTimeout(function() {
        //   window.app.celebrating = false;
        // }, 1200);
        if (window.app.correctAnswers == 10) {
          //WINNER ANSWER
          window.app.zoomed = true;
          window.app.winner();
          setTimeout(function() {
            window.app.nextQuestion();
          }, 1200);
        } else {
        //REGULAR WINNER ANSWER
          setTimeout(function() {
            window.app.zoomed = true;
          }, 200);
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
        //WRONG ANSWER
        $('.painting').addClass('animated jello');
        // setTimeout(function() {
        window.app.zoomed = true;
        // }, 1200);


        // if(window.app.currentQuestDifficult=="easy"){
        //   window.app.correctAnswers=window.app.correctAnswers-1;
        //   if(window.app.correctAnswers<0||window.app.correctAnswers>=10){window.app.correctAnswers=0;}
        // }else{
          window.app.correctAnswers=0;
        // }
        //star animation here


        swal({
          title: this.$root.currentPainter.name,// "No!",
          text: window.langDB.wrongSub, //this.$root.currentPainter.years,
          position: 'top',
          imageUrl: 'img/painters/' + this.$root.currentPainter.id + '.png',
          imageWidth: 200,
          timer: 3600,
          backdrop: false,
          width: '340px',
          showCloseButton: true,
          focusConfirm: false,
          background: "rgba(255,255,255,1)",
          showConfirmButton: true,
          confirmButtonText: window.langDB.wrongBtn,
          animation: false,
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
                  <h3>`
                    +window.app.currentPainter.name+`
                  </h3>
                  <img class="img-fluid pb-2" src="http://artchallenge.me/painters/`+ window.app.currentPainter.id+`/1.jpg">
                  ` + window.painterDetails.bio[window.lang]+`
                </div>
                <div class="text-center">
                  <img width="160px" src="/img/painters/` + window.app.currentPainter.id + `.png">
                </div>
                `;
                swal({
                  html: html,
                  position: 'top',
                  timer: false,
                  width: '340px',
                  showCloseButton: true,
                  background: "rgba(255,255,255,1)",
                  cancelButtonText: window.langDB.wrongMoreBtn,
                  showCancelButton: true,
                  showConfirmButton: false,
                  animation: false,
                  customClass: 'animated fadeIn'
                });
                setTimeout(function() {
                  window.app.nextQuestion();
                }, 3600);
              }
            });
          } else {
              window.app.nextQuestion();
          }
        });
      }
    }
  }
}
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
    multiclick: false,
    // celebrating: false,
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
    //LANGUAGE
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
    // window.lang = "en";
    $.getScript("data/lang/"+window.lang+"/phrases.js").done(function() {});
  },
  methods: {
    goodPhrase: function() {
      return window.goodPhrases[Math.floor(Math.random() * window.goodPhrases.length)];
    },
    winner: function() {
      // window.app.celebrating = true;
      swal({
        title: window.langDB.victoryTitle,
        position: 'center',
        text: window.langDB.victorySub,
        imageUrl: 'img/awards/olive.gif',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: window.langDB.victoryBtn1,
        imageWidth: 220,
        cancelButtonText: window.langDB.victoryBtn2,
        confirmButtonClass: "text-primary",
        cancelButtonClass: "text-primary",
        cancelButtonColor: 'white',
        confirmButtonColor: 'white',
        // onClose: function() {
        //   window.app.celebrating = false;
        // }
      }).then(function(result) {
        if (result.value) {
          url=`https://www.facebook.com/dialog/share?app_id=478531102278887&display=popup&href=http://artchallenge.win/?utm_source=fb-win&redirect_uri=http://artchallenge.win/`;
          window.location.href = url;
          // window.app.celebrating = false;
          // yaCounter24594722.reachGoal('WINNER-SHARE-FB');
        } else if (result.dismiss === 'cancel') {
          window.location.href='/?completed=true';
        }
      });
      // if (this.completedQuests) {
      //   var newQuestWinning = true;
      //   for (var i = 0; i < this.completedQuests.length; i++) {
      //     if (this.completedQuests[i] == this.currentQuest) {
      //       console.log("winnig this quest not first time");
      //       newQuestWinning = false;
      //     }
      //   }
      //   if (newQuestWinning) {
      //     this.completedQuests.push(this.currentQuest);
      //     console.log("winnig this quest in first time!");
      //   }
      // } else {
      //   this.completedQuests = [];
      //   this.completedQuests.push(this.currentQuest);
      // }
      // localStorage.setItem("completed", this.completedQuests);
    },
    randomPainter: function() {
      return this.questionsDB[Math.floor(Math.random() * this.questionsDB.length)]
    },
    nextQuestion: function() {
      // console.log("next question");
      window.app.multiclick = false;
      $('.painting').removeClass('animated jello');
      $('.painting').removeClass('animated flash');

      setTimeout(function(){
        window.app.zoomed = false;
      }, 2200);

      //generate new question
      this.currentPainter = this.randomPainter();

      //Имена на мультиязыках как-то так надо сделать
      // this.current.Painter.name = window.lang.painters[this.current.Painter.id].name;

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
        // this.completedQuests = localStorage.getItem("completed");
        // if (this.completedQuests) {
        //   this.completedQuests = this.completedQuests.split(",");
        //   // console.log(this.completedQuests);
        //   // for (var i = 0; i < this.quests.length; i++) {
        //   //   if (this.completedQuests.slice(-1)[0] == this.quests[i].id) {
        //   //     for (var z = 0; z < i; z++) {
        //   //       this.quests[z].completed = true;
        //   //     }
        //   //     this.quests[i].completed = true;
        //   //     this.quests[i+1].available = true;
        //   //     if (this.quests[i].available) {
        //   //       this.quests[i].available = false;
        //   //     }
        //   //     console.log(this.quests[i+1]);
        //   //   }
        //   // };
        // } else {
        //   // this.quests[0].available = true;
        // }
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
