import { mount } from '@vue/test-utils';
import FormDialog from '@/app/student/components/FormDialog.vue';

function factory() {
  const wrapper = mount(FormDialog);

  return {
    wrapper,
  };
}

describe('FormDialog.vue', () => {
  it('should assemble the component', () => {
    const {wrapper} = factory();
    expect(wrapper).toBeDefined();
  });
});
