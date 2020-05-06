<template>
  <label v-if="label" class="field-label">
    <span class="label-text" data-test="field-label-text">
      {{ label }}
    </span>
    <span v-if="required" class="required-indicator">*</span>

    <slot />
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String
    },
    secondaryMessages: {
      type: Array
    },
    required: {
      type: Object
    }
  },

  watch: {
    secondaryMessages(newVal) {
      return newVal;
    }
  }
};
</script>

<style lang="scss" scoped>
label {
  display: block;
  text-align: left;
}

.label-text {
  font-size: var(--f-xsmall);
  font-weight: var(--fw-light);
  letter-spacing: var(--spacing-md);
  line-height: var(--lh-xsmall);
  text-transform: uppercase;
}

.required-indicator {
  color: var(--c-red);
  font-size: var(--f-xsmall);
  font-weight: var(--fw-mid);
  line-height: var(--lh-small);
}
</style>
