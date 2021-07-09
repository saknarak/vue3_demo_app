<template>
  <div ref="frame" @keydown.stop="onKeydown" class="ui-frame">
    <input class="no-focus" @focus="onFocusFirst">
    <slot />
    <input class="no-focus" @focus="onFocusLast">
  </div>
</template>

<script>
const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default {
  props: {
    skipReadonly: Boolean,
  },

  methods: {
    selectOrFocus(el) {
      if (el.classList.contains('no-focus')) {
        return false
      }
      if (el.disabled) {
        return false
      }
      if (this.skipReadonly && el.readOnly) {
        return false
      }

      if (typeof el.select === 'function') {
        setTimeout(() => {
          el.select()
        }, 0)
        return true
      } else if (typeof el.focus === 'function') {
        setTimeout(() => {
          el.focus()
        }, 0)
        return true
      }

      return false
    },

    onFocusFirst() {
      let formObj = this.$refs.frame
      if (!formObj) {
        return
      }
      let els = formObj.querySelectorAll('input, textarea, select, button')
      if (!els.length) {
        return
      }
      for (let i = els.length - 1; i >= 0; i--) {
        let el = els[i]
        if (!el.classList.contains('no-focus') && this.selectOrFocus(el)) {
          return
        }
      }
    },

    onFocusLast() {
      let frameEl = this.$refs.frame
      if (!frameEl) {
        return
      }
      let els = frameEl.querySelectorAll(FOCUSABLE_SELECTOR)
      if (!els.length) {
        return
      }
      for (let el of els) {
        if (this.selectOrFocus(el)) {
          return
        }
      }
    },

    onKeydown(e) {
      if (e.keyCode !== 13 && e.keyCode !== 9) {
        return
      }
      if (e.keyCode === 13 && e.target.tagName === 'BUTTON') {
        return
      }
      let formObj = this.$refs.frame
      let els = formObj.querySelectorAll(FOCUSABLE_SELECTOR)
      let len = els.length
      let idx = -1
      for (let i = 0; i < len; i++) {
        if (els[i] === e.target) {
          idx = i
        }
      }
      if (idx === -1) {
        console.log('not enter on a focusable element')
        return
      }
      let dir = e.shiftKey ? -1 : 1
      for (let i = 1; i < len; i++) {
        let el = els[(len + idx + i * dir) % len]
        if (this.selectOrFocus(el)) {
          return
        }
      }
      e.stopPropagation()
    },
  },
}
</script>

<style lang="scss">
.ui-frame {
  > .no-focus {
    opacity: 0.01;
    position: absolute;
    left: 0;
    top: -1000px;
  }
}
</style>
