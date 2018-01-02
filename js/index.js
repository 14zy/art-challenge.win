Vue.component('quest', {
  props: ['quest'],
  computed: {
        countPainters() {
          return this.quest.painters.length
        }
      },
  template: `
  <div class="card p-2 mb-3" @click="app.loading = true; setTimeout(function(){window.location.href='game.html?quest='+quest.id},500);">
    <div class="card-block">
      <div class="row">
        <div class="col-8"><h4>{{quest.title}}</h4></div>
        <div class="col-4 text-right">
          <span v-show="quest.completed">
            <img class="img-fluid" width="20" src="img/awards/2.png">
          </span>
        </div>
      </div>
      {{quest.description}}
      <div class="row pt-2">
        <div v-show='quest.difficult == "easy"' class="col-8 text-success">
          {{quest.difficult | capitalize}}
        </div>
        <div v-show='quest.difficult == "basic"' class="col-8 text-primary">
          {{quest.difficult | capitalize}}
        </div>
        <div v-show='quest.difficult == "hard"' class="col-8 text-danger">
          {{quest.difficult | capitalize}}
        </div>
        <div class="col-4 text-right">{{countPainters}} Painters</div>
      </div>
    </div>
  </div>
  `,
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
});



Vue.component('quests-list', {
  template: `
  <div>
    <quest v-for="quest in this.$root.quests" :quest="quest"></quest>
  </div>
  `
});
