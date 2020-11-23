import Vue from 'vue';
import { SweetAlertOptions } from 'sweetalert2';

const defaultOptions: SweetAlertOptions = {
  showCancelButton: true,
  focusCancel: true,
  reverseButtons: true,
  confirmButtonText: 'Confirmar',
  confirmButtonColor: '#ff5252',
  cancelButtonText: 'Cancelar',
  cancelButtonColor: '#fb8c00',
  showCloseButton: false,
  width: 422,
};

const toastOptions = {
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
} as SweetAlertOptions;

export default Vue.extend({
  methods: {
    toast(options: SweetAlertOptions) {
      this.$swal({
        ...toastOptions,
        ...options,
      } as SweetAlertOptions);
    },

    confirmDelete(options: SweetAlertOptions) {
      return this.$swal({
        ...defaultOptions,
        ...options,
      } as SweetAlertOptions);
    },
  },
});
