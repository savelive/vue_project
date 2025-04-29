<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>-->

    <router-link to="/about" active-class="active">
      <button @click="change_text">{{but_text}}</button>
    </router-link>

    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      but_text: "去放烟花"
    };
  },
  methods: {
    change_text() {
      this.but_text = "新年快乐！";
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

button {
  border-radius: 20%;
  width: 90px;
  height: 50px;
  background-color: brown;
  color: antiquewhite;
  font-size: 11pt;
}
a {
  color: antiquewhite;
  text-decoration: none;
}
.active {
  color: antiquewhite;
  text-decoration: none;
}
</style>
