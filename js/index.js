Vue.component('quest', {
  props: ['quest'],
  template: `
    <div :id="quest.id" :class="{'animated fadeIn': newQuestAnimation}" @click="selectQuest()">
      <img :src="'img/collections/'+quest.id+'.jpg'" :class="{'img-gray': !quest.available&&!quest.completed}" style="width: 100%">
      <div class="quest" :class="{'new-quest': newQuestAnimation}">
        <div class="py-2 px-4" :class="{'text-muted': !quest.available&&!quest.completed, 'text-dark': quest.completed || quest.available}">
          <div v-show="quest.available || quest.completed" class="pt-3 small float-right" :class="{'animated fadeOutRight': selected}">
            <img src="/img/ui/play.png" width="52px">
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
    </div>`,
  data: function() {
    return {
      selected: false,
      newQuestAnimation: false
    }
  },
  updated: function() {
    if (this.quest.available && this.$route.query.completed) {
      // $("html, body").animate({scrollTop: $("#"+this.quest.id).offset().top+260}, 1600);
      this.newQuestAnimation = true;
    }
  },
  methods: {
    selectQuest() {
      if (this.quest.available || this.quest.completed) {
        this.selected = true;
        // window.app.loading = true;
        link = 'game.html?quest=' + this.quest.id + '&difficult=' + this.quest.difficult;
        window.location.href = link;
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
       }
  });

});
