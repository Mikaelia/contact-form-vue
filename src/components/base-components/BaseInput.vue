<template>
  <BaseLabel
    :vuelidate="vuelidate"
    :label="label"
    :secondaryMessages="genErrorMessages"
  >
    <input v-model="model" v-bind="$attrs" />
  </BaseLabel>
</template>

<script>
import BaseLabel from "./BaseLabel.vue";

const ERROR_MESSAGES = {
  required: "Required.",
  email: "Must be an email"
};

export default {
  inheritAttrs: false,

  components: { BaseLabel },

  data: () => ({
    errorMessages: ERROR_MESSAGES
  }),

  props: {
    vuelidate: Object,
    value: {
      type: [String, Number, Boolean],
      default: null
    },
    label: String,
    customErrorMessages: [Object]
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    },

    genErrorMessages() {
      return this.errors.map(v => {
        if (this.customErrorMessages && this.customErrorMessages[v])
          return this.customErrorMessages[v];
        if (this.errorMessages[v]) return this.errorMessages[v];
        return "Invalid Entry";
      });
    },

    errors() {
      if (!this.vuelidate || !this.invalid) {
        return [];
      }
      return Object.keys(this.vuelidate.$params).filter(v => {
        if (!this.vuelidate[v]) return v;
      });
    }
  },

  methods: {
    invalid() {
      return this.vuelidate.$dirty && this.vuelidate.$invalid;
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  display: block;
  width: 25rem;
  padding: 1rem 1.5rem;
  transform-origin: bottom left;
  transition-duration: 0.25s;
  border: 1px solid var(--c-semi-white-2);
  border-radius: var(--br-1);
  outline: 0;
  background-color: var(--c-semi-white-1);
  color: white;
  font-size: var(--f-med);
  font-weight: 300;
  text-align: center;

  &:hover {
    background-color: var(--c-semi-white-2);
  }

  &:focus {
    background-color: var(--c-semi-white-4);
    color: var(--c-blue-text);
  }
}
</style>
