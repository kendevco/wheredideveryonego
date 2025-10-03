#!/usr/bin/env node

console.log('🚀 Simple Test Script')
console.log('import.meta.url:', import.meta.url)
console.log('process.argv[1]:', process.argv[1])
console.log('Normalized path:', `file://${process.argv[1].replace(/\\/g, '/')}`)

const isMainModule = import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}`
console.log('Is main module:', isMainModule)

if (isMainModule) {
  console.log('✅ Running as main module')
} else {
  console.log('❌ Not detected as main module')
}









