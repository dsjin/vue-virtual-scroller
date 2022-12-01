const fsp = require('fs/promises')
const fs = require('fs-extra')

const neededItems = [
  {
    'path': './packages/vue-virtual-scroller/dist',
    'key_name': 'dist',
    'type': 'folder'
  },
  {
    'path': './packages/vue-virtual-scroller/node_modules',
    'key_name': 'node_modules',
    'type': 'folder'
  },
  {
    'path': './packages/vue-virtual-scroller/package.json',
    'key_name': 'package.json',
    'type': 'file'
  }
]

const checkItems = (item) => {
  item.forEach(element => {
    if (!fs.existsSync(element.path)) {
      throw new Error(`No Target Item: ${element.path}`)
    }
  })
}

const copyItems = async (item) => {
  if (fs.existsSync('./vue-virtual-scroller')) {
    await fsp.rmdir('./vue-virtual-scroller')
  }
  await fsp.mkdir('./vue-virtual-scroller')
  item.forEach(element => {
    fs.cpSync(element.path, `./vue-virtual-scroller/${element.key_name}`, {
      recursive: element.type === 'folder'
    })
  })
}

checkItems(neededItems)
copyItems(neededItems)
