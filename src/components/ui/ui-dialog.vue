<template>
  <teleport v-if="show" to="#app-dialog-area">
    <ui-frame>
      <div class="blocker" @click.self="onClick" @keydown="onKeydown">
        <ui-card ref="dialog" class="ui-dialog d-flex" :class="className" v-bind="$attrs" tabindex="1">
          <ui-card-title v-if="$slots.title" class="flex-shrink-0">
            <slot name="title" />
          </ui-card-title>
          <ui-card-text class="flex-grow-1 pa-4">
            <slot />
          </ui-card-text>
          <div class="v-divider" />
          <ui-card-actions v-if="$slots.actions" class="flex-shrink-0 px-4 py-2 actions">
            <slot name="actions" />
          </ui-card-actions>
        </ui-card>
      </div>
    </ui-frame>
  </teleport>
</template>

<script>
import { pushDialog, popDialog } from './app-state'

export default {
  props: {
    modal: {
      type: Boolean,
      default: false,
    },
    className: String,
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

  methods: {
    // public methods
    async open() {
      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.show = true
        this.$emit('open')
        pushDialog(this)
      })
    },

    close() {
      this.$emit('close')
      if (typeof this.resolve === 'function') {
        this.resolve()
      }
      this.show = false
      popDialog()
    },

    doFocus() {
      if (!this.$refs.dialog) {
        return
      }
      let el = this.$refs.dialog.$el.querySelector('[autofocus]') || this.$refs.dialog.$el
      el.focus()
    },

    onClick() {
      if (!this.modal) {
        this.close()
      }
    },

    onKeydown(evt) {
      if (!this.modal && evt.keyCode === 27) {
        this.close()
      }
    },
  },
}
</script>

<style lang="scss">
@import "../../assets/vars.scss";

.blocker {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 255, 0.1);
  display: flex;
  z-index: 1000;
  display: flex;
  .ui-dialog {
    max-width: calc(100% - 128px);
    min-width: 400px;
    min-height: 180px;
    margin: auto;
    background-color: #fff;
    > .actions {
      .ui-btn:not(:first-child) {
        margin-left: 8px;
      }
    }
    &:focus {
      outline: 1px dotted $color-primary;
    }
  }
}
</style>
