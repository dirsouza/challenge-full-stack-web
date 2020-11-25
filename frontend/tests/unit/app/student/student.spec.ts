import { mount } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Student from '@/app/student/Student.vue';

function factory() {
  const wrapper = mount(Student, {
    vuetify: new Vuetify(),
  });

  return {
    wrapper,
  };
}

describe('Student.vue', () => {
  it('should assemble the component', () => {
    const { wrapper } = factory();
    expect(wrapper).toBeDefined();
  });
});
