<template>
  <div>
    <h1>Welcome {{ username }}</h1>
    <p>You are {{ user.age }} years old. Congrats!</p>
    <p>Your email on file is: {{ user.email }}</p>
  </div>
</template>
<script>
import { db } from "../firebase";

export default {
  data: () => ({
    user: null
  }),

  firestore() {
    return {
      user: db.collection("users").doc(this.$route.params.id)
    };
  },

  computed: {
    username: function() {
      return `${this.user.firstName} ${this.user.middleName} ${this.user.lastName}`;
    }
  }
};
</script>
