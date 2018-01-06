Vue.component('quest', {
  props: ['quest'],
  template: `
  <div v-if="!quest.hidden" :style="style" class="text-muted quest p-2 mb-3" @click="window.app.loading = true; setTimeout(function(){window.location.href='game.html?quest='+quest.id+'&mode='+quest.difficult},500);">

        <div :class="{ 'text-success': quest.completed, 'text-primary': quest.available}">
          <span class="text-right pr-1" style="font-size: 22px; float: right">

            <i v-if="quest.available" class="fa fa-play-circle"></i>
            <i v-if="quest.completed" class="fa fa-certificate text-success"></i>
            <i v-if="!quest.completed && !quest.available" class="fa fa-lock"></i>

          </span>
          <h4>{{quest.title}} </h4>
          {{quest.description}}
          <br>{{quest.painters}} Painters
          {{quest.difficult}}
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

Vue.component('quest-old', {
  props: ['quest'],
  template: `
  <div v-if="!quest.hidden" :style="style" class="quest card p-2 mb-3" @click="window.app.loading = true; setTimeout(function(){window.location.href='game.html?quest='+quest.id+'&mode='+quest.difficult},500);">
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
  </div>`,
  data: function () {
    return {
      style: "color: gray"
    }
  },
  methods: {
    disable() {
      // this.$root.zoomed = !this.$root.zoomed;
      // if (this.$root.zoomed) {
      //   this.style="max-width: 200%; width: auto;";
      // } else {
      //   this.style="";
      // }
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
           console.log(this.completedQuests);
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
               console.log(this.quests[i+1]);
             }
           };
         }
         //Смотрим локалсторадж

       }
  });

});
