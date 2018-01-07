Vue.component('quest', {
  props: ['quest'],
  template: `
  <div v-if="!quest.hidden" :style="style" class="text-muted quest p-2 mb-3" @click="window.app.loading = true; setTimeout(function(){window.location.href='game.html?quest='+quest.id+'&difficult='+quest.difficult},500);">

        <div :class="{ 'text-success': quest.completed, 'text-primary': quest.available}">
          <span class="text-right pr-1 float-right" style="font-size: 20px; ">
            <i v-if="quest.available" class="fa fa-play-circle"></i>
            <i v-if="quest.completed" class="fa fa-certificate text-success"></i>
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
  </div>`,
  data: function () {
    return {
      style: ""
    }
  },
  methods: {
    disable() {

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
