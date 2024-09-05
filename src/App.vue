<script setup>
import { RouterLink, RouterView } from "vue-router";


</script>

<template>
  <nav style="background-color: rgb(50, 50,50 );"
    class="navbar navbar-dark bg-color navbar-expand-lg navbar relative-top"
  >
    
    <div class="dropdown">
      <button 
        class="btn btn-secondary dropdown-toggle ms-3"
        type="button"
        
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Cadastros

      </button>
      <ul class="dropdown-menu dropdown-menu-dark">
        <RouterLink class="dropdown-item" to="/laboratorios">Laboratórios</RouterLink>
       
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
