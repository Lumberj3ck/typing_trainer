<template>
  <div class="content_section">
    <div class="black text-base" v-if="isCaps">CapsLock turned on!</div>
    <div class="flex">
    <div class="black text-base">{{ $route.params.id }} Level</div>
    <div class="black text-base">Difficulty {{ level_info.difficulty }}</div>
    <div class="black text-base">Created at {{ level_info.created_at }}</div>
    </div>
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
      <router-link
        :to="'/level/' + next_level.id + '/'"
        class="black text-base"
        v-if="has_next_level"
        >Next Level</router-link
      >
    </div>
  </div>
</template>
<script>
import { get_level, get_next_level } from '../fetch_logic'
import { modifierKeys } from '../config'

export default {
  data() {
    return {
      selected: true,
      input_text: [],
      lang_code: null,
      required_letter_index: 0,
      has_next_level: false,
      next_level: false,
      level_info: [],
      isCaps: true
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
  watch: {
    required_letter_index(newIndex, previousIndex) {
      if (this.input_text.length == 0) {
        return
      }
      // move cursor if deleted letter or new letter
      this.input_text[previousIndex].current = false
      // set new index of cursor
      this.input_text[newIndex].current = true
    },
    // track route changing
    $route(to, from) {
      // reset to initial state and get new level data
      if (to.params.id !== from.params.id) {
        this.reset()
        this.set_level_data()
      }
    }
  },
  created() {
    this.set_level_data()
  },
  methods: {
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    async set_level_data() {
      document.addEventListener('keydown', this.checkTypedKey)
      let resp = await get_level(this.$route.params.id)
      this.lang_code = resp.language 
      this.next_level_handler()
      let input_value = resp.training_text
      this.level_info = resp
      for (let i = 0; i < input_value.length; i++) {
        this.input_text.push({ letter: input_value[i], state: 'default' })
      }
    },
    async next_level_handler() {
      let resp = await get_next_level(this.$route.params.id, this.lang_code)
      if (resp['next'] == undefined) {
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
        return
      } else if (event.key == 'Backspace') {
        // delete typed key
        this.deleteTypedKey()
      } else {
        this.processTypedKey(event)
      }
    },
    processTypedKey(event) {
      if (event.keyCode == 32) {
        event.preventDefault()
      }
      if (this.input_text.length >= this.required_letter_index + 1) {
        this.handleKeyResult(event)
      }
    },
    handleKeyResult(event) {
      var is_right = this.current_required_key.letter == event.key
      this.current_required_key.state = is_right ? 'correct' : 'incorrect'
      if (this.input_text.length > this.required_letter_index + 1) {
        this.required_letter_index += 1
        this.has_next_level = false
      } else if (this.input_text.length == this.required_letter_index + 1) {
        document.removeEventListener('keydown', this.checkTypedKey)
        if (this.next_level) {
          this.has_next_level = true
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
