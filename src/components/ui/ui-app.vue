<template>
  <div ref="app" class="v-application ui-app" :class="{ 'full-hd': $store.state.fullhd }">
    <slot />
    <div id="app-dialog-area" />
    <div id="app-toast-area" />
  </div>
</template>

<script>
import { toRef, computed, provide, onMounted, reactive } from 'vue'
import UiEvent from './ui-event'

export default {

  setup(props, { attrs, slots, emit }) {
    const dirty = toRef(false)
    const dialogStack = reactive([])
    const toastStack = reactive([])

    // methods
    const setDirty = function(value) {
      dirty.value = !!value
    }

    provide('isDirty', computed(() => dirty))
    provide('setDirty', setDirty)

    onMounted(() => {
      console.log('mounted')
      document.querySelector('html').addEventListener('click', () => {
        UiEvent.$emit('page-click')
      })
    })

    return {
      dialogStack,
      toastStack,
    }
  },

  beforeCreate() {
    // TODO: check session
  },
}
</script>

<style lang="scss">
#app-toast-area {
  pointer-events: none;
  z-index: 2000;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}
</style>
