<template>
  <div class="ui-radio-group d-flex" :class="{ readonly, disabled }">
    <div class="label flex-shrink-0">
      <div class="text">
        {{ label }}
      </div>
    </div>
    <div class="outer flex-grow-1">
      <label v-for="item in items" :key="item.value" class="radio d-flex"
             :class="{ focus: focusItem === item.value }"
      >
        <input
          type="radio"
          :name="inputName0"
          :value="item[itemValue]"
          :readonly="readonly"
          :disabled="disabled"
          :checked="modelValue === item[itemValue]"
          @change="onChange(item)"
          @focus="onFocus(item)"
          @blur="onBlur"
          class="flex-shrink-0"
        >
        <div class="radio-label flex-grow-1">{{ item[itemText] || item }}</div>
      </label>
    </div>
  </div>
</template>

<script>
let instanceId = 0

export default {
  props: {
    modelValue: [String, Number, Object],
    label: String,
    itemText: {
      type: String,
      default: 'text',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    items: Array,
    inputName: String,
    readonly: Boolean,
    disabled: Boolean,
  },

  emits: [
    'update:modelValue',
  ],

  data() {
    return {
      id: 0,
      focusItem: '',
    }
  },

  computed: {
    inputName0() {
      return this.inputName || `radio-${this.id}`
    },
  },

  created() {
    if (!this.inputName) {
      this.id = instanceId++
    }
  },

  methods: {
    onChange(item) {
      this.$emit('update:modelValue', item[this.itemValue])
    },
    onBlur() {
      this.focusItem = ''
    },
    onFocus(item) {
      this.focusItem = item[this.itemValue]
    },
  },
}
</script>

<style lang="scss">
.ui-radio-group {
  margin-top: 2px;
  margin-bottom: 2px;
  .label {
    .text {
      box-sizing: border-box;
      line-height: 26px;
      margin-right: 4px;
      border-top: 1px solid transparent;
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    }
  }
  .outer {
    border: 1px solid #999;
    border-radius: 4px;
    padding: 3px;
    background-color: #fff;
    .radio {
      height: 28px;
      line-height: 28px;
      border: 1px solid transparent;
      border-radius: 4px;
      input {
        width: 32px;
        height: 16px;
        margin: 4px 0;
        outline: none;
      }
      .radio-label {

      }
      &.focus {
        border: 1px dotted #000;
      }
    }
  }
}
</style>
