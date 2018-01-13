Vue.component('quest', {
  props: ['quest'],
  template: `
    <div :id="quest.id" :class="{'animated rollOut': selected}" @click="selectQuest()">
      <div class="text-muted quest p-2 mb-3">
        <div :class="{'text-success': quest.completed, 'text-primary': quest.available}">
          <span class="text-right pr-1 float-right" style="font-size: 20px; ">

            <template v-if="quest.available">
              <i class="fa fa-play-circle"></i>
            </template>

            <i v-if="quest.completed" class="fa fa-check text-success"></i>
            <i v-if="!quest.completed && !quest.available" class="fa fa-lock"></i>
          </span>
          <h4>{{quest.title}} </h4>
          {{quest.description}}
          <br>
          <span class="text-capitalize small">{{quest.difficult}}</span>
          <span class="text-right pr-1 small float-right">
            {{quest.painters}} Painters
          </span>
        </div>
      </div>
    </div>`,
  data: function() {
    return {
      selected: false
    }
  },
  updated: function() {
    if (this.quest.available && this.quest.id != "picasso") {
      $('html, body').animate({scrollTop: $("#"+this.quest.id).offset().top-120}, 1000);
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
