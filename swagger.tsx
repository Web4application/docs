"use client"

import { useEffect } from "react"

export default function SwaggerUIClient() {
  useEffect(() => {
    const loadSwagger = async () => {
      const res = await fetch("/spec.json")
      const spec = await res.json()

      const protocol = window.location.protocol.replace(":", "")
      if (spec.schemes && spec.schemes[0] !== protocol) {
        spec.schemes = [protocol, ...spec.schemes]
      }

      spec.host = window.location.host

      // @ts-ignore
      const ui = SwaggerUIBundle({
        spec,
        dom_id: "#swagger-ui",
        deepLinking: true,
        jsonEditor: true,
        docExpansion: "none",
        apisSorter: "alpha",
        validatorUrl: null,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ]
      })

      // @ts-ignore
      window.ui = ui
    }

    loadSwagger()
  }, [])

  return <div id="swagger-ui" />
}
