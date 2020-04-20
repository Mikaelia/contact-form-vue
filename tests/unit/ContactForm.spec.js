import Vuelidate from "vuelidate";
import { mount, createLocalVue } from "@vue/test-utils";
import ContactForm from "@/components/ContactForm.vue";

const localVue = createLocalVue();
localVue.use(Vuelidate);

describe("ContactForm.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ContactForm, {
      localVue,
    });
  });

  afterEach(() => {
    wrapper.destroy();
  });

  it("renders a vue instance", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("stores updated input data", () => {
    expect(wrapper.vm.form).toEqual({
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      age: null,
    });

    const input = wrapper.find('input[id="email"]');

    input.element.value = "Test@gmail.com";
    input.trigger("input");

    expect(wrapper.vm.form.email).toBe("Test@gmail.com");
  });

  it("displays correct inputs for each form step", async () => {
    const emailInput = 'input[id="email"]';
    const firstNameInput = 'input[id="firstname"]';

    expect(wrapper.find(emailInput).exists()).toBe(true);
    expect(wrapper.find(firstNameInput).exists()).toBe(false);

    wrapper.vm.next();
    await wrapper.vm.$nextTick();

    expect(wrapper.find(emailInput).exists()).toBe(false);
    expect(wrapper.find(firstNameInput).exists()).toBe(true);

    wrapper.vm.prev();
    await wrapper.vm.$nextTick();

    expect(wrapper.find(emailInput).exists()).toBe(true);
    expect(wrapper.find(firstNameInput).exists()).toBe(false);
  });

  it("resets form values", () => {
    wrapper.setData({ form: { email: "test" } });
    expect(wrapper.vm.form.email).toBe("test");

    wrapper.vm.resetForm();
    expect(wrapper.vm.form.email).toBe("");
  });
});
