<template>
  <label v-if="label" class="field-label">
    <span class="field-label-text" data-test="form-label-text">
      {{ label }}
    </span>
    <slot />
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  display: flex;
  justify-content: flex-start;
}

label .field-label-text {
  text-transform: uppercase;
  font-weight: 400;
}
</style>
