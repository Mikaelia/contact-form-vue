<template>
  <div class="contact-form">
    <div class="form-header">
      <div class="header-main">
        <h1>Please share your contact info with us:</h1>
        <div class="header-image">
          <svg
            width="90"
            height="75"
            viewBox="0 0 90 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.561 26.5191C29.681 26.5191 35.453 20.7471 35.453 13.6271C35.453 6.50704 29.681 0.735107 22.561 0.735107C15.4409 0.735107 9.66901 6.50704 9.66901 13.6271C9.66901 20.7471 15.4409 26.5191 22.561 26.5191Z"
              fill="#D7D7D7"
            />
            <path
              d="M45.1219 45.8571C45.1219 45.8571 38.9982 32.9651 22.561 32.9651C6.12369 32.9651 0 45.8571 0 45.8571L0 52.3031H45.1219V45.8571Z"
              fill="#D7D7D7"
            />
            <path
              d="M67.439 48.4108C74.5591 48.4108 80.331 42.6389 80.331 35.5188C80.331 28.3988 74.5591 22.6268 67.439 22.6268C60.319 22.6268 54.5471 28.3988 54.5471 35.5188C54.5471 42.6389 60.319 48.4108 67.439 48.4108Z"
              fill="#C4C4C4"
            />
            <path
              d="M90 67.7488C90 67.7488 83.8763 54.8568 67.439 54.8568C51.0017 54.8568 44.8781 67.7488 44.8781 67.7488V74.1948H90V67.7488Z"
              fill="#C4C4C4"
            />
          </svg>
        </div>
      </div>
      <p v-if="step === 1">
        We'd like to get to know you better! We promise we'll never spam you.
      </p>
    </div>

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
          aria-required="true"
        />
        <NavButton :onClick="next" class="next-button">Next</NavButton>
      </div>
      <div v-if="step === 2" class="form-step">
        <div class="first-middle-wrapper">
          <BaseInput
            v-model="form.firstName"
            :vuelidate="$v.form.firstName"
            label="First Name"
            id="firstname"
            aria-required="true"
          />
          <BaseInput
            v-model="form.middleName"
            label="Middle Name"
            id="middlename"
          />
        </div>
        <div class="last-age-wrapper">
          <BaseInput
            v-model="form.lastName"
            :vuelidate="$v.form.lastName"
            label="Last Name"
            id="lastname"
            aria-required="true"
          />
          <BaseInput
            v-model.number="form.age"
            type="number"
            :vuelidate="$v.form.age"
            label="Age"
            id="age"
            :customErrorMessages="{
              minValue: '18 Minimum',
              maxValue: 'Too high',
              integer: 'Whole numbers',
            }"
            max="110"
            aria-required="true"
          />
        </div>
        <div class="button-wrapper">
          <NavButton :onClick="prev" fullWidth>Previous</NavButton>
          <LoadingButton
            :state="formState"
            fullWidth
            data-test="contact-form-submit"
          >
            Submit
          </LoadingButton>
        </div>
      </div>
    </BaseForm>
  </div>
</template>

<script>
import { db } from "../firebase";
import { v4 } from "uuid";
import {
  required,
  email,
  minValue,
  maxValue,
  integer,
} from "vuelidate/lib/validators";

import BaseInput from "./base-components/BaseInput.vue";
import BaseForm from "./base-components/BaseForm.vue";
import LoadingButton from "./LoadingButton";
import NavButton from "./NavButton.vue";

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
        integer,
        maxValue: maxValue(110),
        minValue: minValue(18),
      },
    },
  },

  methods: {
    prev() {
      this.step--;
      // shift focus to correct element
      this.$nextTick(() => document.querySelector("#email").focus());
    },

    next() {
      this.step++;
      this.$nextTick(() => document.querySelector("#firstname").focus());
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

    async submitContact() {
      const userId = v4();
      const data = this.form;
      // eslint-disable-next-line
      let err, res;

      // send to firebase
      try {
        await db
          .collection("users")
          .doc(userId)
          .set(data);
      } catch (err) {
        return err;
      }

      this.resetForm();
      this.$router.push(`/user/${userId}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";

.contact-form {
  width: 100%;
  padding: 3rem 2rem;
  border-radius: var(--br-3);
  background: white;

  @media (min-width: $bp-medium) {
    padding: 6rem 4rem;
    box-shadow: var(--shadow-1);
  }
}

.header-image {
  display: flex;
  align-items: flex-end;
  width: 0;
  height: 0;

  @media (min-width: $bp-medium) {
    width: 30%;
    height: 100%;
    margin: 0 2rem 1.5rem 4rem;
  }
}

.header-main {
  display: flex;
  & h1 {
    color: var(--c-green-4);
    font-size: var(--f-large);
    font-weight: var(--fw-bold);
    line-height: var(--lh-large);
  }
}

form {
  overflow: hidden;

  * + .input-wrapper {
    margin-top: 4rem;
  }
}

.form-header {
  text-align: left;

  & p {
    width: 75%;
    margin-top: 2.5rem;
    margin-bottom: 5.5rem;
    color: var(--c-grey);
    font-size: var(--f-med);
    font-weight: var(--fw-light);
    letter-spacing: var(--spacing-sm);
    line-height: var(--lh-med);
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
  width: 100%;
  margin-left: auto;

  & > * + * {
    margin-left: 2rem;
  }

  @media (min-width: $bp-medium) {
    width: 70%;
  }
}

button {
  margin-top: 6rem;
}

.next-button {
  width: 37%;
  margin-left: auto;
}

.form-error {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: var(--c-red);
  color: white;
}

.first-middle-wrapper,
.last-age-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin-top: 4rem;

  @media (min-width: $bp-medium) {
    flex-direction: row;
    margin-top: 0;

    & > div:first-child {
      margin-top: 0;
      margin-right: 4rem;
    }
  }
}

.first-middle-wrapper {
  @media (min-width: $bp-medium) {
    margin-top: 3rem;
  }
}
.last-age-wrapper {
  align-items: flex-start;
  & > div:last-child {
    width: 20rem;
  }

  @media (min-width: $bp-medium) {
    align-items: flex-end;
    margin-bottom: 3rem;
  }
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
