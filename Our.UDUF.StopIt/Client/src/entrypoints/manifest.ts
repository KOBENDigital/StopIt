export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "UDUFProtect Entrypoint",
    alias: "UDUF.Protect.Entrypoint",
    type: "backofficeEntryPoint",
    js: () => import("./entrypoint"),
  }
];
