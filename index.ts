import esMain from "es-main"
import { install as installSourceMap } from "source-map-support"
import { app } from "./setup.js"

if (esMain(import.meta)) {
    installSourceMap()
    const host = '0.0.0.0'
    const port = '8081'
    app.listen(port, host, () => {
        console.log(`User server is running on ${host}:${port}`)
    })
}
