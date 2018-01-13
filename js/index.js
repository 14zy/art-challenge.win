Vue.component('quest', {
  props: ['quest'],
  template: `
    <div :id="quest.id" :class="{'animated rollOut': selected, 'animated flip': completedAnimation}" @click="selectQuest()">
      <div class="quest" :class="{'new-quest': completedAnimation}">
        <div class=" p-2 mb-3" :class="{'text-muted': !quest.available&&!quest.completed, 'text-success': quest.completed, 'text-primary': quest.available}">
          <span class="text-right pr-1 float-right" style="font-size: 20px; ">
            <i v-if="quest.available" class="fa fa-play-circle"></i>
            <i v-if="quest.completed" class="fa fa-check text-success"></i>
            <i v-if="!quest.completed && !quest.available" class="fa fa-lock"></i>
          </span>
          <h4>{{quest.title}} </h4>
          <img onerror="this.src='/img/ui/person.png';" v-for="i in quest.painters" :src="'img/painters/'+i+'.png'" width="14%">
          <br>
          <span class="text-capitalize small text-muted">
            {{quest.painters.length}} Painters, {{quest.difficult}}
          </span>
          <div v-show="quest.available || quest.completed" class="pr-1  text-right small float-right" style="font-size: 22px">
          </div>
        </div>
      </div>
    </div>`,
  data: function() {
    return {
      selected: false,
      completedAnimation: false
    }
  },
  updated: function() {
    if (this.quest.available && this.quest.id != "picasso" && this.$route.query.completed) {
      $('html, body').animate({scrollTop: $("#"+this.quest.id).offset().top-120}, 600);
      this.completedAnimation = true;
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
