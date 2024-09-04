<script setup>
import axios from "axios";
import {reactive, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();

var controle = reactive({
  dados: {
    laboratorioId: "", //criou novo objeto
    Descricao: null,
    ativo: "",
    OrdemExibicao: "",
    DataAlteracao: "",
    id: "",
  },
});

const route = useRoute();
watch(
  () => route.params.id,
  (novoId) => {
    console.log(novoId);
    axios
      .get(`http://localhost:3000/info/${novoId}`)
      .then((r) => {
        controle.dados = r.data;
        console.log(r);
      })
      .catch((r) => {
        console.error(r);
      });
  },
  {deep: true, immediate: true}
); // estudar

const editar = () => {
  axios.put(`http://localhost:3000/info/${controle.dados.id}`, controle.dados).then((r) => router.go(-1));
  //revisar anotações sobre axios API para melhor entendimento
};



</script>
<template>
  <div class="row justify-content-center">
    <div class="col-md-9 col-12">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-md-6">
              <h5 class="card-title">Laboratorios - Editar</h5>
            </div>
            <div class="col-md-6">
              <RouterLink class="float-end" :to="'/laboratorios'"><i class="fa fa-times"></i></RouterLink>
            </div>
          </div>
        </div>

        <div class="card-body">
          <div class="row">
            <div class="col-md-3 mb-2">
              <label>LaboratorioId</label>
              <input
                autofocus
                name="consulta"
                id="txt_consulta"
                @keydown="trataTecla"
                v-model="controle.dados.laboratorioId"
                placeholder="Nome ou código"
                type="text"
                class="form-control" />
            </div>
            <div class="col-md-6">
              <label>Descrição</label>
              <input
                name="consulta"
                id="txt_consulta"
                v-model="controle.dados.Descricao"
                placeholder="Nome ou código"
                type="text"
                class="form-control" 
                @keydown="trataTecla"
                />
            </div>
            <div class="col-md-3">
              <label>Ordem de exibição</label>

              <input
                name="consulta"
                id="txt_consulta"
                v-model="controle.dados.OrdemExibicao"
                placeholder="Nome ou código"
                type="text"
                class="form-control" />
            </div>
            <div class="col-md-3">
              <label>Status</label>
              <select class="form-select" v-model="controle.dados.ativo" aria-label="Default select example">
                <option :value="true">Ativos</option>
                <option :value="false">Inativos</option>
              </select>
            </div>
            <div class="col-md-3">
              <label>Data de Alteração</label>

              <input
                name="consulta"
                id="txt_consulta"
                v-model="controle.dados.DataAlteracao"
                placeholder="Data"
                type="text"
                class="form-control" />
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-md-6 col-6">
              <button @click="editar()" value="submit" class="btn btn-primary btn-sm">Confirmar</button>
            </div>
            <div class="col-md-6 col-6">
              <RouterLink class="btn btn-sm btn-secondary float-end" to="/laboratorios">Fechar </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
