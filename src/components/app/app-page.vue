<template>
  <div class="app-page">
    <div class="header-title">
      <slot name="header-title"/>
    </div>
    <div class="header-right justify-end">
      <slot name="header-right"/>
    </div>
    <div class="page-content">
      <slot />
    </div>
  </div>
</template>
<style lang="scss">
  .app-page {
    width: 100%;
    padding: 12px;
    margin-right: auto;
    margin-left: auto;

    .header-title {
      padding: 0px 10px;
      font-size: 1.2rem;
      font-weight: 600;
      img {
        vertical-align: middle;
        height: 65px;
      }
    }
    .header-right {
      display: flex;
      flex-wrap: wrap;
      flex: 1 1 auto;
      button {
        margin-left: 4px;
      }
    }
    .page-content {
      background: white;
      padding: 20px;
      border-radius: .3rem;
    }
  }

  @media (min-width: 320px) {
    .app-page {
      padding: 0px;
      max-width: 100%;
    }
  }
  @media (min-width: 960px) {
    .app-page {
      max-width: 900px;
    }
  }
  @media (min-width: 1264px) {
    .app-page {
      max-width: 1185px;
    }
  }
  @media (min-width: 1904px) {
    .app-page {
      max-width: 1785px;
    }
  }

</style>