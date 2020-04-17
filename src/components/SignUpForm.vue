<template>
  <BaseForm :onSubmit="signUp" #default="{ error, formState }">
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
