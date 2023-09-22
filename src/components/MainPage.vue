<template>
  <div style="background-color: black">
    <div v-for="level_item, idx in levels_list" :key="level_item.id">
      <router-link :to="'level/' + level_item.id">Level {{ idx + 1 }}</router-link>
    </div>
  </div>
</template>

<script>
import { get_levels_list } from '../fetch_logic'

export default {
  emits: ['changed_input'],
  async mounted() {
    let resp = await get_levels_list()
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
