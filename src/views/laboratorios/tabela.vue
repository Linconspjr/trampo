<script setup>

import { onMounted, reactive } from "vue";
import { RouterLink } from "vue-router";
import axios from "axios";

var controle = reactive({ local: [] });

const props = defineProps(["dados"]);

onMounted(() => {
  axios
    .get("http://localhost:3000/info")
    .then((r) => {
      controle.local = r.data;
      console.log(r);
    })
    .catch((r) => {
      console.error(r);
    });
});

const excluir = (id) => {
  axios.delete(`http://localhost:3000/info/${id}`).then((r) => console.log(r));
};

</script>
<template>
  <!-- <pre>{{ props }}</pre> -->

  <table
    id="tabela"
    class="table table-striped table-hover table-bordered table-sm"  >
    <thead>
      <tr class="table-primary">
        <th scope="col">LaboratorioId</th>
        <th scope="col">Descriçao</th>
        <th scope="col">ativo</th>
        <th scope="col">OrdemExibicao</th>
        <th scope="col">DataAlteração</th>
        <th scope="col"  class="text-center">Opções</th>
      </tr>
    </thead>
    <tbody>
      <tr scope="row" v-for="(item, idx) in props.dados" :key="idx">
        <td>{{ item.laboratorioId }}</td>
        <td>{{ item.Descricao }}</td>
        <td>{{ item.ativo ? "Ativo" : "Inativo" }}</td>
        <td>{{ item.OrdemExibicao }}</td>
        <td>{{ item.DataAlteracao }}</td>
        <td class="text-center">
         
          <a class="btn btn-danger btn-sm me-1" @click="excluir(item.id)"><i class="fas fa-trash"></i></a>

          <RouterLink class="btn btn-primary btn-sm" to="/editar"> 
            <i class="fas fa-pen"></i>
          </RouterLink>
       
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style>
tr {
  line-height: 25px;
}
.container {
  height: 100%;
}
table {
  height: 100%;
}
</style>
