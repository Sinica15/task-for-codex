require('jsdom-global')();

import Vue from 'vue'
import appWrapper from '@/components/app-wrapper'
import appCommandButton from "@/components/app-command-button";
import appSymbolCanvas from "@/components/app-symbol-canvas";
import { mount } from '@vue/test-utils'


describe('app-wrapper tests', () => {

  const wrapper = mount(appWrapper);

  it('отображает корректную разметку', () => {
    expect(wrapper).toContain(appCommandButton);
  })

});
