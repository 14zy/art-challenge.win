Vue.component('level', {
  props: ['level'],
  template: `
  <div :id="thisQuest.id + '|' + thisQuest.difficult">
    <h3 class="text-center mt-1 text-dark">{{thisQuest.title}}</h3>
    <img class="d-block img-fluid mb-2" :src="'img/collections/' + thisQuest.id + '.jpg'" alt="">
    <span class="text-dark text-capitalize">
      <i class="fa fa-star-o text-waring"></i> {{thisQuest.difficult}}
      <i class="fa fa-user text-waring pl-2"></i> {{thisQuest.painters.length}} Painters
      <i class="fa fa-image text-waring pl-2"></i> {{thisQuest.pictures}} Pictures
    </span>
  </div>
  `,
  computed: {
    thisQuest() {
      return this.$root.quests[this.level]
    }
  }
});

Vue.component('quest', {
  props: ['quest'],
  template: `
    <div :id="quest.id" class="carousel-item quest" @click="selectQuest()">
      <img :src="'img/collections/'+quest.id+'.jpg'" :class="{'img-gray': !quest.available&&!quest.completed}" style="width: 100%">
      <div class="quest" :class="{'new-quest': newQuestAnimation}">
        <div class="pt-2 pb-0 pr-4 pl-3" :class="{'text-muted': !quest.available&&!quest.completed, 'text-dark': quest.completed || quest.available}">
          <div v-show="quest.available || quest.completed" class="pt-4 small float-right" :class="{'animated fadeOutRight': selected}">
            <a :href="link">
              <img class="playBtn" src="/img/ui/play.png" width="52px">
            </a>
          </div>
          <div style="font-size: 28px">
            {{quest.title}}
          </div>
          <div v-show="quest.completed" class='text-success text-capitalize'>
            <i class="fa fa-check"></i> {{quest.difficult}}
          </div>
          <div v-show="quest.available && !quest.completed" class='text-primary text-capitalize'>
            <i class="fa fa-play"></i> {{quest.difficult}}
          </div>
          <div v-show="!quest.completed && !quest.available" class="text-capitalize">
            <i class="fa fa-lock"></i> {{quest.difficult}}
          </div>
          <span class="text-capitalize small text-muted">
            {{quest.painters.length}} Painters, {{quest.pictures}} Pictures
          </span>
        </div>
      </div>
      <div class="d-none d-md-block"><br></div>
    </div>`,
  data: function() {
    return {
      selected: false,
      newQuestAnimation: false,
      link: ""
    }
  },
  updated: function() {
    if (this.quest.available && this.$route.query.completed) {
      $("html, body").animate({scrollTop: $("#"+this.quest.id).offset().top+260}, 360);
      this.newQuestAnimation = true;
    };
    this.link = 'game.html?quest=' + this.quest.id + '&difficult=' + this.quest.difficult;
  },
  methods: {
    selectQuest() {
      if (this.quest.available || this.quest.completed) {
        this.selected = true;
        // window.app.loading = true;
        window.location.href = this.link;
      } else {
        swal("Locked", "Complete other classes to unlock this one", "info");
      }
    }
  }
});

////// TOTAL ///////
// var total = 0;
// for (var i = 0; i < window.app.questionsDB.length; i++) {
//   total = total + window.app.questionsDB[i].paintings;
// }
// console.log(total);
/////// JS ///////

Vue.component('quests-list', {
  template: `
  <div>
    <quest v-for="quest in this.$root.quests" :key="quest.id" :quest="quest"></quest>
  </div>`
});

Vue.component('quests-carousel', {
  template: `
  <div id="onBoardngCards" class="carousel slide px-3" style="height: 220px" data-ride="carousel">
    <div class="carousel-inner" role="listbox">
      <quest v-for="quest in this.$root.quests" :key="quest.id" :quest="quest"></quest>
    </div>
  </div>
  `
});

var router = new VueRouter({
    mode: 'history',
    routes: []
});

$.getScript( "data/quests.json.js", function( data, textStatus, jqxhr ) {

  window.app = new Vue({
      router,
      el: '#app',
      data: {
          loading: false,
          quests: quests,
          completedQuests: []
      },
      methods: {
        wipe: function () {
          localStorage.setItem("completed", "");
        }
      },
      mounted: function() {

         //Смотрим локалсторадж
         this.completedQuests = localStorage.getItem("completed");
         if (this.completedQuests) {
           this.completedQuests = this.completedQuests.split(",");
           // console.log(this.completedQuests);
           for (var i = 0; i < this.quests.length; i++) {
             if (this.completedQuests.slice(-1)[0] == this.quests[i].id) {
               for (var z = 0; z < i; z++) {
                 this.quests[z].completed = true;
               }
               this.quests[i].completed = true;
               this.quests[i+1].available = true;
               if (this.quests[i].available) {
                 this.quests[i].available = false;
               }
               // console.log(this.quests[i+1]);
             }
           };
         } else {
           this.quests[0].available = true;
         }
         //Смотрим локалсторадж

         this.quests[0].available = true;

         var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            initialSlide: 2,
            effect: "slide",
            spaceBetween: 0,
            centeredSlides: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            autoplay: {
              delay: 4100,
              disableOnInteraction: false,
            },
            // navigation: {
            //   nextEl: '.swiper-button-next',
            //   prevEl: '.swiper-button-prev',
            // },
          })

           mySwiper.on('slideChange', function () {
             var link = '/game.html?quest=' + $(mySwiper.slides[mySwiper.activeIndex]).children()[0].id.split("|")[0] + '&difficult=' + $(mySwiper.slides[mySwiper.activeIndex]).children()[0].id.split("|")[1];
             $('#playBtn').prop('href', link)
           });


       }
  });

});

// $(document).ready(function() {
//
//
//
// });
