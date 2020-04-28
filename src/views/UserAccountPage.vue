<template>
  <div class="user-account-page">
    <div class="title-block">
      <h1>Thanks for signing up!</h1>
      <div class="background-img-1">
        <svg
          viewBox="0 0 233 245"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M116.012 111.585C152.624 111.585 182.304 81.9049 182.304 45.2925C182.304 8.68018 152.624 -21 116.012 -21C79.3994 -21 49.7192 8.68018 49.7192 45.2925C49.7192 81.9049 79.3994 111.585 116.012 111.585Z"
            fill="rgba(0,0,0,.1)"
          />
          <path
            d="M232.024 211.024C232.024 211.024 200.535 144.731 116.012 144.731C31.489 144.731 0 211.024 0 211.024L0 244.17H232.024V211.024Z"
            fill="rgba(0,0,0,.1)"
          />
        </svg>
      </div>
      <div class="background-img-2">
        <svg
          viewBox="0 0 233 266"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M116.782 133.156C153.394 133.156 183.074 103.476 183.074 66.8633C183.074 30.2509 153.394 0.57074 116.782 0.57074C80.1692 0.57074 50.489 30.2509 50.489 66.8633C50.489 103.476 80.1692 133.156 116.782 133.156Z"
            fill="rgba(0,0,0,.2)"
          />
          <path
            d="M232.794 232.595C232.794 232.595 201.305 166.302 116.782 166.302C32.2586 166.302 0.769653 232.595 0.769653 232.595L0.769653 265.741H232.794V232.595Z"
            fill="rgba(0,0,0,.2)"
          />
        </svg>
      </div>
    </div>
    <div class="user-account-info">
      <div class="user-image">
        <svg
          viewBox="0 0 220 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="100%" height="100%" rx="9" fill="#F1F1F1" />
          <circle cx="109.5" cy="98.5" r="78.5" fill="#C4C4C4" />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M68 135V128C68 121 74.9167 100 109.5 100C144.083 100 151 121 151 128V135H68ZM109.5 93C115.003 93 120.281 90.7875 124.172 86.8492C128.064 82.911 130.25 77.5695 130.25 72C130.25 66.4305 128.064 61.089 124.172 57.1508C120.281 53.2125 115.003 51 109.5 51C103.997 51 98.7189 53.2125 94.8275 57.1508C90.9362 61.089 88.75 66.4305 88.75 72C88.75 77.5695 90.9362 82.911 94.8275 86.8492C98.7189 90.7875 103.997 93 109.5 93Z"
            fill="white"
          />
          <circle cx="169.5" cy="155.5" r="21.5" fill="#FFFCFC" />
          <path
            d="M169.5 138.3C178.982 138.3 186.7 146.019 186.7 155.5C186.7 164.982 178.982 172.7 169.5 172.7C160.019 172.7 152.3 164.982 152.3 155.5C152.3 146.019 160.019 138.3 169.5 138.3ZM169.5 134C157.626 134 148 143.626 148 155.5C148 167.374 157.626 177 169.5 177C181.374 177 191 167.374 191 155.5C191 143.626 181.374 134 169.5 134ZM180.25 153.35H171.65V144.75H167.35V153.35H158.75V157.65H167.35V166.25H171.65V157.65H180.25V153.35Z"
            fill="#4DC99C"
          />
        </svg>
      </div>
      <div v-if="user.firstName" class="user-information">
        <div class="user-name">
          <p>{{ username }}</p>
        </div>
        <div class="user-details">
          <p><span>Age </span>{{ user.age }}</p>
          <p><span>Email </span>{{ user.email }}</p>
        </div>
      </div>
      <div v-else class="loading"></div>
    </div>
    <NavButton v-if="user.firstName" :onClick="returnHome" class="home-button"
      >Back to form</NavButton
    >
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
      const firstName = this.capitalize(this.user.firstName);
      const lastName = this.capitalize(this.user.lastName);
      const middleName = this.capitalize(this.user.middleName);

      return `${firstName} ${middleName} ${lastName}`;
    },
  },

  methods: {
    capitalize(string) {
      return string && string[0].toUpperCase() + string.slice(1);
    },

    returnHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/variables.scss";

.user-account-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  background: white;

  @media (min-width: 500px) {
    display: block;
  }
}

.title-block {
  display: flex;
  position: relative;
  z-index: 0;
  align-items: center;
  justify-content: center;
  height: 250px;
  margin: auto;
  overflow: hidden;
  background: linear-gradient(
    to bottom right,
    var(--c-green-3) 0%,
    var(--c-green-2) 100%
  );
  color: white;

  @media (min-width: $bp-large) {
    justify-content: flex-start;
    padding-left: 12rem;
  }

  h1 {
    z-index: 1;
    font-size: 40px;
    line-height: 52px;

    @media (min-width: $bp-sm) {
      justify-content: flex-start;
      padding-left: 12rem;
    }
  }

  .background-img-1 {
    position: absolute;
    top: 0;
    right: 35rem;
    width: 203px;
    height: 215px;
  }
  .background-img-2 {
    position: absolute;
    right: 11rem;
    bottom: -3.5rem;
    width: 233px;
    height: 266px;
  }
}

.user-account-info {
  display: flex;
  position: relative;
  align-items: flex-start;
  justify-content: flex-start;

  @media (min-width: $bp-medium) {
    margin-top: 10rem;
    margin-left: 3rem;
  }

  @media (min-width: $bp-large) {
    margin-top: 12.6rem;
    margin-left: 12rem;
  }

  & .user-image {
    width: 0;
    height: 0;

    @media (min-width: $bp-medium) {
      min-width: 220px;
      height: 200px;
    }
  }

  & .user-information {
    position: relative;
    margin: 0 2rem;
    overflow: hidden;

    @media (min-width: $bp-medium) {
      margin-left: 7.5rem;
    }
  }

  & .user-name {
    margin-bottom: 4rem;
    color: var(--c-green-4);
    font-size: 70px;
    font-weight: 700;
    letter-spacing: var(--spacing-sm);
    line-height: 109px;
    text-align: center;
    overflow-wrap: break-word;

    @media (min-width: $bp-medium) {
      margin-bottom: 0;
      text-align: left;
    }
  }

  & .user-details {
    display: flex;
    flex-direction: column;
    text-align: left;

    @media (min-width: $bp-medium) {
      flex-direction: row;
    }

    & p {
      color: var(--c-black);
      font-size: var(--f-med);
      font-weight: 900;
      letter-spacing: var(--spacing-sm);
      line-height: 41px;
      word-break: break-word;
    }

    & p:not(:last-of-type) {
      margin-right: 8rem;
    }

    & span {
      display: block;
      font-size: var(--f-xsmall);
      font-weight: var(--fw-light);
      letter-spacing: var(--spacing-md);
      line-height: var(--lh-xsmall);
      text-transform: uppercase;
      word-break: keep-all;
    }
  }
}

.loading {
  position: absolute;
  top: 20%;
  right: 0;
  left: 0;
  width: 10rem;
  height: 10rem;
  margin: auto;
  background: url("../assets/loading.svg") no-repeat;
}

.home-button {
  align-self: center;
  justify-self: flex-start;
  margin-top: 3rem;

  @media (min-width: $bp-sm) {
    margin-top: 8rem;
    margin-bottom: 3rem;
    margin-left: 70%;
  }
}
</style>
