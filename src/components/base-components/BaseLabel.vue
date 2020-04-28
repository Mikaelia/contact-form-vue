<template>
  <label v-if="label" class="field-label">
    <div>
      <span class="label-text" data-test="field-label-text">
        {{ label }}
      </span>
      <span v-if="required" class="required-indicator">*</span>
    </div>
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
div {
  display: flex;
  align-items: center;
  line-height: var(--lh-med);
}

.label-text {
  font-size: var(--f-xsmall);
  font-weight: var(--fw-light);
  letter-spacing: var(--spacing-md);
  line-height: var(--lh-xsmall);
  text-transform: uppercase;
}

.required-indicator {
  margin-left: 0.2rem;
  color: var(--c-red);
  font-size: var(--f-xsmall);
  font-weight: var(--fw-mid);
  line-height: var(--lh-small);
}
</style>
