<template>
  <div class="my-card">
    <div class="header">
      <slot name="title">
        TITLE2
      </slot>
    </div>
    <div class="content">
      <slot>
        CONTENT
      </slot>
    </div>
    <div class="list">
      <ul>
        <li v-for="row in rows" :key="row.id">
          <slot name="row" :item="row" :abc="1">
            {{ row }}
          </slot>
        </li>
      </ul>
    </div>
    <div class="actions">
      <slot name="footer">
        ACTIONS
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'This is title',
    },
    rows: {
      type: Array,
      default() {
        return [
          { id: 1, name: 'Name2' },
          { id: 2, name: 'Name2' },
        ]
      },
    },
  },
}
</script>
<style lang="scss">
.my-card {
  border: 1px solid red;
  border-radius: 8px;
  > .header {
    border-bottom: 1px solid red;
  }
  > .content {
    min-height: 100px;
  }
  > .actions {
    border-top: 1px solid red;
  }
}
</style>
