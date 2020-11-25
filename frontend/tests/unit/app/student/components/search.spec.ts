import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import Search from '@/app/student/components/Search.vue';

function factory() {
  const wrapper = mount(Search);

  return {
    wrapper,
  };
}

describe('Search.vue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  function findComponents(wrapper: any) {
    const inputSearch = wrapper.findComponent({ ref: 'inputSearch' });

    return {
      inputSearch,
    };
  }

  it('should assemble the component', () => {
    const { wrapper } = factory();
    expect(wrapper).toBeDefined();
  });

  it('should component a be defined', () => {
    const { wrapper } = factory();

    const { inputSearch } = findComponents(wrapper);

    expect(inputSearch.exists()).toBeTruthy();
  });

  it('should trigger the input event when typing', async () => {
    const { wrapper } = factory();

    const { inputSearch } = findComponents(wrapper);
    inputSearch.vm.$emit('input', 'any');

    await flushPromises();
    expect(inputSearch.emitted().input).toBeTruthy();
    expect((inputSearch as any).emitted().input[0][0]).toEqual('any');
  });

  it('should not emit the input event if the length of the search term is equal to 1', async () => {
    const { wrapper } = factory();

    const spyEmitInput = jest.spyOn((wrapper.vm as any), 'emitInput');
    const { inputSearch } = findComponents(wrapper);
    inputSearch.vm.$emit('input', 'a');

    await flushPromises();
    expect(spyEmitInput).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().input).not.toBeTruthy();
  });

  it('should issue the input event if the size of the search term is greater tha 1, equal to 0 or equal to NULL', async () => {
    const { wrapper } = factory();

    const spyEmitInput = jest.spyOn((wrapper.vm as any), 'emitInput');
    const { inputSearch } = findComponents(wrapper);
    inputSearch.vm.$emit('input', 'any');

    await flushPromises();
    expect(spyEmitInput).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted().input).toBeTruthy();

    inputSearch.vm.$emit('input', '');

    await flushPromises();
    expect(spyEmitInput).toHaveBeenCalledTimes(2);
    expect(wrapper.emitted().input).toBeTruthy();

    inputSearch.vm.$emit('input', null);

    await flushPromises();
    expect(spyEmitInput).toHaveBeenCalledTimes(3);
    expect(wrapper.emitted().input).toBeTruthy();
  });
});
