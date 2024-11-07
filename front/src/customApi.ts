import { DefaultApi } from './generated/apis';
import axiosInstance from './axiosInstance';
import { Configuration } from './generated';

class CustomApi extends DefaultApi {
  constructor() {
    super({ Configuration });
    // super(undefined, '', axiosInstance);
  }
}

export default new CustomApi();
