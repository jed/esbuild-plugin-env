import {build, stop} from 'https://deno.land/x/esbuild@v0.13.15/mod.js'
import env from '../mod.js'

let input = Math.random().toString(36).slice(2)

Deno.env.set('SECRET', input)

let {outputFiles} = await build({
  bundle: true,
  format: 'esm',
  write: false,
  entryPoints: ['test/secret.js'],
  plugins: [env]
})

let dataurl = await new Promise(cb => {
  let reader = new FileReader()
  let blob = new Blob([outputFiles[0].contents])
  reader.onload = () => cb(reader.result)
  reader.readAsDataURL(blob)
})

let {SECRET: output} = await import(dataurl)

if (input !== output) {
  throw new Error(`Secrets don't match: ${input} vs ${output}.`)
}

stop()

