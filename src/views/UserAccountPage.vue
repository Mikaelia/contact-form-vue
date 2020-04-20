<template>
  <div class="user-account-page">
    <div v-if="user.firstName">
      <h1>Welcome {{ username }}</h1>
      <p>
        You are <span>{{ user.age }}</span> years old. Congrats!
      </p>
      <p>
        Your email on file is: <span>{{ user.email }}</span>
      </p>
    </div>
    <NavButton :onClick="returnHome">Back to form</NavButton>
  </div>
</template>

<script>
import { db } from "../firebase";
import NavButton from "../components/NavButton";

export default {
  components: {
    NavButton,
  },
  data: () => ({
    user: null,
  }),

  firestore() {
    return {
      user: db.collection("users").doc(this.$route.params.id),
    };
  },

  computed: {
    username: function() {
      return `${this.user.firstName} ${this.user.middleName} ${this.user.lastName}`;
    },
  },

  methods: {
    returnHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.user-account-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 3rem;
  background: linear-gradient(
    to bottom right,
    var(--c-blue) 0%,
    var(--c-green) 100%
  );
  color: var(--c-black);

  div {
    width: 80vw;
    max-width: 80rem;
    margin-bottom: 2rem;
    padding: 5rem;
    border: 2px solid var(--c-semi-white-3);
    border-radius: var(--br-1);
    background: var(--c-semi-white-2);
  }

  p {
    font-size: var(--f-med);
  }

  h1 {
    font-size: var(--f-large);
    font-weight: 400;
  }

  span {
    font-weight: 600;
  }
}
</style>
