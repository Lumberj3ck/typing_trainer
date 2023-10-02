<template>
  <div v-for="course in courses" style="color: black;">
    <router-link :to="'/course/' + course.id">Course {{ course.language }}</router-link>
  </div>
</template>

<script>
import { get_lang_list } from '../fetch_logic'
export default {
  data() {
    return { courses: 0 }
  },
  async mounted() {
    let response = await get_lang_list()
    this.courses = response
  }
}
</script>
