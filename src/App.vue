<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: inherit;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
  text-align: center;
  color: white;
  box-sizing: border-box;
  height: 100vh;
}

#app {
  height: 100%;
}
</style>
