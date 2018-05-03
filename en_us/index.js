import names from './names.json'

import produceCommon from './produce-common.json'
import produceMano from './produce-mano.json'
import produceHiori from './produce-hiori.json'
import produceMeguru from './produce-meguru.json'

import hioriEnd from './hiori-end.json'

export default []
  .concat(names.messages)
  .concat(produceCommon.messages)
  .concat(produceMano.messages)
  .concat(produceHiori.messages)
  .concat(produceMeguru.messages)
  .concat(hioriEnd.messages)
