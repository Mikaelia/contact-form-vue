<template>
  <div class="input-wrapper">
    <BaseLabel :label="label" :required="isRequired">
      <input
        v-model="model"
        v-bind="$attrs"
        :type="type"
        :aria-invalid="genErrorMessages.length > 0"
      />
    </BaseLabel>
    <BaseErrorMessage
      v-for="message in genErrorMessages"
      :key="message"
      :message="message"
      class="secondary-message"
    />
  </div>
</template>

<script>
import BaseLabel from "./BaseLabel.vue";
import BaseErrorMessage from "./BaseErrorMessage.vue";

const ERROR_MESSAGES = {
  required: "Required.",
  email: "Must be an email",
};

export default {
  inheritAttrs: false,

  components: { BaseLabel, BaseErrorMessage },

  data: () => ({
    errorMessages: ERROR_MESSAGES,
  }),

  props: {
    vuelidate: Object,
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    label: String,
    customErrorMessages: [Object],
    type: String,
  },

  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.vuelidate && this.vuelidate.$touch();
        // const sanitized =
        //   this.type === "number"
        //     ? value
        //     : value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        this.$emit("input", value);
      },
    },

    isRequired() {
      return this.vuelidate && this.vuelidate.$params.required;
    },

    genErrorMessages() {
      return this.errors.map((v) => {
        // use custom error messages if set
        if (this.customErrorMessages && this.customErrorMessages[v])
          return this.customErrorMessages[v];
        // use default
        if (this.errorMessages[v]) return this.errorMessages[v];
        return "Invalid Entry";
      });
    },

    errors() {
      if (!this.vuelidate || !this.invalid()) {
        return [];
      }
      // filter out errored rules
      return Object.keys(this.vuelidate.$params).filter((v) => {
        if (!this.vuelidate[v]) return v;
      });
    },
  },

  methods: {
    invalid() {
      return this.vuelidate.$dirty && this.vuelidate.$invalid;
    },
  },
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
  width: 100%;
}

input {
  display: block;
  width: 100%;
  padding: 0.5rem 0;
  transform-origin: bottom left;
  transition-duration: 0.25s;
  border: none;
  border-bottom: 1px solid var(--c-black);
  outline: 0;
  color: var(--c-black);
  font-size: var(--f-med);
  font-weight: var(--fw-bold);
  letter-spacing: var(--spacing-sm);
  line-height: var(--lh-med);

  &::placeholder {
    color: var(--c-grey);
  }
}

.secondary-message {
  position: absolute;
  right: 0;
  bottom: -2.5rem;
}
</style>
