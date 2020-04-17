<template>
  <BaseForm :vuelidate="$v" :onSubmit="signUp" #default="{ error, formState }">
    <p v-if="error">A server error has occured</p>
    <BaseInput v-model="form.email" :vuelidate="$v.form.email" label="Email" />
    <BaseInput
      v-model="form.firstName"
      :vuelidate="$v.form.firstName"
      label="First Name"
    />
    <BaseInput v-model="form.middleName" label="Middle Name" />
    <BaseInput
      v-model="form.lastName"
      :vuelidate="$v.form.lastName"
      label="Last Name"
    />
    <BaseInput
      v-model.number="form.age"
      :vuelidate="$v.form.age"
      label="Age"
      type="number"
      :customErrorMessages="{ minValue: 'Must be over 18' }"
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
import { required, email, minValue } from "vuelidate/lib/validators";

export default {
  components: { BaseInput, BaseForm, LoadingButton },

  data: () => ({
    form: {
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      age: null
    }
  }),

  validations: {
    form: {
      email: {
        required,
        email
      },
      firstName: {
        required
      },
      lastName: {
        required
      },
      age: {
        required,
        minValue: minValue(18)
      }
    }
  },

  methods: {
    resetForm() {
      this.form = {
        email: "",
        firstName: "",
        middleName: "",
        lastName: "",
        age: 0
      };
    },
    signUp() {
      const userId = v4();
      const data = this.form;
      return db
        .collection("users")
        .doc(userId)
        .set(data)
        .then(() => {
          this.resetForm();
          this.$router.push(`/user/${userId}`);
        });
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
