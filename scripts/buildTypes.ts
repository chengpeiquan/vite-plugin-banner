import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { generateDtsBundle } from 'dts-bundle-generator'

async function run() {
  const options = [
    {
      filePath: resolve(__dirname, `../src/main.ts`),
      output: {
        noBanner: true,
      },
    },
  ]

  const dtses = generateDtsBundle(options, {
    preferredConfigPath: resolve(__dirname, `../tsconfig.json`),
  })

  if (!Array.isArray(dtses) || !dtses.length) return
  const dts = dtses[0]
  const output = resolve(__dirname, `../dist/index.d.ts`)
  writeFileSync(output, dts)
}
run().catch((e) => {
  console.log(e)
})
