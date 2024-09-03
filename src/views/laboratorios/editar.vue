<script setup>
import axios from "axios";
import {reactive, watch} from "vue";
import {useRoute, useRouter} from "vue-router";

const router = useRouter();

var controle = reactive({
  dados:{laboratorioId: "", //criou novo objeto
  Descricao: null,
  ativo: "",
  OrdemExibicao: "",
  DataAlteracao: null,
  id: "",}
});



const route = useRoute();
watch(  () => route.params.id,  (novoId) => {console.log(novoId)
    axios.get(`http://localhost:3000/info/${novoId}`)
    .then((r) => {
      controle.dados = r.data;
      console.log(r);
    })
    .catch((r) => {
      console.error(r);
    });
},{deep:true,immediate:true}); // estudar



const editar = () => {
  axios.put(`http://localhost:3000/info/${controle.dados.id}`, controle.dados).then((r) => router.go(-1));
  //revisar anotações sobre axios API para melhor entendimento
  
};

</script>
<template>
  <div class="row justify-content-center">
    <div class="col-6">
      <div class="card">
        <div class="card-header">Editar Laboratorios</div>

        <div class="card-body">
          <div class="row">
            <div class="col-6">
              <label>Status</label>
              <select class="form-select" v-model="controle.dados.ativo" aria-label="Default select example">
                <option :value="true">Ativos</option>
                <option :value="false">Inativos</option>
              </select>
            </div>
            <div class="col-6">
              <label>LaboratorioId</label>
              <input
                name="consulta"
                id="txt_consulta"
                v-model="controle.dados.laboratorioId"
                placeholder="Nome ou código"
                type="text"
                class="form-control" />
            </div>
            <div class="col-6">
              <label>Descrição</label>
              <input
                name="consulta"
                id="txt_consulta"
                v-model="controle.dados.Descricao"
                placeholder="Nome ou código"
                type="text"
                class="form-control" />
            </div>
            <div class="col-6">
              <label>Ordem de exibição</label>

              <input
                name="consulta"
                id="txt_consulta"
                v-model="controle.dados.OrdemExibicao"
                placeholder="Nome ou código"
                type="text"
                class="form-control" />
            </div>
            <div class="col-6">
              <label>Data de Alteração</label>

              <input
                name="consulta"
                id="txt_consulta"
                v-model="controle.dados.DataAlteracao"
                placeholder="Nome ou código"
                type="date"
                class="form-control" />
            </div>
            <div class="col-md-3">
              <button @click="editar()" value="submit" class="btn btn btn-success mt-3">Confirmar</button>
              
            </div>

            <div class="col-md-3">
              <button type="button" class="btn btn btn-primary mt-3">
                <RouterLink class="nav-link active" to="/index">Voltar </RouterLink>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
