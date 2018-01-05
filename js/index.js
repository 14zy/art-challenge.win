Vue.component('quest', {
  props: ['quest'],
  template: `
  <div v-if="!quest.hidden" class="quest card p-2 mb-3" @click="window.app.loading = true; setTimeout(function(){window.location.href='game.html?quest='+quest.id+'&mode='+quest.difficult},500);">
    <div class="card-block">
      <div class="row">
        <div class="col-8"><h4>{{quest.title}}</h4></div>
        <div class="col-4 text-right">
          <span v-if="quest.completed">
            <img class="img-fluid" width="20" src="img/awards/2.png">
          </span>
          <span v-else>
            Play <img class="img-fluid" width="20" src="img/ui/play-icon.png">
          </span>
        </div>
      </div>
      {{quest.description}}
      <div class="row pt-2">
        <div class="col-4 text-left">{{quest.painters}} Painters</div>
        <div v-if='quest.difficult == "easy"' class="col-8 text-right text-success text-capitalize">
          {{quest.difficult}}
        </div>
        <div v-else-if='quest.difficult == "basic"' class="col-8 text-right text-primary text-capitalize">
          {{quest.difficult}}
        </div>
        <div v-else-if='quest.difficult == "hard"' class="col-8 text-right text-danger text-capitalize">
          {{quest.difficult}}
        </div>
      </div>
    </div>
  </div>`
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
         this.completedQuests = localStorage.getItem("completed").split(",");
         console.log(this.completedQuests);
       }
  });

});
