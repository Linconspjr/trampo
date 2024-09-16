<script setup>
import {adicionar}  from "@/services/distrib/LaboratoriosService"
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";





function getRandomInt(min, max) {
  min = Math.ceil(10);
  max = Math.floor(400);
  return Math.floor(Math.random() * (max - min) + min);
}

const router = useRouter();

var controle = reactive({
  laboratorioId: "",
  Descricao: null,
  ativo: true,
  OrdemExibicao: "",
  DataAlteracao: null,
});

var descricao = ref();

onMounted(() => {
  
  descricao.value?.focus();
});

const confirmar = () => {
  controle.DataAlteracao = new Date().toLocaleDateString("pt-BR");
  controle.laboratorioId = getRandomInt()
  adicionar(controle).then((r) => router.push("/laboratorios"));
  console.log(controle);
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
  <div>
    <div class="row justify-content-center">
      <div class="col-md-9 col-12">
        <div class="card">
          <div class="card-header">
            <div class="row">
              <div class="col-md-6">
                <h5 class="card-title">Laboratorios - Adicionar</h5>
              </div>
              <div class="col-md-6">
                <RouterLink class="float-end" :to="'/laboratorios'"><i class="fa fa-times"></i></RouterLink>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <label>Descrição</label>
                <input
                  name="consulta"
                  id="txt_consulta"
                  v-model="controle.Descricao"
                  @keydown.enter.esc="trataTecla"
                  placeholder="Nome ou código"
                  type="text"
                  maxlength="50"
                  ref="descricao"
                  required
                  class="form-control form-control-sm" />
              </div>
              <div class="col-md-3">
                <label>Ordem de exibição</label>

                <input
                  v-model="controle.OrdemExibicao"
                  @keydown.enter.esc="trataTecla"
                  id="txt_exibi"
                  type="number"
                  min="1"
                  class="form-control form-control-sm" />
              </div>
              <div class="col-md-3">
                <label>Status</label>
                <select class="form-select form-select-sm" id="Doido" @keydown.enter.esc="trataTecla">
                  <option :value="true">Ativo</option>
                  <option :value="false">Inativo</option>
                </select>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-6 col-6">
                <button
                  @click="confirmar"
                  value="submit"
                  @keydown.enter.esc="trataTecla"
                  class="btn btn btn-primary btn-sm">
                  Confirmar
                </button>
              </div>

              <div class="col-md-6 col-6">
                <RouterLink class="btn btn-sm btn-secondary float-end" to="/laboratorios"> Fechar </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>