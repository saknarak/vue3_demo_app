<template>
  <ui-input
    ref="input"
    :model-value="displayValue"
    prefix-icon="label_outline"
    class="ui-date-input"
    outlined
    hide-details
    @focus="onFocus"
    @blur="onBlur"
    @change="onChange"
  />
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'UiDateInput',

  props: {
    modelValue: String,
    type: {
      type: String,
      default: 'date',
    },
    lang: String,
    yearFormat: {
      type: String,
    },
    displayFormat: {
      type: String,
      default: 'D MMM YYYY',
    },
    timeFormat: {
      type: String,
      default: 'HH:mm',
    },
    inputFormat: {
      type: String,
      default: 'DD/MM/YYYY',
    },
    autoSelect: {
      type: Boolean,
      default: true,
    },
  },

  emits: [
    'update:modelValue',
    'change',
  ],

  data() {
    return {
      isActive: false,
      isTouched: false,
      initialValue: this.modelValue,
      autosizeInitialized: false,
    }
  },

  computed: {
    dateValue: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      },
    },

    displayValue() {
      let lang = this.lang || this.$store.state.session?.user?.profile?.lang || 'en'
      let yearFormat = this.yearFormat || this.$store.state.session?.user?.profile?.yearFormat || 'ce'
      if (this.type === 'date') {
        let date = dayjs(this.modelValue).locale(lang)
        if (!date.isValid()) {
          return ''
        }
        return this.$util.formatDate(date, (this.isActive && this.inputFormat) || this.displayFormat, yearFormat)
      } else if (this.type === 'datetime') {
        let date = dayjs(this.modelValue).locale(lang)
        if (!date.isValid()) {
          return ''
        }
        return this.$util.formatDate(date, (this.isActive && this.inputFormat + ' HH:mm:ss') || (this.displayFormat + ' HH:mm:ss'), yearFormat)
      } else if (this.type === 'time') {
        return this.$util.parseTime(this.modelValue, this.timeFormat)
      } else if (this.type === 'duration') {
        return this.$util.parseDuration(this.modelValue)
      }
      return ''
    },
  },

  created() {
    if (this.modelValue === null) {
      this.initialValue = ''
      this.updateValue('')
    }
  },

  methods: {
    onChange(value) {
      let newValue = this.newValue(value)
      this.$emit('update:modelValue', newValue)
      this.$emit('change', newValue)
    },

    onFocus(v) {
      console.log('date focus')
      this.isActive = true
      if (this.autoSelect) {
        this.$nextTick(() => {
          this.$refs.input.$refs.input.select()
        })
      }
    },

    onBlur(e) {
      this.isActive = false
      // this.$emit('blur', e)
      if (!this.isTouched) {
        this.isTouched = true
        // this.$emit('touch')
      }
    },

    onDatePickerInput() {
      this.menu = false
      this.$nextTick(() => {
        this.$refs.input.$refs.input.select()
      })
    },

    updateValue(value) {
      this.$emit('update:modelValue', value)
    },

    newValue(v) {
      if (this.type === 'date') {
        return this.$util.parseDate(v, this.inputYear === 'en')
      } else if (this.type === 'datetime') {
        return this.$util.parseDateTime(v)
      } else if (this.type === 'time') {
        return this.$util.parseTime(v, this.timeFormat)
      } else if (this.type === 'duration') {
        return this.$util.parseDuration(v)
      }
      return ''
    },
  },
}
</script>
