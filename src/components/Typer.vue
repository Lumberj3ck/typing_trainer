<template>
  <div class="content_section">
    <div class="black text-base" v-if="isCaps">CapsLock turned on!</div>
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
      <div class="black text-base">Accuracy: {{ accuracy }} %</div>
      <a href="#" class="black text-base" v-if="next_level">Next level</a>
    </div>
  </div>
  <router-link to="/about" class="black">About page</router-link>
  <router-view class="black"></router-view>
</template>
<script>
import { modifierKeys } from './config'

export default {
  data() {
    return {
      selected: true,
      input_text: [],
      required_letter_index: 0,
      next_level: false,
      isCaps: true,
    }
  },
  mounted() {
    const input_value =
      'Lorem ipsum %^^|dolor sit, amet consectetur adipisicing elit. Officiis quis mollitia dolore. Facilis vitae mollitia molestiae reiciendis'
    for (let i = 0; i < input_value.length; i++) {
      this.input_text.push({ letter: input_value[i], state: 'default' })
    }
    document.addEventListener('keydown', this.checkTypedKey)
  },
  watch: {
    required_letter_index(newIndex, previousIndex) {
      if (this.required_letter_index + 1 == this.input_text.length) {
        this.next_level = true
      } else {
        this.next_level = false
      }
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
      if (this.required_letter_index === 0){
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
    checkCapsLockTurnedOn(event){
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
        if (event.key == 'Space') {
          event.preventDefault()
        }
        var is_right = this.current_required_key.letter == event.key
        if (this.input_text.length >= this.required_letter_index + 1) {
          this.current_required_key.state = is_right ? 'correct' : 'incorrect'
          if (this.input_text.length > this.required_letter_index + 1) {
            this.required_letter_index += 1
          }
        }
      }
    }
  }
}
</script>
<style scoped>
.flex{
  display: flex;
  gap: 10px;
}
.text-base{
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