import { Configuration, ConfigurationParameters } from "./generated";
import { DefaultApi } from "./generated/apis";

const conf: ConfigurationParameters = { basePath: import.meta.env.VITE_API_BASE_URL };

export default new DefaultApi(new Configuration(conf));
