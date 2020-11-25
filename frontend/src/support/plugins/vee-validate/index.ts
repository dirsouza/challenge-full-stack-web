import Vue from 'vue';
import {
  extend, localize, ValidationObserver, ValidationProvider,
} from 'vee-validate';

import ptBR from 'vee-validate/dist/locale/pt_BR.json';
import * as rules from 'vee-validate/dist/rules';
import * as customRules from '@/support/plugins/vee-validate/rules';

localize('pt_BR', ptBR);

/* eslint-disable-next-line no-restricted-syntax */
for (const [rule, validation] of Object.entries(Object.assign(rules, customRules))) {
  extend(rule, {
    ...validation,
  });
}

Vue.component('validation-observer', ValidationObserver);
Vue.component('validation-provider', ValidationProvider);
