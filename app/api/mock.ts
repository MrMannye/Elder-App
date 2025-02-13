import AxiosMockAdapter from 'axios-mock-adapter';
import axios from '@/src/utils/axios';

const mock = new AxiosMockAdapter(axios, { delayResponse: 0 });
export default mock;
