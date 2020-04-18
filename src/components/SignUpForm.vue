<template>
  <BaseForm :vuelidate="$v" :onSubmit="signUp" #default="{ error, formState }">
    <p v-if="error">A server error has occured</p>
    <div v-if="step === 1" class="form-step">
      <BaseInput
        v-model="form.email"
        :vuelidate="$v.form.email"
        label="Email"
      />
      <StyledButton :onClick="next">Next</StyledButton>
    </div>
    <div v-if="step === 2" class="form-step">
      <h1>Step One</h1>
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
      <div class="button-wrapper">
        <StyledButton :onClick="prev">Previous</StyledButton>

        <LoadingButton
          :state="formState"
          class="signup-register-btn"
          data-test="signup-form-submit"
        >
          Submit
        </LoadingButton>
      </div>
    </div>
  </BaseForm>
</template>

<script>
import BaseInput from "./base-components/BaseInput.vue";
import BaseForm from "./base-components/BaseForm.vue";
import LoadingButton from "./base-components/LoadingButton";
import StyledButton from "./StyledButton.vue";
import { db } from "../firebase";
import { v4 } from "uuid";
import { required, email, minValue } from "vuelidate/lib/validators";

export default {
  components: { BaseInput, BaseForm, LoadingButton, StyledButton },

  data: () => ({
    step: 1,
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
    prev() {
      this.step--;
    },
    next() {
      this.step++;
    },
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
<style lang="scss" scoped>
form {
  /* background: rgba(213, 209, 209, 0.24); */
  border: 2px solid rgba(216, 240, 245, 0.596);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0.5rem 0.5rem 1.5rem 1px rgba(0, 0, 0, 0.1);
}

form * + * {
  margin-top: 2rem;
}

.form-step {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;

  & > * + * {
    margin-left: 1rem;
  }
}
</style>
