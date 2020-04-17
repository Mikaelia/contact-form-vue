import { shallowMount } from "@vue/test-utils";
import LoadingButton from "@/components/base-components/LoadingButton.vue";

describe("LoadingButton.vue", () => {
  it("renders a vue instance", () => {
    expect(shallowMount(LoadingButton).isVueInstance()).toBeTruthy();
  });
});
