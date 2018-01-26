Vue.component('quest', {
  props: ['quest'],
  template: `
    <div :id="quest.id" :class="{'animated  fadeOutRight': selected, 'animated flip': newQuestAnimation}" @click="selectQuest()">
    <img :src="'img/collections/'+quest.id+'.jpg'" :class="{'img-gray': !quest.available&&!quest.completed}" style="width: 100%">
      <div class="quest" :class="{'new-quest': newQuestAnimation}">
        <div class="py-2 px-4" :class="{'text-muted': !quest.available&&!quest.completed, 'text-dark': quest.completed || quest.available}">
          <div v-show="quest.completed" class="pt-3 small float-right" style="font-size: 22px">
            <img class="" src="/img/ui/play.png" width="52px">
          </div>
          <div v-show="quest.available" class="pt-3 small float-right" style="font-size: 22px">
            <img class="" src="/img/ui/play.png" width="52px">
          </div>
          <div style="font-size: 28px">
            {{quest.title}}
          </div>
          <div v-show="quest.completed" class='text-success'>
            Completed
          </div>
          <div v-show="quest.available" class='text-primary'>
            Play Now
          </div>
          <div v-show="!quest.completed && !quest.available">
            <i v-if="!quest.completed && !quest.available" class="fa fa-lock"></i> Closed
          </div>
          <span class="text-capitalize small text-muted">
            {{quest.painters.length}} Painters, {{quest.difficult}}
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
    if (this.quest.available && this.quest.id != "picasso" && this.$route.query.completed) {
      $('html, body').animate({scrollTop: $("#"+this.quest.id).offset().top-80}, 600);
      this.newQuestAnimation = true;
    }
  },
  methods: {
    selectQuest() {
      this.selected = true;
      // window.app.loading = true;
      window.location.href = 'game.html?quest=' + this.quest.id + '&difficult=' + this.quest.difficult;
    }
  }
});


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

       }
  });

});
