<script setup>
import axios from "axios";
import {reactive, watch, ref, onMounted} from "vue";
import {useRoute, useRouter} from "vue-router";
var descricao = ref()
onMounted(() => {
  descricao.value?.focus();
});

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

const trataTecla = (e = KeyboardEvent) => {
  if (e.key == "Enter" || e.keyCode == 27) {
    const inputs = Array.from(
      e.target.ownerDocument.querySelectorAll(
        "input:not([disabled]):not([readonly]),input:not(.form-control:disabled), select:not([disabled]):not([readonly]),button, #btnAvancar"
      )
    );
    console.log(e);
    console.log(inputs);
    const index = inputs.indexOf(e.target);

    if (e.keyCode == 13) {
      if (index < inputs.length - 1) {
        var el = inputs[index + 1];
        el.focus();
        if (el.tagName == "INPUT") el.select();
        e.preventDefault();
        e.stopPropagation();
      }
    } else if (e.keyCode == 27) {
      if (index > 0) {
        var el2 = inputs[index - 1];

        el2.focus();
        el2.select();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }
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
                name="consulta"
                id="txt_consulta"
                @keydown.enter.esc="trataTecla"
                v-model="controle.dados.laboratorioId"
                placeholder="Nome ou código"
                type="text"
                :disabled="true"
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
              ref="descricao"
              class="form-control"
              @keydown.enter.esc="trataTecla"
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
                class="form-control"
                @keydown.enter.esc="trataTecla" />
            </div>
            <div class="col-md-3">
              <label>Status</label>

              <select
                class="form-select"
                v-model="controle.dados.ativo"
                @keydown.enter.esc="trataTecla"
                aria-label="Default select example">
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
                class="form-control"
                @keydown.enter.esc="trataTecla" />
            </div>
          </div>
        </div>
        <div class="card-footer">
          <div class="row">
            <div class="col-md-6 col-6">
              <button @click="editar()" value="submit" @keydown.enter.esc="trataTecla" class="btn btn-primary btn-sm">
                Confirmar
              </button>
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
