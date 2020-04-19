<template>
  <BaseForm
    :vuelidate="$v"
    :onSubmit="submitContact"
    #default="{ error, formState }"
  >
    <p v-if="error">A server error has occured</p>
    <div v-if="step === 1" class="form-step">
      <BaseInput
        v-model="form.email"
        :vuelidate="$v.form.email"
        label="Email"
      />
      <NavButton :onClick="next">Next</NavButton>
    </div>
    <div v-if="step === 2" class="form-step">
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
        <NavButton :onClick="prev">Previous</NavButton>

        <LoadingButton :state="formState" data-test="contact-form-submit">
          Submit
        </LoadingButton>
      </div>
    </div>
  </BaseForm>
</template>

<script>
import BaseInput from "./base-components/BaseInput.vue";
import BaseForm from "./base-components/BaseForm.vue";
import LoadingButton from "./LoadingButton";
import NavButton from "./NavButton.vue";
import { db } from "../firebase";
import { v4 } from "uuid";
import { required, email, minValue } from "vuelidate/lib/validators";

export default {
  components: { BaseInput, BaseForm, LoadingButton, NavButton },

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
    submitContact() {
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
  padding: 2rem;
  border: 0.2rem solid var(--c-semi-white-3);
  border-radius: var(--br-2);
  box-shadow: 0.5rem 0.5rem 1.5rem 1px rgba(0, 0, 0, 0.1);
  * + * {
    margin-top: 2rem;
  }
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
