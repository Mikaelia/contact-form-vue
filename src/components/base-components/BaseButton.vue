<template>
  <button v-on="onClick ? { keypress: onClick, click: onClick } : {}">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    onClick: Function
  }
};
</script>
<style lang="scss" scoped>
button {
  padding: 1rem 2rem;
  border-radius: 0.25rem;
  transition-duration: 0.25s;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
}
</style>
