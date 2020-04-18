<template>
  <label v-if="label" class="field-label">
    <div class="text-wrapper">
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
}

.text-wrapper {
  display: flex;
  align-items: center;
  line-height: 2rem;
  justify-content: space-between;
  padding-bottom: 0.5rem;
}

label .field-label-text {
  text-transform: uppercase;
  font-weight: 400;
  font-size: 1.5rem;
  letter-spacing: 0.2rem;
}

.secondary-message {
  color: white;
  font-weight: bold;
  background: rgb(213, 108, 108);
  line-height: 1.5rem;
  padding: 0 0.5rem;
  text-transform: uppercase;
  border-radius: 0.3rem;
}
</style>
