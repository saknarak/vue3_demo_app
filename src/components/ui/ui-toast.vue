<template>
  <teleport to="#app-toast-area" v-if="show">
    <div
      v-if="show"
      class="ui-toast elevation-4 px-4 py-2 rounded d-flex flex-row"
      :style="style"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div class="text flex-grow">
        <slot />
      </div>
      <div class="actions flex-shrink-0 ml-4 d-flex">
        <slot name="actions">
          <ui-btn @click="close">
            OK
          </ui-btn>
        </slot>
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  props: {
    timeout: {
      type: Number,
      default: 0,
    },
    color: String,
    bgColor: String,
  },

  emits: [
    'open',
    'close',
  ],

  data() {
    return {
      show: false,
    }
  },

  computed: {
    style() {
      return {
        color: this.color,
        backgroundColor: this.bgColor,
      }
    },
  },

  methods: {
    // public method
    async open() {
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.show = true
        setTimeout(() => {
          this.$emit('open')
          this.setTimer()
        }, 0)
      })
    },

    close() {
      clearTimeout(this.timer)
      if (typeof this.resolve === 'function') {
        this.resolve()
      }
      this.$emit('close')
      this.show = false
    },

    setTimer() {
      clearTimeout(this.timer)
      if (this.timeout) {
        this.timer = setTimeout(() => {
          this.close()
        }, this.timeout)
      }
    },

    onMouseEnter() {
      clearTimeout(this.timer)
    },

    onMouseLeave() {
      this.setTimer()
    },
  },
}
</script>

<style lang="scss">
.ui-toast {
  pointer-events: initial;
  margin: 0 auto;
  margin-bottom: 16px;
  background-color: rgba(48, 48, 48, 0.9);
  > .text {
    min-width: 80px;
    line-height: 32px;
    color: #fff;
  }
  > .actions {
    > *:not(:first-child) {
      margin-left: 4px;
    }
  }
}
</style>
