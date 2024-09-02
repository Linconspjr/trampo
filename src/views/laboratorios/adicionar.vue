<script setup>
import axios from "axios";
import {onMounted, reactive, ref} from "vue";

var controle = reactive({
  laboratorioId: "",
  Descricao: null,
  ativo: true,
  OrdemExibicao: "",
  DataAlteracao: null,
});

var txtLaborId = ref();

onMounted(()=>{
  txtLaborId.value?.focus();
})

const confirmar = () => {

  controle.DataAlteracao = new Date();

  axios.post("http://localhost:3000/info", controle);
  // .then((r) => console.log(r));
  console.log(controle);
};
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-9 col-12">
      <div class="card">
        <div class="card-header">
          <h5 class="card-title">Adicionar Laboratorios</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-3 mb-2">
              <label>Id</label>
              <input v-model="controle.laboratorioId" type="number" min="1" class="form-control form-control-sm" ref="txtLaborId"/>
            </div>
            <div class="col-md-6">
              <label>Descrição</label>
              <input
                name="consulta"
                id="txt_consulta"
                v-model="controle.Descricao"
                placeholder="Nome ou código"
                type="text"
                maxlength="50"
                required
                class="form-control form-control-sm" />
            </div>
            <div class="col-md-3">
              <label>Ordem de exibição</label>

              <input v-model="controle.OrdemExibicao" type="number" min="1" class="form-control form-control-sm" />
            </div>
            <div class="col-md-3">
              <label>Status</label>
              <select class="form-select form-select-sm" v-model="controle.ativo">
                <option :value="true">Ativo</option>
                <option :value="false">Inativo</option>
              </select>
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-md-6 col-6">
              <button @click="confirmar" value="submit" class="btn btn btn-primary btn-sm">Confirmar</button>
              
            </div>

            <div class="col-md-6 col-6">
              <RouterLink class="btn btn-sm btn-secondary float-end" to="/index"> Fechar </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
