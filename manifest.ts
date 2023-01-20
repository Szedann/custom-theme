import { ManifestV3Export } from "@crxjs/vite-plugin"

const manifest: ManifestV3Export = {
    "manifest_version": 3,
    "name": "CustomCSS",
    "description": "Custom CSS for websites",
    "version": "0.1.0",
    "action": {
        "default_popup": "index.html"
    },
    "background": {
        "service_worker": "src/background.ts",
    },
    "permissions": [
        "activeTab",
        "tabs",
        "scripting",
        "storage"
    ],
    "host_permissions": [
        "<all_urls>"
    ]
}
export default manifest