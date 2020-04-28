<template>
  <BaseButton v-bind="$attrs" :onClick="onClick">
    <slot></slot>
  </BaseButton>
</template>
<script>
import BaseButton from "./base-components/BaseButton";
export default {
  components: { BaseButton },
  props: {
    onClick: Function
  }
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 0.25s ease, outline 0.1s;
  border: 2px solid var(--c-green-4);
  background: white;
  color: var(--c-green-4);

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: all 0.2s ease;
    background: var(--c-green-4);
  }

  &:hover,
  &:focus {
    outline: none;
    background: var(--c-green-4);
    color: white;

    &:before {
      transform: scaleX(1);
    }
  }
}
</style>
