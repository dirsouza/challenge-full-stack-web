<template>
  <v-data-table
    :headers="headers"
    :items="students"
    :loading="loading"
    hide-default-footer
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Consulta de alunos</v-toolbar-title>

        <v-divider
          inset
          vertical
          class="mx-4"
        />
        <v-spacer/>

        <Search
          class="pr-5"
          style="max-width: 500px"
          @input="searchStudent($event)"
        />

        <FormDialog
          :student-data="studentData"
          :close="closeForm"
          @update:clear="studentData = {}"
          @register:data="registerStudent($event)"
          @update:data="updateStudent($event)"
        />
      </v-toolbar>
    </template>

    <template #item.cpf="{ item }">
      {{ item.cpf | formatCpfOrCnpj }}
    </template>

    <template #item.actions="{ item }">
      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-icon
            color="indigo"
            class="mr-2"
            v-bind="attrs"
            v-on="on"
            @click="editStudent(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
        <span>Editar</span>
      </v-tooltip>

      <v-tooltip top>
        <template #activator="{ on, attrs }">
          <v-icon
            color="error"
            class="mr-2"
            v-bind="attrs"
            v-on="on"
            @click="deleteStudent(item.id)"
          >
            mdi-delete
          </v-icon>
        </template>
        <span>Excluir</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import mixins from 'vue-typed-mixins';
import { DataTableHeader } from 'vuetify';
import Search from '@/app/student/components/Search.vue';
import FormDialog from '@/app/student/components/FormDialog.vue';
import formatCpfOrCnpj from '@/support/common/filters/FormatCPFOrCNPJ';
import NotificationMixin from '@/support/common/mixins/NotificationMixin';
import { IStudent, TStudentCreate, TStudentUpdate } from '@/support/types';
import StudentService from '@/domains/StudentService';

export default mixins(NotificationMixin).extend({
  name: 'Table',

  components: {
    Search,
    FormDialog,
  },

  data: () => ({
    loading: false as boolean,

    closeForm: false as boolean,

    studentData: {} as IStudent,

    headers: [
      {
        text: 'Registro Acadêmico',
        value: 'ra',
        width: 165,
        sortable: true,
      },
      {
        text: 'Nome',
        value: 'name',
        sortable: true,
      },
      {
        text: 'CPF',
        value: 'cpf',
        width: 200,
        sortable: true,
      },
      {
        text: 'Ações',
        value: 'actions',
        align: 'center',
        width: 100,
        sortable: false,
      },
    ] as Array<DataTableHeader>,

    students: [] as Array<IStudent>,
  }),

  mounted() {
    this.getAllStudents();
  },

  filters: {
    formatCpfOrCnpj,
  },

  methods: {
    async getAllStudents() {
      const loader = this.$loading.show();

      try {
        this.loading = true;

        this.students = (await StudentService.findAll()).data;
      } catch (e) {
        this.toast({
          icon: 'error',
          text: 'Não foi possível encontrar os dados dos alunos',
        });
      } finally {
        this.loading = false;

        loader.hide();
      }
    },

    async searchStudent(term: string) {
      try {
        this.loading = true;

        this.students = (await StudentService.findAll(term)).data;
      } catch (e) {
        this.toast({
          icon: 'error',
          text: 'Não foi possível buscar os dados dos(as) alunos(as)',
        });
      } finally {
        this.loading = false;
      }
    },

    async registerStudent(student: TStudentCreate) {
      const loader = this.$loading.show();

      try {
        await StudentService.create(student);

        this.closeForm = true;

        this.toast({
          icon: 'success',
          text: 'Dados do(a) aluno(a) cadastrado com sucesso!',
        });

        await this.getAllStudents();
      } catch (e) {
        this.toast({
          icon: 'error',
          text: 'Não foi possível cadastrar os dados do(a) aluno(a)',
        });
      } finally {
        this.closeForm = false;

        loader.hide();
      }
    },

    editStudent(student: IStudent): void {
      this.studentData = { ...student };
    },

    async updateStudent(student: TStudentUpdate) {
      const loader = this.$loading.show();

      try {
        await StudentService.update(this.studentData.id, student);

        this.closeForm = true;

        this.toast({
          icon: 'success',
          text: 'Dados do(a) aluno(a) atualizado com sucesso!',
        });

        await this.getAllStudents();
      } catch (e) {
        this.toast({
          icon: 'error',
          text: 'Não foi possível atualizar os dados do(a) aluno(a)',
        });
      } finally {
        loader.hide();
      }
    },

    async deleteStudent(id: number) {
      const loader = this.$loading.show();

      try {
        this.confirmDelete({
          title: 'Excluir Aluno',
          text: 'Confirma a exlusão deste Aluno?',
        }).then(async ({ isConfirmed }) => {
          if (isConfirmed) {
            await StudentService.delete(id);

            this.toast({
              icon: 'success',
              text: 'Dados do(a) aluno(a) excluído com sucesso!',
            });

            await this.getAllStudents();
          }
        });
      } catch (e) {
        this.toast({
          icon: 'error',
          text: 'Não foi possível excluir os dados do(a) aluno(a)',
        });
      } finally {
        loader.hide();
      }
    },
  },
});
</script>
