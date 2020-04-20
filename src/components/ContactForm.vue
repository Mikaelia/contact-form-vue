<template>
  <BaseForm
    :vuelidate="$v"
    :onSubmit="submitContact"
    v-slot="{ error, formState }"
  >
    <transition name="slide-fade">
      <p class="form-error" v-if="error">
        {{ error }}
      </p>
    </transition>

    <div v-if="step === 1" class="form-step">
      <BaseInput
        v-model="form.email"
        :vuelidate="$v.form.email"
        label="Email"
        id="email"
      />
      <NavButton :onClick="next">Next</NavButton>
    </div>
    <div v-if="step === 2" class="form-step">
      <BaseInput
        v-model="form.firstName"
        :vuelidate="$v.form.firstName"
        label="First Name"
        id="firstname"
      />
      <BaseInput
        v-model="form.middleName"
        label="Middle Name"
        id="middlename"
      />
      <BaseInput
        v-model="form.lastName"
        :vuelidate="$v.form.lastName"
        label="Last Name"
        id="lastname"
      />
      <BaseInput
        v-model.number="form.age"
        type="number"
        :vuelidate="$v.form.age"
        label="Age"
        id="age"
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
      age: null,
    },
  }),

  validations: {
    form: {
      email: {
        required,
        email,
      },
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      age: {
        required,
        minValue: minValue(18),
      },
    },
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
        age: 0,
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
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  position: relative;
  padding: 3rem 2rem;
  overflow: hidden;
  border: 0.2rem solid var(--c-semi-white-3);
  border-radius: var(--br-2);
  box-shadow: 0.5rem 0.5rem 1.5rem 1px rgba(0, 0, 0, 0.1);
  label + * {
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

.form-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--c-red);
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateY(-13px);
  opacity: 0;
}
</style>
