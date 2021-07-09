<template>
  <h1>Loading... Pleas wait ({{ $store.getters.langName }})</h1>
  <ui-btn>test</ui-btn>
  <div>
    {{ $store.getters['ui/menusWithAcl'] }}
  </div>

  <router-link to="/" active-class="active">
    Index
  </router-link>
</template>

<script>
export default {
  setup() {

  },

  beforeCreate() {
    // this.$router.push('/auth')
    // this.$router.replace('/auth')
    // this.$router.go(-1)
  },
}
</script>
