import { PluginMetadataGenerator } from '@nestjs/cli/lib/compiler/plugins';
import { ReadonlyVisitor } from '@nestjs/swagger/dist/plugin';
/**
 *  SWC 를 위한 코드인데 흠 ... TypeORM을 이용했을때 순환참조 에러가 발생할수가 있다
 */
const generator = new PluginMetadataGenerator();
console.log(__dirname);
generator.generate({
  visitors: [
    new ReadonlyVisitor({ introspectComments: true, pathToSource: __dirname }),
  ],
  outputDir: __dirname,
  watch: true,
  tsconfigPath: 'apps/app-api/tsconfig.app.json',
});
