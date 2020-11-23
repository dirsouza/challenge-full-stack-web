import Vue, { PropOptions } from 'vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import removeFormatNumber from '@/support/common/filters/RemoveFormatNumber';
import { IStudent, TStudentCreate, TStudentUpdate } from '@/support/types';

type TForm = {
  name: string;
  email: string;
  ra: number;
  cpf: string;
}

export default Vue.extend({
  name: 'FormDialog',

  props: {
    close: {
      type: Boolean as () => boolean,
      required: false,
    } as PropOptions,

    studentData: {
      type: Object as () => IStudent,
      required: false,
    } as PropOptions,
  },

  components: {
    ValidationObserver,
    ValidationProvider,
  },

  data: () => ({
    dialog: false as boolean,

    key: 0 as number,

    form: {} as TForm,
  }),

  watch: {
    close(value: boolean) {
      if (value) {
        this.closeForm();
      }
    },

    studentData(student: IStudent) {
      if (Object.keys(student).length) {
        this.form = student;
        this.key += 1;
        this.dialog = true;
      }
    },
  },

  methods: {
    registerStudent() {
      const payload: TStudentCreate = {
        ...this.form,
        ra: Number(this.form.ra),
        cpf: removeFormatNumber(this.form.cpf),
      };

      this.$emit('register:data', payload);
    },

    updateStudent() {
      const payload: TStudentUpdate = {
        name: this.form.name,
        email: this.form.email,
      };

      this.$emit('update:data', payload);
    },

    closeForm() {
      (this.$refs.form as any).reset();
      this.form = {} as TForm;
      this.key += 1;
      this.dialog = !this.dialog;

      if (Object.keys(this.studentData).length) {
        this.$emit('update:clear', true);
      }
    },
  },
});
