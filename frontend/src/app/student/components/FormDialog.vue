<template>
  <v-dialog
    :id="`modal-${key}`"
    v-model="dialog"
    persistent
    scrollable
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        ref="btnShow"
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Cadastrar Aluno
      </v-btn>
    </template>

    <validation-observer
      ref="form"
      tag="form"
      v-slot="{ handleSubmit, invalid }"
    >
      <v-card>
        <v-card-title>
          <span class="headline font-weight-medium">Cadastro de aluno</span>
        </v-card-title>

        <v-divider/>

        <v-card-text class="pb-0">
          <v-container class="px-0">
            <v-row>
              <v-col
                cols="12"
                class="pb-0"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="Nome"
                  rules="required|alpha_spaces|min:2|max:100"
                  vid="studentName"
                  slim
                >
                  <v-text-field
                    v-model="form.name"
                    label="Nome"
                    placeholder="Nome completo"
                    dense
                    outlined
                    :error-messages="errors"
                    required
                  />
                </validation-provider>
              </v-col>

              <v-col
                cols="12"
                class="pb-0"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="E-mail"
                  rules="required|email|max:60"
                  vid="studentEmail"
                  slim
                >
                  <v-text-field
                    v-model="form.email"
                    label="E-mail"
                    placeholder="Endereço de e-mail"
                    dense
                    outlined
                    :error-messages="errors"
                    required
                  />
                </validation-provider>
              </v-col>

              <v-col
                cols="12"
                md="6"
                class="pb-0"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="RA"
                  rules="required|numeric|min:6"
                  vid="studentRA"
                  slim
                >
                  <v-text-field
                    v-model="form.ra"
                    label="RA"
                    placeholder="Registro acadêmico"
                    v-mask="'######'"
                    dense
                    outlined
                    :error-messages="errors"
                    required
                    :disabled="!!Object.keys(studentData).length"
                  />
                </validation-provider>
              </v-col>

              <v-col
                cols="12"
                md="6"
                class="pb-0"
              >
                <validation-provider
                  v-slot="{ errors }"
                  name="CPF"
                  rules="required|cpf"
                  vid="studentCPF"
                  slim
                >
                  <v-text-field
                    v-model="form.cpf"
                    label="CPF"
                    placeholder="Número do documento"
                    v-mask="'###.###.###-##'"
                    dense
                    outlined
                    :error-messages="errors"
                    required
                    :disabled="!!Object.keys(studentData).length"
                  />
                </validation-provider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-spacer/>

          <v-btn
            outlined
            color="warning"
            @click="closeForm()"
          >
            Cancelar
          </v-btn>

          <v-btn
            v-if="!!Object.keys(studentData).length"
            color="primary"
            :disabled="invalid"
            @click="handleSubmit(updateStudent())"
          >
            Atualizar
          </v-btn>

          <v-btn
            v-else
            color="primary"
            :disabled="invalid"
            @click="handleSubmit(registerStudent())"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </validation-observer>
  </v-dialog>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue';
import removeFormatNumber from '@/support/common/filters/RemoveFormatNumber';
import { IStudent, TStudentCreate, TStudentUpdate } from '@/support/types';

type TForm = {
  name: string | null;
  email: string | null;
  ra: number | null;
  cpf: string | null;
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

  data: () => ({
    dialog: false as boolean,

    key: 0 as number,

    form: {
      name: null,
      email: null,
      ra: null,
      cpf: null,
    } as TForm,
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
      const payload = {
        ...this.form,
        ra: Number(this.form.ra),
        cpf: removeFormatNumber(this.form.cpf as string),
      } as TStudentCreate;

      this.$emit('register:data', payload);
    },

    updateStudent() {
      const payload = {
        name: this.form.name,
        email: this.form.email,
      } as TStudentUpdate;

      this.$emit('update:data', payload);
    },

    closeForm() {
      (this.$refs.form as any).reset();
      this.form = {
        name: null,
        email: null,
        ra: null,
        cpf: null,
      } as TForm;
      this.key += 1;
      this.dialog = !this.dialog;

      if (Object.keys(this.studentData).length) {
        this.$emit('update:clear', true);
      }
    },
  },
});

</script>
