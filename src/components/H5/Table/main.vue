<template>
  <table class="gc-table" :class="{ 'gc-table__border': border, 'gc-table__cell': !border }">
    <thead class="gc-table__head">
      <slot name="head"></slot>
    </thead>
    <tbody class="gc-table__body">
      <slot name="body"></slot>
    </tbody>
  </table>
</template>

<script>
/* eslint-disable */
export default {
  name: "m-table",
  props: {
    border: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="less">
.gc-table {
  position: relative;
  width: 100%;
  line-height: 36px;
  border-collapse: collapse;
  &:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    height: 1px; /* no */
    border-top: 1px solid #e5e5e5; /* no */
    color: #e5e5e5;
    transform-origin: 0 0;
    transform: scaleY(0.5);
    pointer-events: none;
  }
  th {
    font-weight: 500;
  }
  td,
  th {
    position: relative;
    border-bottom: 1px solid #e5e5e5; /* no */
    border-right: 1px solid #e5e5e5; /* no */
    text-align: center;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      height: 1px;
      border-bottom: 1px solid #e5e5e5; /* no */
      color: #e5e5e5;
      transform-origin: 0 100%;
      transform: scaleY(0.5);
      pointer-events: none;
    }
    &:after {
      content: "";
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      height: 1px;
      border-right: 1px solid #e5e5e5; /* no */
      color: #e5e5e5;
      transform-origin: 100% 0;
      transform: scaleX(0.5);
      pointer-events: none;
    }
  }
  &.gc-table__border {
    &:before {
      border-left: 1px solid #e5e5e5; /* no */
    }
    tr td:last-child::after,
    tr th:last-child::after {
      border-right-width: 1px;
    }
  }
  &.gc-table__cell {
    td,
    th {
      border-right-width: 0;
      border-bottom-width: 0;
      &:after {
        border-right-width: 0;
      }
    }
  }
  &__head,
  &__body {
    color: #333333;
    background: #ffffff;
  }
  tr td:last-child::after,
  tr th:last-child::after {
    border-right-width: 0;
  }
  tr:last-child td {
    &:before {
      border-bottom-width: 1px; /* no */
    }
  }
}
</style>
