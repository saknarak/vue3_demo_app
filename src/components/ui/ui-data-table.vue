<template>
  <div class="ui-data-table" :class="{ busy }" :style="{ height: (uiHeight + (showSummary ? 32 : 0)) + 'px'}" @wheel.passive="doScroll" @scroll.passive="doScroll">
    <div class="wrap" :style="uiStyle">
      <table class="table">
        <colgroup>
          <col style="width: 40px">
          <col v-for="col in cols" :key="col.key" :style="{ width: typeof col.width === 'number' ? `${col.width}px` : col.width }">
        </colgroup>
        <thead>
          <tr>
            <th class="fixed-left fixed-top header" :style="{ height: headerHight + 'px' }">
              &nbsp;
            </th>
            <th v-for="col in cols" :key="col.key" class="caption" :style="{ textAlign: col.align }">
              <slot :name="`header.${col.key}`" :col="col" :cols="cols">
                {{ col.text }}
              </slot>
            </th>
          </tr>
          <tr class="filter" v-if="showFilter">
            <th class="fixed-left fixed-top header" />
            <th v-for="col in cols" :key="col.key">
              <input type="text" :disabled="busy">
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, i) in displayRows" :key="row._key" :style="{height: rowHeight + 'px'}" @dblclick="$emit('item-dblclick', row)">
            <td class="fixed-left text-right header" :style="{ height: `${rowHeight}px`, lineHeight: `${rowHeight}px` }">
              {{ offset + i + 1 }}
            </td>
            <td v-for="col in cols" :key="col.key" :title="row[col.key]" :class="[col.align ? `text-${col.align}` : null]" :style="{ height: `${rowHeight}px`, lineHeight: `${rowHeight}px` }">
              <slot :name="`item.${col.key}`" :item="row">
                {{ row[col.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="showSummary" class="caption px-4 py-1">
      <div small v-if="activeRows.length">
        {{ displaySummary }}
      </div>
      <div small v-else>
        No row to display
      </div>
    </div>
    <div ref="v-scroll" class="scroller" @scroll.passive="doScroll" @wheel.passive="doScroll" :style="{height:`${rowDisplay * (rowHeight + 1)}px`}">
      <div class="track" :style="scrollStyle" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiDataTable',

  props: {
    busy: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Array,
      default() {
        return []
      },
    },
    cols: {
      type: Array,
      default() {
        return [
          { key: 'code', text: 'CODE' },
          { key: 'name', text: 'NAME' },
        ]
      },
    },
    rowDisplay: {
      type: Number,
      default: 10,
    },
    rowHeight: {
      type: Number,
      default: 24,
    },
    headerHight: {
      type: Number,
      default: 32,
    },
    showFilter: {
      type: Boolean,
      default: false,
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    pk: {
      type: String,
      default: 'id',
    },
  },

  emits: [
    'offset-changed',
    'offset-end',
    'item-dblclick',
  ],

  data() {
    return {
      offset: 0,
    }
  },

  computed: {
    uiHeight() {
      return this.headerHight + (this.showFilter ? 32 : 0) + this.rowDisplay * (this.rowHeight + 1) + 20
    },
    uiStyle() {
      return {
        height: this.uiHeight + 'px',
      }
    },
    scrollStyle() {
      return {
        height: this.busy ? '1px' : `${this.rows.length * (this.rowHeight + 1)}px`,
      }
    },
    activeRows() {
      return this.rows
    },
    displayRows() {
      return this.activeRows.slice(this.offset, this.offset + this.rowDisplay)
    },
    tableWidth() {
      return this.cols.reduce((p, c) => p + parseInt(c.width || 50) + 1, 10)
    },
    displaySummary() {
      return `${this.$util.formatNumber(this.offset + 1)} to ${this.$util.formatNumber(Math.min(this.activeRows.length, this.offset + this.rowDisplay))} of ${this.$util.formatNumber(this.activeRows.length)}`
    },
  },

  watch: {
    rows(rowsNew, rowsPrev) {
      if (this.offset < rowsNew.length && this.pk && rowsPrev[this.offset]) {
        let idPrev = rowsPrev[this.offset][this.pk]
        let idNew = rowsNew[this.offset][this.pk]
        if (idPrev === idNew) {
          return
        }
      }
      this.offset = 0
      this.$refs['v-scroll'].scrollTop = 0
    },
  },

  methods: {
    doScroll(evt) {
      if (this.busy) {
        return
      }
      let oldOffset = this.offset
      if (this.rows.length === 0) {
        this.selectedIndex = -1
        this.offset = 0
        if (oldOffset !== this.offset) {
          this.$emit('offset-changed', this.offset)
          if (this.offset + this.displayRows + 5 >= this.activeRows.length) {
            this.$emit('offset-end')
          }
        }
        return
      }
      if (!this.$refs['v-scroll']) {
        return
      }
      if (evt.deltaY) {
        this.$refs['v-scroll'].scrollTop += evt.deltaY
      }
      let top = this.$refs['v-scroll'].scrollTop
      this.offset = Math.max(0, Math.min(this.rows.length - this.rowDisplay, Math.round(top / (this.rowHeight + 1))))
      if (oldOffset !== this.offset) {
        this.$emit('offset-changed', this.offset)
        if (this.offset + this.rowDisplay + 5 >= this.activeRows.length) {
          this.$emit('offset-end')
        }
      }
    },
  },
}
</script>

<style lang="scss">
.ui-data-table {
  overflow: hidden;
  position: relative;
  padding-right: 18px;
  background-color: #fff;
  &.busy {
    cursor: wait;
  }
  .wrap {
    overflow: scroll hidden;
  }
  .fixed-top {
    // position: sticky;
    top: 0px;
  }
  .fixed-left {
    position: sticky;
    left: 0px;
  }
  .progress {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
  .table {
    table-layout: fixed;
    width: 100%;
    border-collapse: collapse;
    thead {
      .header {
        background-color: #fff;
        height: 32px;
      }
      th {
        padding: 0 3px 0 4px;
        border-right: 1px solid rgba(0, 0, 0, 0.25);
        border-bottom: 1px solid rgba(0, 0, 0, 0.25);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
      }
      .filter {
        input {
          width: 100%;
          border: 1px solid red;
          outline: none;
        }
      }
    }
    tbody {
      tr {
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        td {
          padding: 0 4px;
          border-right: 1px solid #eee;
          border-bottom: 1px solid #eee;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          &.header {
            background-color: #eee;
            font-size: 11px;
            padding: 0 2px 0 0;
          }
        }
      }
    }
  }
  .scroller {
    position: absolute;
    right: 0;
    bottom: 17px; //  + 32px;
    width: 17px;
    overflow: hidden scroll;
    .track {
      width: 10px;
    }
  }
}
</style>
