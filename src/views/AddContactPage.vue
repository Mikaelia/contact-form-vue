<template>
  <div class="contact-page">
    <div class="contact-form-wrapper">
      <h1>Contact Information</h1>
      <ContactForm />
    </div>
  </div>
</template>

<script>
import ContactForm from "../components/ContactForm";

export default {
  components: { ContactForm },
};
</script>

<style lang="scss" scoped>
.contact-page {
  display: flex;
  justify-content: center;
  height: 100%;
  padding: 2rem;
  background: linear-gradient(
    to bottom right,
    var(--c-blue) 0%,
    var(--c-green) 100%
  );
}

.contact-form-wrapper {
  width: 80vw;
  max-width: 50rem;
  margin-top: 4rem;

  h1 {
    margin-bottom: 4rem;
    font-size: var(--f-large);
    font-weight: 300;
  }
}
</style>
