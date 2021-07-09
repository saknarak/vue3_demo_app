<template>
  <div class="app-top d-flex">
    TOOLBAR {{ $store.getters.langName }}
    <ui-btn @click="$store.commit('setLang', 'th')">
      TH
    </ui-btn>
    <ui-btn @click="$store.commit('setLang', 'en')">
      EN
    </ui-btn>
  </div>
</template>
<script>
export default {
}
</script>
