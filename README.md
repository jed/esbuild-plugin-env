# esbuild-plugin-env
 
This is an esbuild plugin that exports the current environment as a module, allowing you to embed environment variables in your build.

## Usage

Here's an example of usage in Deno. Let's say you have a module `secret.js` that exports a secret:

```js
export {SECRET} from 'env'
```

You can bundle it like this:

```js
import {build} from 'https://deno.land/x/esbuild@v0.13.15/mod.js'
import env from 'https://deno.land/x/esbuild_plugin_env@v1.0.0/mod.js'

Deno.env.set('SECRET', '********')

await build({
  bundle: true,
  format: 'esm',
  entryPoints: ['secret.js'],
  plugins: [env]
})
```

This will result in this code:

```js
var SECRET = "********";
export {
  SECRET
};
```