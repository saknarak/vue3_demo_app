<template>
  <router-view />
</template>

<script>
import { useHead } from '@vueuse/head'

export default {
  setup() {
    useHead({
      title: 'NS PROJECT',
      meta: [
        { name: 'description', content: 'NS PROJECT' },
      ],
    })
  },
}
</script>
