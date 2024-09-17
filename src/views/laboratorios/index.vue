<script setup>
import {onMounted, reactive, watch, ref} from "vue";
import {RouterLink} from "vue-router";
import {pesquisar, excluir} from "../../services/distrib/LaboratoriosService";

var controle = reactive({
  pesquisa: "",
  ativos: null,
  erro: "",
  dados: [],
});

var txt_consulta = ref();

onMounted(() => {
  txt_consulta.value?.focus();
  buscar();
});

watch([() => controle.pesquisa, () => controle.ativos], async () => {
  await buscar();
  // filtrar(novo, ativos);
});

async function buscar() {
  console.log("pesquisando...");
  pesquisar({Descricao: controle.pesquisa, ativo: controle.ativos})
    .then((r) => {
      controle.dados = r;
    })
    .catch((erro) => {
      controle.erro = erro;
    });
}

const deletar = (id) => {
  excluir(id)
    .then((r) => {
      buscar();
    })
    .catch((erro) => {
      controle.erro = erro;
    });
};
</script>

<template>
  <div class="card">
    <div class="card-header">
      <div class="row">
        <div class="col-md-6">
          <h4 class="card-title m-1">Laboratorios</h4>
        </div>
        <div class="col-md-6">
          <RouterLink class="float-end" :to="'/'"><i class="fa fa-times"></i></RouterLink>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="row align-items-end">
        <div class="col-md-3">
          <label>Pesquisar</label>
          <input
            name="consulta"
            id="txt_consulta"
            placeholder="Nome ou código"
            v-model="controle.pesquisa"
            type="search"
            class="form-control form-control-sm"
            ref="txt_consulta"
            @keyup="buscar()" />
        </div>

        <div class="col-md-3">
          <label>Status</label>

          <select
            v-model="controle.ativos"
            class="form-select form-select-sm"
            aria-label="Default select example"
            @change="buscar()">
            <option :value="null">- Todos -</option>
            <option :value="true">Ativos</option>
            <option :value="false">Inativos</option>
          </select>
        </div>

        <div class="col-md-6">
          <button type="button" class="btn btn btn-primary btn-sm">
            <RouterLink class="nav-link active" to="/laboratorios/adicionar">Adicionar</RouterLink>
          </button>
        </div>
      </div>
      <div class="row" v-if="controle.erro != ''">
        <div class="col-md-12 text-danger fw-bold">
          {{ controle.erro }}
        </div>
      </div>
      <div class="row">
        <div class="mt-4 col-md-12">
          <table id="tabela" class="table table-striped table-bordered table-sm">
            <thead>
              <tr class="table-primary">
                <th scope="col" class="text-end col-2">Id</th>
                <th scope="col" class="text-start col-2">Descrição</th>
                <th scope="col" class="text-center col-2">Ativos</th>
                <th scope="col" class="text-end col-2">Ordem de exibicao</th>
                <th scope="col" class="text-center col-2">Data de alteração</th>
                <th scope="col" class="text-center col-2">Opções</th>
              </tr>
            </thead>
            <tbody>
              <tr scope="row" v-for="(item, idx) in controle.dados" :key="idx">
                <td class="text-end">{{ item.laboratorioId }}</td>
                <td class="text-start">{{ item.Descricao }}</td>
                <td class="text-center">
                  {{ item.ativo ? "Ativo" : "Inativo" }}
                </td>
                <td class="text-end">{{ item.OrdemExibicao }}</td>
                <td class="text-center">{{ item.DataAlteracao }}</td>
                <td class="text-center">
                  <a class="btn btn-danger btn-sm me-1" @click="deletar(item.id)"><i class="fas fa-trash"></i></a>
                  <RouterLink class="btn btn-primary btn-sm" :to="`/laboratorios/alterar/${item.id}`">
                    <i class="fas fa-pen"></i>
                  </RouterLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
