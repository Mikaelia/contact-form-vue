<template>
  <label v-if="label" class="field-label">
    <div>
      <span class="label-text" data-test="field-label-text">
        {{ label }}
      </span>
      <span
        v-for="message in secondaryMessages"
        :key="message"
        class="secondary-message"
      >
        {{ message }}
      </span>
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
  justify-content: space-between;
  padding-bottom: 0.5rem;
  line-height: var(--lh-med);
}

.label-text {
  font-size: var(--f-small);
  font-weight: 400;
  letter-spacing: 0.2rem;
}

.secondary-message {
  padding: 0 0.5rem;
  border-radius: var(--br-1);
  background: var(--c-red);
  color: white;
  font-weight: 600;
  line-height: var(--lh-med);
}

.label-text,
.secondary-message {
  text-transform: uppercase;
}
</style>
