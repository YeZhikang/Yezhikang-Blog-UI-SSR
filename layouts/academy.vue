<template>
  <div>
    <academy-nav/>
    <nuxt/>
  </div>
</template>

<script>
import AcademyNav from "../components/academy/AcademyNav";
export default {
    name: "academy",
    components: { AcademyNav }
}
</script>

<style scoped>

</style>
