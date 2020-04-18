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
      required: true
    },
    vuelidate: {
      type: Object,
      required: true
    }
  },

  data: () => ({
    error: null,
    formState: null
  }),

  methods: {
    async submit() {
      this.vuelidate.$touch();
      this.error = null;
      if (!this.vuelidate.$invalid) {
        this.formState = FormStates.LOADING;
        await this.onSubmit()
          .then(() => {
            this.formState = FormStates.SUCCESS;
          })
          .catch(error => {
            this.error = error;
            this.formState = null;
          });
      }
    }
  }
};
</script>
