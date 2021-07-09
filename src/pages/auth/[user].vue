<route lang="yaml">
meta:
  layout: public
</route>

<template>
  <h1>Hello {{ $route.params.user }}</h1>
  <h2>{{ $route.query }}</h2>
</template>

<script >
export default {
  created() {
    console.log(this.$route.params, this.$router.query)
  },
}
</script>
