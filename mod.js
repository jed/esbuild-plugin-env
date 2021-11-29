export default {
  name: 'env',
  setup({onResolve, onLoad}) {
    onResolve({filter: /^env$/}, ({path}) => {
      return {path, namespace: 'env'}
    })

    onLoad({filter: /.*/, namespace: 'env'}, () => {
      let env
      try { env = Deno.env.toObject() }
      catch (e) { env = process.env }

      let contents = JSON.stringify(env)
      return {loader: 'json', contents}
    })
  }
}
