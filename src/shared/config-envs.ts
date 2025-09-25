export default function configEnvs(stage: string = 'development'): void { 
  const envPath = `${__dirname.replace('src/shared', '')}envs/.${stage}.env`

  process.loadEnvFile(envPath)
}