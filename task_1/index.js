import { encoded, translations } from './data.js'

// console.log("Let's rock")
// console.log(encoded, translations)

const translate = (encoded, translations) => {
  const uniqueIds = new Set()
  const decoded = encoded.map(data => {

    const decodedItem = {}

    const notDecodedKeys = ["groupId", "service", "ca", "formatSize"]

    for (const key in data) {
      if (data[key] !== null) {

        //убираем недекодируемые ключи
        if (notDecodedKeys.includes(key)) {
          decodedItem[key] = data[key]
          continue
        }

        //собираем уникальные значения
        if (!uniqueIds.has(data[key])) {
          uniqueIds.add(data[key])
        }

        //декодируем
        if (translations[data[key]]){

          decodedItem[key] = translations[data[key]]
        } else {

          decodedItem[key] = data[key]
        }

      } else {
        decodedItem[key] = null
      }
    }

    return decodedItem
  })

return {decoded, uniqueIds}

}

console.log(translate(encoded, translations))
