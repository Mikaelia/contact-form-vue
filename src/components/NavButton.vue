<template>
  <BaseButton v-bind="$props">
    <slot></slot>
  </BaseButton>
</template>
<script>
import BaseButton from "./base-components/BaseButton";
export default {
  components: { BaseButton },
  props: { onClick: Function }
};
</script>

<style lang="scss" scoped>
button {
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: all 0.25s ease, outline 0.1s;
  border: 1px solid var(--c-semi-white-3);
  background: none;
  color: white;

  &:before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scaleX(0);
    transform-origin: bottom left;
    transition: all 0.2s ease;
    background: white;
  }

  &:hover,
  &:focus {
    background: var(--c-semi-white-4);
    color: var(--c-green-2);

    &:before {
      transform: scaleX(1);
    }
  }
}
</style>
