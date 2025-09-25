import configEnvs from "./config-envs";

export default class Env {
  static get(envName: string) {
    configEnvs();
    return process.env[envName]; 
  }
}