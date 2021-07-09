<template>
  <form
    ref="form"
    class="ui-form"
    :class="{ disabled, readonly }"
    :disabled="disabled"
    :readonly="readonly"
    @submit.prevent="doSubmit"
  >
    <slot />
  </form>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'UiForm',

  provide() {
    return {
      formDisabled: computed(() => this.disabled),
      formReadonly: computed(() => this.readonly),
    }
  },

  props: {
    skipReadonly: Boolean,
    disabled: Boolean,
    readonly: Boolean,
  },

  methods: {
    doSubmit(e) {
      e.preventDefault()
      e.stopPropagation()
      return false
    },
  },
}
</script>
