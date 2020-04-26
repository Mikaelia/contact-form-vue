<template>
  <div class="user-account-page">
    <div class="user-account-info">
      <div class="title">
        <h1>Thanks for signing up!</h1>
      </div>
      <div class="plane">
        <div class="plane-image"></div>
      </div>

      <div v-if="user.firstName" class="user-information">
        <div class="user-photo">
          <div class="user-icon"></div>
        </div>
        <div class="user-details">
          <p><span>Name: </span>{{ username }}</p>
          <p><span>Age: </span>{{ user.age }}</p>
          <p><span>Email: </span>{{ user.email }}</p>
        </div>
      </div>
      <div v-else class="loading"><p>Loading...</p></div>
    </div>
    <NavButton :onClick="returnHome" class="home-button"
      >Back to form</NavButton
    >
  </div>
</template>

<script>
import { db } from "../firebase";
import NavButton from "../components/NavButton";

export default {
  components: {
    NavButton
  },
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
  },

  mounted: () => {
    document.querySelector(".home-button").focus();
  },

  methods: {
    returnHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.plane-image {
  /* position: absolute; */
  bottom: 0;
  width: 20rem;
  height: 13rem;
  background: url(../assets/Paper_Plane_Vector.svg) no-repeat;
  background-size: contain;
}

.user-account-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 3rem;
  background: linear-gradient(
    to bottom right,
    var(--c-green-3) 0%,
    var(--c-green-2) 100%
  );
  color: var(--c-black);

  .user-account-info {
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 90rem;
    /* min-height: 50rem; */
    margin-bottom: 2rem;
    border: 2px solid var(--c-semi-white-3);
    border-radius: 0.5rem;
    /* background: rgba(25, 41, 33, 0.084); */
    box-shadow: 1px 4px 7px 3px rgba(0, 0, 0, 0.1);
  }

  p {
    font-size: var(--f-med);
    color: #252526;
  }

  h1 {
    font-size: var(--f-large);
    font-weight: 300;
  }

  span {
    font-weight: 600;
  }
}

.title {
  width: 100%;
  padding: 2rem;
  border-bottom: 2px solid var(--c-semi-white-3);
  background: rgba(25, 41, 33, 0.152);
  color: white;
}

.user-information {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 10rem;
  border-radius: 0.25rem;
  background: var(--c-semi-white-1);
  border-top: 2px solid var(--c-semi-white-3);

  & .user-photo {
    display: flex;
    position: relative;
    z-index: 1;
    align-items: center;
    justify-content: center;
    width: 10rem;
    background: #49bd8f;

    &:before {
      content: "";
      position: absolute;
      z-index: -1;
      right: 0;
      left: 0;
      width: 90%;
      height: 90%;
      margin-right: auto;
      margin-left: auto;
      border-radius: 50rem;
      background: #7ed8b5;
    }

    & .user-icon {
      width: 5rem;
      height: 5rem;
      background: url("../assets/add.svg") no-repeat center;
      background-size: cover;
    }
  }
  & .user-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 2rem;
  }
}
</style>
