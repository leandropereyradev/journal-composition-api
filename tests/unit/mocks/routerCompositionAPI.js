/* eslint-disable no-undef */
import {
  VueRouterMock,
  createRouterMock,
  injectRouterMock,
} from "vue-router-mock";

import { config } from "@vue/test-utils";

// create one router per test file
const router = createRouterMock();
beforeEach(() => {
  injectRouterMock(router);
});

// Add properties to the wrapper
const mockRouterCompositionAPI = () =>
  config.plugins.VueWrapper.install(VueRouterMock);

export default mockRouterCompositionAPI;
