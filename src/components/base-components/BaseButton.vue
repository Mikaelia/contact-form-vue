<template>
  <button v-on="onClick ? { click: onClick } : {}">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    onClick: Function,
  },
};
</script>

<style lang="scss" scoped>
button {
  padding: 1rem 2rem;
  transition-duration: 0.25s;
  border-radius: 0.25rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
