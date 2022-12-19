import type { ConfigFile } from '@rtk-query/codegen-openapi'

const config: ConfigFile = {
  schemaFile: 'schema.json',
  apiFile: 'emptyApi.ts',
  apiImport: 'emptySplitApi',
  outputFile: 'shoppingApi.ts',
  exportName: 'shoppingApi',
  hooks: true,
}

export default config