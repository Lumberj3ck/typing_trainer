<template>
  <div style="color: gray; font-size: 17px; margin-left: 40px; margin-top: 40px;">
    <router-link :to="'/level/' + level_item.id" v-for="level_item in levels_list" :key="level_item.id" style="display: block; border: 1px solid black; width: max-content; padding: 7px; border-radius: 10px; min-width: 240px; margin-bottom: 10px;">
      Level {{ level_item.name }} {{ level_item.language }}
    </router-link>
  </div>
</template>

<script>
import { get_levels_list, get_levels_list_by_lang } from '../fetch_logic'

export default {
  emits: ['changed_input'],
  async mounted() {
    let resp = await get_levels_list_by_lang(this.$route.params.id)
    // let resp = await get_levels_list()
    this.levels_list = resp
  },
  data() {
    return {
      counter: 0,
      input: 100,
      levels_list: null
    }
  },
  methods:{
    incrementCounter(){
       this.counter++ 
       return this.counter
    }
  }
}
</script>
