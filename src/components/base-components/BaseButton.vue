<template>
  <button
    v-on="onClick ? { click: onClick } : {}"
    :class="{ 'full-width': fullWidth === true }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    onClick: Function,
    fullWidth: Boolean
  }
};
</script>

<style lang="scss" scoped>
button {
  padding: 0.75rem 2rem;
  border-radius: var(--br-1);
  font-size: var(--f-small);
  font-weight: var(--fw-bold);
  letter-spacing: var(--spacing-md);
  line-height: var(--lh-med);
  text-align: center;
  text-transform: uppercase;
  cursor: pointer;

  &.full-width {
    width: 100%;
  }
}
</style>
