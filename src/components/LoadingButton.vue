<template>
  <BaseButton
    class="loading-button"
    :class="state"
    type="submit"
    v-bind="$attrs"
    :disabled="state !== null"
  >
    <slot></slot>
    <transition name="fade" mode="in-out">
      <span v-if="state === 'loading'" class="state-layer">
        <svg
          width="25"
          height="25"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          stroke="white"
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
import { FormStates } from "../config.js";
import BaseButton from "./base-components/BaseButton.vue";

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

  // update button state if new form state set
  watch: {
    state(newState) {
      this.state = newState;
      if (newState === "success") {
        this.state = null;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
button {
  position: relative;
  margin-top: 0;
  overflow: hidden;
  transition: all 0.2s ease;
  border: 1px solid var(--c-green-4);
  background-color: var(--c-green-4);
  color: white;

  &.loading {
    border: 1px solid var(--c-pink);
  }

  .state-layer {
    background-color: var(--c-pink);
    pointer-events: none;
  }

  .state-layer,
  .loading-animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0.5em;
  }

  &:hover,
  &:focus {
    border-color: var(--c-pink);
    outline: none;
    background-color: var(--c-pink);
    color: white;
  }
}
</style>
