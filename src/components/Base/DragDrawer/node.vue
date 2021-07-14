<template>
  <div :class="`${prefix}-move-trigger`">
    <div :class="`${prefix}-move-trigger-point`"><i></i><i></i><i></i><i></i><i></i></div>
  </div>
</template>

<script>
export default {
  name: "DragDrawerTrigger",
  data() {
    return {
      prefix: "drag-drawer"
    };
  }
};
</script>
