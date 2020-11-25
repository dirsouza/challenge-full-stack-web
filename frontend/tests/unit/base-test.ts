import Vue from 'vue';
import Vuetify from 'vuetify';
import VueSweetalert2 from 'vue-sweetalert2';
import { extend, ValidationObserver, ValidationProvider } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import * as customRules from '@/support/plugins/vee-validate/rules';
import Loading from 'vue-loading-overlay';
import VueTheMask, { mask } from 'vue-the-mask';
import { config as VueTestUtils, RouterLinkStub } from '@vue/test-utils';

for (const [rule, validation] of Object.entries(Object.assign(rules, customRules))) {
  extend(rule, {
    ...validation,
  });
}

VueTestUtils.mocks.$t = (key: string) => key;
VueTestUtils.mocks.$d = (key: string) => key;
VueTestUtils.mocks.$tc = (key: string) => key;

VueTestUtils.stubs.RouterLink = RouterLinkStub;

Vue.component('validation-observer', ValidationObserver);
Vue.component('validation-provider', ValidationProvider);

Vue.use(Loading);
Vue.use(VueSweetalert2);
Vue.use(VueTheMask);
Vue.use(Vuetify);

Vue.directive('mask', mask);

const app = document.createElement('div');
app.setAttribute('data-app', String(true));
document.body.append(app);
