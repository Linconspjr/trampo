<script setup>
import { RouterLink, RouterView } from "vue-router";


</script>

<template>
  <nav
    class="navbar navbar-dark bg-secondary navbar-expand-lg navbar relative-top"
  >
    
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        CONSULTA

      </button>
      <ul class="dropdown-menu dropdown-menu-dark">
        <RouterLink class="dropdown-item" to="/index">laboratorios</RouterLink>
       
      </ul>
    </div>
  </nav>

<div class="container-fluid mt-4">
  <RouterView />
  </div>
</template>
<style>
routerlink {
  text-align: left;
  font-weight: bolder;
}
</style>
