import { shallowMount } from "@vue/test-utils";
import BaseButton from "@/components/base-components/BaseButton.vue";

describe("BaseButton.vue", () => {
  it("renders a vue instance", () => {
    expect(shallowMount(BaseButton).isVueInstance()).toBeTruthy();
  });

  it("executes click prop on click", () => {
    const wrapper = shallowMount(BaseButton, {
      propsData: {
        onClick: function() {
          wrapper.vm.$emit("test");
        },
      },
    });

    wrapper.trigger("click");
    expect(wrapper.emitted("test")).toHaveLength(1);
  });
});
