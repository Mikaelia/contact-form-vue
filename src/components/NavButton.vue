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
  border: 1px solid rgba(216, 240, 245, 0.596);
  color: white;
  background: none;
  position: relative;
  overflow: hidden;
  z-index: 1;

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
