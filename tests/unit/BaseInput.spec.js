import { shallowMount } from "@vue/test-utils";
import BaseInput from "@/components/base-components/BaseInput.vue";

describe("BaseInput.vue", () => {
  it("renders a vue instance", () => {
    expect(shallowMount(BaseInput).isVueInstance()).toBeTruthy();
  });

  it("updates model with prop value", () => {
    const wrapper = shallowMount(BaseInput);
    expect(wrapper.vm.model).toBeNull();

    wrapper.setProps({ value: "test val" });
    expect(wrapper.vm.model).toBe("test val");
  });

  it("emits input changes", () => {
    const wrapper = shallowMount(BaseInput);
    wrapper.find("input").setValue("test val");
    expect(wrapper.emitted("input")[0]).toEqual(["test val"]);
  });
});
