<template>
  <my-card>
    <h1>Hello2</h1>
    <template #row="{ item }">
      id={{ item.id }} name={{ item.name }} <ui-btn>OK</ui-btn>
    </template>
  </my-card>
  <my-card>
    <template #row="{ item }">
      name={{ item.name }} id={{ item.id }}
    </template>
  </my-card>
  <my-card />
  <my-card />

  <!-- <h1>Loading... Pleas wait ({{ $store.getters.langName }})</h1>
  <ui-btn>test</ui-btn>
  <div>
    {{ $store.getters['ui/menusWithAcl'] }}
  </div>

  <router-link to="/" active-class="active">
    Index
  </router-link> -->
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
