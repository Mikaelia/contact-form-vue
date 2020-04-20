<template>
  <form @submit.prevent="submit">
    <slot :error="error" :formState="formState" />
  </form>
</template>

<script>
import { FormStates } from "../../config.js";

export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
    vuelidate: {
      type: Object,
    },
  },

  data: () => ({
    error: null,
    formState: null,
  }),

  methods: {
    async submit() {
      this.error = null;
      if (this.vuelidate) this.vuelidate.$touch();
      // vuelidate is not used, or all inputs invalid
      if (!this.vuelidate || !this.vuelidate.$invalid) {
        this.formState = FormStates.LOADING;
        await this.onSubmit()
          .then(() => {
            this.formState = FormStates.SUCCESS;
          })
          // error captured in slot context
          .catch((error) => {
            this.error = error;
            this.formState = null;
          });
      }
      this.error = "There are errors in input fields";
      setTimeout(() => {
        this.error = null;
      }, 2000);
    },
  },
};
</script>
