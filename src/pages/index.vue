<template>
  <my-card>
    <h1>Hello2</h1>
    <textarea v-model="text" />
    <button @click="sendText">
      SEND
    </button>

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
import mqtt from '../lib/mqtt'

export default {
  data() {
    return {
      text: '',
      list: [],
    }
  },

  mounted() {
    mqtt.$on('demo/text', (topic, payload) => {
      console.log(topic, payload)
    })
  },
  beforeUnmount() {
    mqtt.$off('demo/text')
  },

  methods: {
    sendText() {
      mqtt.$emit('demo/text', JSON.stringify({ text: this.text }))
    },
  },
}
</script>
