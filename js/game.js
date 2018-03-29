
Vue.component('question', {
  template: `
  <div class="text-center img-scroll">
    <img @click="zoom()" :style="this.style" class="painting" :src="pictureURL()"/>
    <div v-if="window.app.currentPictureName" class="offset-1 col-10 text-dark mt-2 mb-2">
      <p>{{this.$root.currentPictureName}}</p>
    </div>
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
          <a href="index.html" class="text-darklight">
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
      <img onerror="this.src='/img/ui/person.png';" width="100" style="margin-left: -20px " :src="'img/painters/200x200/' + painter.id + '.png'" />
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
          imageUrl: 'img/painters/200x200/' + this.$root.currentPainter.id + '.png',
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
            bio = window.app.currentPainter.bio[window.lang];
            if (bio == undefined) {
              bio = window.app.currentPainter.bio["en"];
            };
            html = `
            <div class="text-left">
              <h3>`
                +window.app.currentPainter.name+`
              </h3>
              <img class="img-fluid pb-2" src="http://artchallenge.me/painters/`+ window.app.currentPainter.id+`/1.jpg">
              ` + bio +`
            </div>
            <div class="text-center">
              <img width="160px" src="img/painters/200x200/` + window.app.currentPainter.id + `.png">
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


var mobile = false;
if (screen && screen.width < 1024) {
  mobile = true;
}


window.app = new Vue({
  router,
  el: '#app',
  data: {
    loading: true,
    mobile: mobile,
    zoomed: true,
    multiclick: false,
    // celebrating: false,
    questions: 10,
    correctAnswers: 0,
    questionsDB: [],
    questsDB: [],
    currentQuest: "",
    currentQuestData: {},
    currentQuestDifficult: "",
    currentPainter: "",
    currentPicture: "",
    currentPictureName: "",
    currentPictureData: {},
    currentAnswers: [],
    hint: true,
    paintersNames: {}
  },
  created: function() {
    //LANGUAGE
    var lang = window.navigator.userLanguage || window.navigator.language;
    lang = lang.substring(0, 2).toLowerCase();
    if (this.$route.query.lang) {
     lang = this.$route.query.lang
    }
    if (lang == "ru" || lang == "en" || lang == "de" || lang == "es" || lang == "it") {
        window.lang = lang;
    } else {
        window.lang = "en";
    }
    // window.lang = "fr";
    console.log("lang " + window.lang);
    $.getScript("data/lang/"+window.lang+"/phrases.js");
    $.getJSON("data/lang/"+window.lang+"/painters.json", function(data) {
      window.app.paintersNames = data.paintersDB;
    });
  },
  methods: {
    goodPhrase: function() {
      return window.langDB.goodPhrases[Math.floor(Math.random() * window.langDB.goodPhrases.length)];
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
        confirmButtonText: "<i class='fa fa-facebook-square'></i> "+window.langDB.victoryBtn1,
        imageWidth: 220,
        cancelButtonText: "<i class='fa fa-arrow-right'></i> "+window.langDB.victoryBtn2,
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

          if (window.app.currentQuest < (window.app.questsDB.length)) {
            window.location.href='game.html?level='+ (parseInt(window.app.currentQuest)+1);
          } else {
            swal('Sorry', 'You completed all levels!', 'info');
          }

        }
      });
    },
    randomPainter: function() {
      randPainter = this.questionsDB[Math.floor(Math.random() * this.questionsDB.length)];
      randPainter.name = window.app.paintersNames[randPainter.id];
      return randPainter;
    },
    nextQuestion: function() {
      window.app.multiclick = false;
      $('.painting').removeClass('animated jello');
      $('.painting').removeClass('animated flash');

      setTimeout(function(){
        window.app.zoomed = false;
      }, 2200);

      //generate new question
      window.app.currentPainter = window.app.randomPainter();

      //generate new picture
      window.app.currentPicture = window.app.currentPainter.paintingsDB[Math.floor(Math.random() * this.currentPainter.paintings) + 1].id;

      //loking for picture name
      window.app.currentPictureData = window.app.currentPainter.paintingsDB[window.app.currentPicture-1];
      if (window.lang == "ru" || window.lang == "en") {
        window.app.currentPictureName = window.app.currentPictureData.name[window.lang];
      } else {
        window.app.currentPictureName = "";
      }

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
      if (this.$route.query.level) {
        this.currentQuest = this.$route.query.level;
        $.getScript( "data/quests.json.js", function( data, textStatus, jqxhr ) {
          window.app.questsDB = quests;
          for (var i = 0; i < window.app.questsDB.length; i++) {
            if (window.app.currentQuest == window.app.questsDB[i].level) {
              window.app.currentQuestData = window.app.questsDB[i];
              window.app.currentQuestDifficult = window.app.currentQuestData.difficult;
            }
          }
          $.getJSON("data/paintersDB.json", function(data) {
              for (var z = 0; z < window.app.currentQuestData.painters.length; z++) {
                transferPainter = {};
                transferPainter.id = data.docs[(window.app.currentQuestData.painters[z]-1)].id;
                transferPainter.years= data.docs[(window.app.currentQuestData.painters[z]-1)].years;
                transferPainter.name = data.docs[(window.app.currentQuestData.painters[z]-1)].name; // get from lang
                transferPainter.nationality = data.docs[(window.app.currentQuestData.painters[z]-1)].nationality;
                transferPainter.bio = data.docs[(window.app.currentQuestData.painters[z]-1)].bio; // get from lang
                transferPainter.genre = data.docs[(window.app.currentQuestData.painters[z]-1)].genre;
                transferPainter.paintings= data.docs[(window.app.currentQuestData.painters[z]-1)].paintings.length;
                transferPainter.paintingsDB= data.docs[(window.app.currentQuestData.painters[z]-1)].paintings;
                window.app.questionsDB.push(transferPainter);
              }
              window.app.loading = false;
              swal({
                position: "center",
                html: "<img src='img/loading/lg.dual-ring-loader.gif'>" + "<h4 class='p-0 m-0'>"+window.app.currentQuestData.title + "</h4>",
                timer: 2600,
                backdrop: false,
                width: "320px",
                toast: false,
                background: "rgba(255,255,255,1)",
                animation: true,
                customClass: "",
                showConfirmButton: false,
                padding: "1em"
              });
              window.app.newRound();
          });
        });
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
