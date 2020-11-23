import mixins from 'vue-typed-mixins';
import { DataTableHeader } from 'vuetify';
import Search from '@/app/student/components/search/Search.vue';
import FormDialog from '@/app/student/components/form-dialog/FormDialog.vue';
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
