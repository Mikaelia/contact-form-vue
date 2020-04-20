import { shallowMount } from "@vue/test-utils";
import BaseForm from "@/components/base-components/BaseForm.vue";
import flushPromises from "flush-promises";

describe("BaseForm.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BaseForm, {
      propsData: {
        vuelidate: {
          $invalid: false,
          $touch: () => {
            console.log("touched");
          },
        },
        onSubmit: () => Promise.resolve("submitted"),
      },
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("toggles form state to loading, success, and null", async () => {
    wrapper.vm.submit();
    expect(wrapper.vm.error).toBe(null);
    expect(wrapper.vm.formState).toBe("loading");
    await flushPromises();
    expect(wrapper.vm.formState).toBe("success");
  });

  it("toggles form state to null on submit error", async () => {
    wrapper.setProps({
      onSubmit: () => Promise.reject("fail"),
    });
    wrapper.vm.submit();
    await flushPromises();
    expect(wrapper.vm.formState).toBe(null);
  });

  it("will not submit on validation failure", () => {
    wrapper.setProps({
      vuelidate: {
        $invalid: true,
        $touch: () => {
          console.log("touched");
        },
      },
    });

    wrapper.vm.submit();
    expect(wrapper.vm.formState).toBe(null);
  });
});
