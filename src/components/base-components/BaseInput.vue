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
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.452);
  background-color: rgba(255, 255, 255, 0.233);
  width: 25rem;
  border-radius: 0.3rem;
  padding: 1rem 1.5rem;
  display: block;
  text-align: center;
  font-size: 1.8rem;
  color: white;
  transition-duration: 0.25s;
  transform-origin: bottom left;
  font-weight: 300;

  &:hover {
    background-color: rgba(255, 255, 255, 0.452);
  }

  &:focus {
    background-color: rgba(255, 255, 255, 0.788);
    /* transform: scaleX(1.08); */
    color: #50a3a2;
  }
}
</style>
