<template>
  <BaseLabel :vuelidate="vuelidate" :label="label">
    <span v-for="error in genErrorMessages" :key="error">
      {{ error }}
    </span>
    <input v-model="model" v-bind="$attrs" />
  </BaseLabel>
</template>

<script>
import BaseLabel from "./BaseLabel.vue";

export default {
  inheritAttrs: false,

  components: { BaseLabel },

  data: () => ({
    errorMessages: { required: "Required.", email: "Must be an email" }
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
      if (!this.invalid) {
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
