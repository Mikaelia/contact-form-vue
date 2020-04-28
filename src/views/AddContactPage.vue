<template>
  <div class="contact-page">
    <div class="contact-form-wrapper">
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
@import "../assets/variables.scss";
.contact-page {
  position: relative;
  height: 100%;
  padding: 2rem;
  background: white;

  @media (min-width: $bp-medium) {
    background: linear-gradient(
      to bottom right,
      var(--c-green-3) 0%,
      var(--c-green-2) 100%
    );
  }
}

.contact-form-wrapper {
  position: absolute;
  top: 0;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
}

@media (min-width: $bp-medium) {
  .contact-form-wrapper {
    top: 15%;
    width: 70rem;
  }
}
</style>
