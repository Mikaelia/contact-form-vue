import { shallowMount } from "@vue/test-utils";
import BaseLabel from "@/components/base-components/BaseLabel.vue";

describe("BaseLabel.vue", () => {
  const LABEL_TEXT = '[data-test="field-label-text"]';

  it("renders a vue instance", () => {
    const wrapper = shallowMount(BaseLabel);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("displays label if prop value passed", () => {
    const wrapper = shallowMount(BaseLabel, {
      propsData: {
        label: "Test Label",
      },
    });
    expect(wrapper.find(LABEL_TEXT).text()).toBe("Test Label");
  });
});
