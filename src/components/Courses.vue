<template>
  <!-- <div v-for="course in courses" style="color: black;">
    <router-link :to="'/course/' + course.id">Course {{ course.language }}</router-link>
  </div> -->
  <div style="display: flex; gap:15px; margin: 10% auto; width: 300px; height: 100px;">
  <router-link :to="'/course/' + course.id" v-for="course in courses" style="color: black;">
  <svg :viewBox="course.image_viewbox" data-test="flag-fr" style="height: 71px; width: 92px;"><image height="3168" href="https://d35aaqx5ub95lt.cloudfront.net/vendor/87938207afff1598611ba626a8c4827c.svg" width="90" xlink:href="https://d35aaqx5ub95lt.cloudfront.net/vendor/87938207afff1598611ba626a8c4827c.svg"></image></svg>
  <div style="font-size: 17px">Course {{ course.language }}</div>
  </router-link>
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
