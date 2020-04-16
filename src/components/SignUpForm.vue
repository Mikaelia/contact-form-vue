<template>
  <BaseForm :onSubmit="signUp" #default="{ error, formState }">
    <BaseInput v-model="form.email" label="Email" />
    <BaseInput v-model="form.firstName" label="First Name" />
    <BaseInput v-model="form.middleName" label="Middle Name" />
    <BaseInput v-model="form.lastName" label="Last Name" />
    <BaseInput v-model="form.age" label="Age" type="number" />
    <LoadingButton
      :state="formState"
      class="signup-register-btn"
      data-test="signup-form-submit"
    >
      Submit
    </LoadingButton>
  </BaseForm>
</template>

<script>
import BaseInput from "./base-components/BaseInput.vue";
import BaseForm from "./base-components/BaseForm.vue";
import LoadingButton from "./base-components/LoadingButton";

export default {
  components: { BaseInput, BaseForm, LoadingButton },

  data: () => ({
    form: {
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      age: 0
    }
  }),

  methods: {
    signUp() {
      // TODO hook up w/ vuex to store state
      console.log(this.form);
      // const data = this.form;
      // this.$firestore.users.add(data);
      this.form = {
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        age: 0
      };
      this.$router.push({ name: "user" });
    }
  }
};
</script>
<style lang="css" scoped>
form {
  background: rgb(213, 209, 209);
  padding: 2rem;
}
</style>
