<script setup>
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

const pimba = () => {
  document.querySelector(`#txt_consulta`)?.focus();
  console.log(document);
};

var controle = reactive({
  laboratorioId: "",
  Descricao: null,
  ativo: true,
  OrdemExibicao: "",
  DataAlteracao: null,
});

var txtLaborId = ref();

onMounted(() => {
  txtLaborId.value?.focus();
});

const confirmar = () => {
  controle.DataAlteracao = new Date().toLocaleDateString("pt-BR"); //estudar date em JS

  axios.post("http://localhost:3000/info", controle).then((r) => router.push("/index"));
  console.log(controle);
};
</script>

<template>
  <div>
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
                <input
                  v-model="controle.laboratorioId"
                  @keydown.enter="
                    () => {
                      // document.querySelector(`#txt_consulta`)?.focus()
                      console.log(document);
                    }
                  "
                  type="number"
                  min="1"
                  class="form-control form-control-sm"
                  ref="txtLaborId" />
              </div>
              <div class="col-md-6">
                <label>Descrição</label>
                <input
                  name="consulta"
                  id="txt_consulta"
                  v-model="controle.Descricao"
                  @keydown.13="pular2(controle.OrdemExibicao)"
                  placeholder="Nome ou código"
                  type="text"
                  maxlength="50"
                  required
                  class="form-control form-control-sm" />
              </div>
              <div class="col-md-3">
                <label>Ordem de exibição</label>

                <input
                  v-model="controle.OrdemExibicao"
                  @keydown.13="pular3(controle.Descricao)"
                  type="number"
                  min="1"
                  class="form-control form-control-sm" />
              </div>
              <div class="col-md-3">
                <label>Status</label>
                <select
                  class="form-select form-select-sm"
                  v-model="controle.ativo"
                  @keydown.13="pular4(controle.laboratorioId)">
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
  </div>
</template>
