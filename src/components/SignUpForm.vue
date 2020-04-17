<template>
  <BaseForm :onSubmit="signUp" #default="{ error, formState }">
    <BaseInput v-model="form.email" :vuelidate="$v.form.email" label="Email" />
    <BaseInput v-model="form.firstName" label="First Name" />
    <BaseInput v-model="form.middleName" label="Middle Name" />
    <BaseInput v-model="form.lastName" label="Last Name" />
    <BaseInput
      v-model="form.age"
      label="Age"
      type="number"
      customErrorMessage="Must be over 18"
    />
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
import { db } from "../firebase";
import { v4 } from "uuid";
import { required, email } from "vuelidate/lib/validators";

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

  validations: {
    form: {
      email: {
        required,
        email
      }
    }
  },

  methods: {
    signUp() {
      // TODO hook up w/ vuex to store state
      const userId = v4();
      console.log(userId);
      const data = this.form;
      db.collection("users")
        .doc(userId)
        .set(data);

      this.form = {
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        age: 0
      };

      this.$router.push(`/user/${userId}`);
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
