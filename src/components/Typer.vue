<template>
  <div class="content_section">
    <div class="black text-base" v-if="isCaps">CapsLock turned on!</div>
    <div class="black text-base" >{{$route.params.id}} Level</div>
    <div class="black text-base" >Difficulty {{ level_info.difficulty }}</div>
    <div class="black text-base" >Created at {{ level_info.created_at }}</div>
    <span
      class="letter"
      v-for="(letter, idx) in input_text"
      :key="idx"
      :class="{
        correct: letter.state == 'correct',
        incorrect: letter.state == 'incorrect',
        default: letter.state == 'default',
        current: letter.current
      }"
    >
      {{ letter.letter }}
    </span>
    <div class="flex">
      <div class="black text-base"> Accuracy: {{ accuracy }} %</div>
      <router-link :to="'/level/' + next_level.id + '/'" class="black text-base" v-if="has_next_level">Next Level</router-link>
    </div>
  </div>
</template>
<script>
import { get_level, get_next_level }  from '../fetch_logic'
import { modifierKeys } from '../config'

export default {
  data() {
    return {
      selected: true,
      input_text: [],
      required_letter_index: 0,
      has_next_level: false,
      next_level: false,
      level_info: [],
      isCaps: true,
    }
  },
  async mounted() {
    document.addEventListener('keydown', this.checkTypedKey)
    let resp = await get_level(this.$route.params.id)
    this.next_level_handler()
    let input_value = resp.training_text
    this.level_info = resp
    for (let i = 0; i < input_value.length; i++) {
      this.input_text.push({ letter: input_value[i], state: 'default' })
    }
  },
  watch: {
    required_letter_index(newIndex, previousIndex) {
      // move cursor if deleted letter or new letter
      this.input_text[previousIndex].current = false
      // set new index of cursor
      this.input_text[newIndex].current = true
    }
  },
  computed: {
    current_required_key() {
      return this.input_text[this.required_letter_index]
    },
    accuracy() {
      if (this.required_letter_index === 0) {
        return 100
      }
      return Math.round(
        (this.input_text
          .slice(0, this.required_letter_index)
          .filter((response) => response.state === 'correct').length /
          this.required_letter_index) *
          100
      )
    }
  },
  methods: {
    async next_level_handler(){
      let resp = await get_next_level(this.$route.params.id)
      if (resp['next'] == undefined){
        this.next_level = resp 
        return
      }
      this.next_level = false
    }, 
    deleteTypedKey() {
      if (this.required_letter_index > 0) {
        if (this.input_text.at(-1).state !== 'default') {
          this.input_text[this.required_letter_index].state = 'default'
          return
        }
        this.input_text[this.required_letter_index - 1].state = 'default'
        this.required_letter_index -= 1
      }
    },
    checkCapsLockTurnedOn(event) {
      this.isCaps = event.getModifierState('CapsLock')
    },
    checkTypedKey(event) {
      this.checkCapsLockTurnedOn(event)
      if (modifierKeys.includes(event.key)) {
        // do nothing
      } else if (event.key == 'Backspace') {
        // delete typed key
        this.deleteTypedKey()
      } else {
        if (event.keyCode == 32) {
          event.preventDefault()
        }
        var is_right = this.current_required_key.letter == event.key
        if (this.input_text.length >= this.required_letter_index + 1) {
          this.current_required_key.state = is_right ? 'correct' : 'incorrect'
          if (this.input_text.length > this.required_letter_index + 1) {
            this.required_letter_index += 1
            this.has_next_level = false 
          }
          else if (this.input_text.length ==  this.required_letter_index + 1 && this.next_level ) {
            this.has_next_level = true
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.flex {
  display: flex;
  gap: 10px;
}
.text-base {
  font-size: 18px;
}
.content_section {
  max-width: var(--max-width);
  margin: 0 auto;
  position: absolute;
  top: 30%;
  left: 20%;
}
.current {
  border-bottom: 1px solid var(--correct-letter);
}
.m-2 {
  margin: 10px;
}
.default {
  color: #666;
}
.incorrect {
  color: darkred;
  background-color: pink;
}
.correct {
  color: var(--correct-letter);
  background: #d3e6fb;
}
.letter {
  font-size: 35px;
  font-weight: 400;
  white-space: pre-wrap;
  /* outline: 1px solid white; */
}
.black {
  color: black;
}
.poster {
  width: 50%;
}
.border-4 {
  border: 1px solid teal;
}
.block {
  margin-bottom: 10px;
  display: block;
}
.line {
  text-decoration: line-through;
}
.mb {
  margin-bottom: 10px;
}
.row {
  display: flex;
  gap: 10px;
  font-size: 20px;
}
.error {
  color: red;
}
.success {
  color: green;
}
.todo {
  color: black;
}
@import './assets/base.css';
</style>
