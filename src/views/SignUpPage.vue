<template>
  <div class="signup-page">
    <div class="signup-form">
      <h1>Contact Information</h1>
      <SignUpForm />
    </div>
  </div>
</template>

<script>
import SignUpForm from "../components/SignUpForm";

export default {
  components: { SignUpForm }
};
</script>
<style lang="scss" scoped>
.signup-page {
  display: flex;
  justify-content: center;
  background: linear-gradient(to bottom right, #50a3a2 0%, #53e3a6 100%);
  height: 100%;
  padding: 2rem;
}

.signup-form {
  width: 80vw;
  max-width: 50rem;

  h1 {
    font-weight: 300;
    font-size: 3rem;
    margin-bottom: 3rem;
  }
}
</style>
