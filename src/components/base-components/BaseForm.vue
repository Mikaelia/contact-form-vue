<template>
  <form @submit.prevent="submit">
    <slot :error="error" :formState="formState" />
  </form>
</template>
<script>
export default {
  props: {
    onSubmit: {
      type: Function,
      required: true,
    },
  },

  data: () => ({
    error: null,
    formState: null,
  }),

  methods: {
    async submit() {
      this.error = null;
      this.formState = "loading";
      await this.onSubmit();
      console.log("submitted!");
      setTimeout(() => {
        this.formState = "success";
      }, 1000);
      // accepts custom submit function
      //   await this.onSubmit()
      //     .then(() => {
      //       this.formState = "success";
      //     })
      //     .catch(error => {
      //       this.error = error;
      //       this.formState = null;
      //     });
    },
  },
};
</script>
