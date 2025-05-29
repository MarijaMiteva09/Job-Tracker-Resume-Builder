<template>
  <div>
    <nav>
      <router-link to="/">Job List</router-link> |
      <router-link to="/add">Add Job</router-link>
    </nav>
    <hr />
    <router-view />
  </div>
</template>

<style>
nav {
  padding: 1rem;
  background-color: #f0f0f0;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
  font-weight: bold;
}
nav a.router-link-exact-active {
  color: #35495e;
  text-decoration: underline;
}
</style>
