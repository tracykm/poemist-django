apollo code_gen

from this folder

```
npx apollo schema:download --endpoint=http://localhost:8000/graphql graphql

npx apollo codegen:generate --localSchemaFile=graphql-schema.json --target=typescript --includes=src/**/*.ts --tagName=gql --addTypename --globalTypesFile=src/types/graphql-global-types.ts types
```

then deleted global type file, cause nothing in it causing errors

then imported type
