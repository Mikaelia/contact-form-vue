<template>
  <label v-if="label" class="field-label">
    <div>
      <span class="field-label-text" data-test="form-label-text">
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
      type: []
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
}

div * + * {
  padding-left: 1rem;
}

label .field-label-text {
  text-transform: uppercase;
  font-weight: 400;
}

.secondary-message {
  color: red;
}
</style>
