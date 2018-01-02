Vue.component('game', {
  template: `
  <div>
    <top-bar></top-bar>
    <question></question>
  </div>
  `
})

Vue.component('top-bar', {
  template: `
  <div class="container-fluid">

    <div class="row">
      <div class="col-2 text-left">
        <p @click="window.history.back();" class="pl-1 pt-3">🔙</p>
      </div>

      <div class="col-8 text-center">
        <div class="pt-3">
          <span v-for="question in questions">{{question}}</span>
        </div>
      </div>

      <div class="col-2 text-right">
        <p @click="alert('Settings will be there')" class="pt-3 pr-1">⚙️</p>
      </div>
    </div>
  </div>
  `,
  data: function() {
    return questions = 10;
  }
});

Vue.component('question', {
  template: `
  <div>
    <div class="px-3">
      <painting></painting>
    </div>
    <div class="pt-4">
      <answers></answers>
    </div>
  </div>
  `
});

Vue.component('painting', {
  template: `
  <div>
    <img style="width: 100%; height: auto; box-shadow: 0 3px 2px #777;" src="http://artchallenge.me/painters/36/184.jpg"/>
  </div>
  `
});

Vue.component('answers', {
  template: `
  <div>
    <painterBtn v-for="painter in possiblePainters" :painter="painter"></painterBtn>
  </div>
  `,
  computed: {
    possiblePainters() {
      // return ['Белучи', "Хуючи", "Петручи", "Талучи"]
      return this.$root.paintersSet
    }
  }
});

Vue.component('painterBtn', {
  props: ["painter"],
  template: `
  <div class="card p-2" style="border-radius: 0" @click="answer();">
    <div class="card-block">
      <div class="row mr-0">
        <div class="col-2 text-right">
          <img width="60" :src="'img/painters/' + painter.id + '.png'" />
        </div>
        <div class="col-6">
          <span class="small">{{ painter.name.split(" ")[0] }}</span>
          <h4>{{ painter.name.split(" ").pop() }}</h4>
        </div>
        <div class="col-4 text-right text-nowrap pr-0">
          <img width="20" class='mb-1' :src="'img/nationality/' + painter.nationality[0] + '.png'" />
          <br>
          <span class="small pr-1">{{ painter.years }}</span>
        </div>
      </div>
    </div>
  </div>
  `,
  methods: {
   answer: function () {
     if (1 == 1) {
       swal(this.painter.name,'You are awesome!', 'success')
       // emit rightAnswer
     } else {
       swal('Oops!','Gustav Klimt' + ' was correct answer', 'error')
       // emit wrongAnswer
     }
   }
 },
});
