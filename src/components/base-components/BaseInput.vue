<template>
  <BaseLabel :label="label">
    <input v-model="model" v-bind="$attrs" />
  </BaseLabel>
</template>

<script>
import BaseLabel from "./BaseLabel.vue";

export default {
  inheritAttrs: false,

  components: { BaseLabel },

  props: {
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    label: String,
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style scoped>
input {
  width: 100%;
  border: 1px solid #d6d6d6;
  border-radius: 1px;
  padding: 0.5rem;
  margin-top: 0.2rem;
}

.error {
  border-color: rgba(206, 65, 65, 0.6);
}
</style>
