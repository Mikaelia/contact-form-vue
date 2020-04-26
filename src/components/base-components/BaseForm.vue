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
      type: Object
    }
  },

  data: () => ({
    error: null,
    formState: null
  }),

  methods: {
    setError(error) {
      this.error = error;
      setTimeout(() => {
        this.error = null;
      }, 2000);
      this.formState = null;
    },

    async submit() {
      this.error = null;
      if (this.vuelidate) this.vuelidate.$touch();
      // vuelidate is not used, or all inputs invalid
      if (!this.vuelidate || !this.vuelidate.$invalid) {
        this.formState = FormStates.LOADING;
        let err = await this.onSubmit();

        if (!err) this.formState = FormStates.SUCCESS;
        // error captured in slot context
        else {
          this.setError(err);
        }
      } else this.setError("There are errors in input fields");
    }
  }
};
</script>
