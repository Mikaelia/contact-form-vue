<template>
  <div class="contact-page">
    <div class="contact-form">
      <h1>Contact Information</h1>
      <ContactForm />
    </div>
  </div>
</template>

<script>
import ContactForm from "../components/ContactForm";

export default {
  components: { ContactForm }
};
</script>
<style lang="scss" scoped>
.contact-page {
  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  height: 100%;
  padding: 2rem;
}

.contact-form {
  width: 80vw;
  max-width: 50rem;

  h1 {
    font-weight: 300;
    font-size: 3rem;
    margin-bottom: 3rem;
  }
}
</style>
