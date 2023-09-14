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
//spotahome gisma221 // uniplaces gisma1020
<template>
    <router-link to="/about" class="black">About page</router-link>
    <router-view class="black"></router-view>
</template>

<style scoped>
@import './assets/base.css';
</style>
