<template>
  <BaseButton
    type="submit"
    :disabled="formState !== null"
    :class="formState"
    class="loading-button"
  >
    <slot></slot>
    <transition name="fade" mode="in-out">
      <span v-if="formState === 'loading'" class="state-layer">
        <svg
          width="25"
          height="25"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#333"
        >
          <g fill="none" fill-rule="evenodd">
            <g transform="translate(1 1)" stroke-width="2">
              <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      </span>
    </transition>
  </BaseButton>
</template>
<script>
import { FormStates } from "../../config.js";
import BaseButton from "./BaseButton.vue";

export default {
  components: {
    BaseButton
  },
  props: {
    state: {
      type: String,
      validator: value => Object.values(FormStates).includes(value)
    }
  },

  methods: {
    submit() {
      this.$emit("submit");
    }
  },

  data: () => ({
    formState: null
  }),

  // update button state if new form state set
  watch: {
    state(newState) {
      this.formState = newState;
      if (newState === "success") {
        this.formState = null;
        this.$emit("reset");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
button.loading-button {
  border: 1px solid rgba(216, 240, 245, 0.596);
  color: white;
  margin-top: 0;
  background-color: white;
  color: #50a3a2;

  &:hover {
    background-color: rgb(213, 108, 108);
    border-color: rgb(213, 108, 108);
    color: white;
  }

  .state-layer {
    background-color: rgb(213, 108, 108);
    pointer-events: none;
  }
  .state-layer,
  .loading-animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0.5em;
  }
}
</style>
