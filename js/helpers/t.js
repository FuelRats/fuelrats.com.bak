import i18next from 'i18next'





// usage: {{t locale_key my="variable"}}
module.exports = function (context, block) {
  let result = i18next.t(context, block.hash)

  if (!result) {
    return context
  }

  return result
}
