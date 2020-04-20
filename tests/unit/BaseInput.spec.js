import { shallowMount } from "@vue/test-utils";
import BaseInput from "@/components/base-components/BaseInput.vue";

describe("BaseInput.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallowMount(BaseInput);
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("updates model with prop value", () => {
    expect(wrapper.vm.model).toBeNull();

    wrapper.setProps({ value: "test val" });
    expect(wrapper.vm.model).toBe("test val");
  });

  it("emits input changes", () => {
    wrapper.find("input").setValue("test val");
    expect(wrapper.emitted("input")[0]).toEqual(["test val"]);
  });

  it("generates error messages based on validation errors", () => {
    wrapper.setProps({
      vuelidate: { required: false, $params: { required: "required" } },
    });
    expect(wrapper.vm.genErrorMessages).toEqual(["Required."]);
  });
});
