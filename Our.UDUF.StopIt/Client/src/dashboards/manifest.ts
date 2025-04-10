export const manifests: Array<UmbExtensionManifest> = [
  {
    name: "UDUFProtect Dashboard",
    alias: "UDUF.Protect.Dashboard",
    type: 'dashboard',
    js: () => import("./dashboard.element"),
    meta: {
      label: "Example Dashboard",
      pathname: "example-dashboard"
    },
    conditions: [
      {
        alias: 'Umb.Condition.SectionAlias',
        match: 'Umb.Section.Content',
      }
    ],
  }
];
