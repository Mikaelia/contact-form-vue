<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import "./assets/variables.scss";
export default {};
</script>

<style lang="scss">
// resets
*,
*::after,
*::before {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

// set 1rem to 10px
html {
  font-size: 62.5%;
}

body {
  box-sizing: border-box;
  height: 100vh;
  font-family: var(--f-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#app {
  height: 100%;
}
</style>
