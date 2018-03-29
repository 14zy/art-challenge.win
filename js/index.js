Vue.component('level', {
  props: ['level'],
  template: `
  <div :id="thisQuest.level + '|' + thisQuest.difficult">
    <h3 class="text-center mt-1 text-dark">{{thisQuest.title}}</h3>
    <img class="d-block img-fluid mb-2" :src="'img/collections/' + thisQuest.id + '.jpg'" alt="">
    <div class="row text-capitalize">
      <div class="col-6 text-left">
        <i class="fa fa-user text-dark"></i>
         {{thisQuest.painters.length}}
      </div>
      <div class='col-6 text-right'>
        <span v-if="thisQuest.difficult == 'easy'">
          <i class="fa fa-star text-pink"></i>
          <i class="fa fa-star-o text-darklight"></i>
          <i class="fa fa-star-o text-darklight"></i>
        </span>
        <span v-if="thisQuest.difficult == 'basic'">
          <i class="fa fa-star text-pink"></i>
          <i class="fa fa-star text-pink"></i>
          <i class="fa fa-star-o text-darklight"></i>
        </span>
        <span v-if="thisQuest.difficult == 'hard'">
          <i class="fa fa-star text-pink"></i>
          <i class="fa fa-star text-pink"></i>
          <i class="fa fa-star text-pink"></i>
        </span>
      </div>
    </div>
  </div>
  `,
  computed: {
    thisQuest() {
      return this.$root.quests[this.level]
    }
  }
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
      mounted: function() {
         var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            // loop: true,
            initialSlide: 4,
            effect: "slide",
            spaceBetween: 0,
            centeredSlides: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            // autoplay: {
            //   delay: 14000,
            //   disableOnInteraction: false,
            // }
          });
          mySwiper.on('slideChange', function () {
           var link = 'game.html?level=' + $(mySwiper.slides[mySwiper.activeIndex]).children()[0].id.split("|")[0];
           $('#playBtn').prop('href', link)
         });
       }
  });
});
