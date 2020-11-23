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

<script lang="ts" src="./Table.ts"></script>
