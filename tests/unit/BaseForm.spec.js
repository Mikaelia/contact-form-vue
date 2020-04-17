import { shallowMount } from "@vue/test-utils";
import BaseForm from "@/components/base-components/BaseForm.vue";

describe("BaseForm.vue", () => {
  it("renders a vue instance", () => {
    expect(shallowMount(BaseForm).isVueInstance()).toBeTruthy();
  });

  // make sure that validator works to prevent errored fields submitted
});
