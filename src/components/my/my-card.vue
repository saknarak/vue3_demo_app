<template>
  <div class="my-card">
    <div class="header">
      TITLE
    </div>
    <div class="content">
      CONTENT
    </div>
    <div class="actions">
      ACTIONS
    </div>
  </div>
</template>
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
