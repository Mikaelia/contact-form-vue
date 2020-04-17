import { shallowMount } from "@vue/test-utils";
import SignUpForm from "@/components/SignUpForm.vue";

describe("SignUpForm.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(SignUpForm);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  // make sure form data updates
});
