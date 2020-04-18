<template>
  <button @keypress.prevent="onClick" @click.prevent="onClick">
    <slot></slot>
  </button>
</template>
<script>
export default {
  props: {
    onClick: Function,
    inverse: Boolean
  }
};
</script>
<style lang="scss" scoped>
button {
  padding: 1rem 2rem;
  border: 1px solid rgba(216, 240, 245, 0.596);
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  background: none;
  transition-duration: 0.25s;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  z-index: 1;
  font-weight: 600;

  &:before {
    content: "";
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    background: white;
    height: 100%;
    transform: scaleX(0);
    transition: transform 0.2s ease;
    transform-origin: bottom left;
    z-index: -1;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.6);
    color: #50a3a2;

    &:before {
      transform: scaleX(1);
    }
  }
}
</style>
