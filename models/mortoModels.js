const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MortosSchema = new Schema({
  data: {
    type: String,
    required: true,
    format: "Month-D"
  },
  distrito: {
    type: String,
    required: true,
  },
  obitos: {
    type: Number,
    required: true,
  },
  
});

//mongoose.model('Morto', MortosSchema);
//module.exports = mongoose.model('Morto');

// Exportar Dados Model
var Morto = module.exports = mongoose.model('Morto', MortosSchema);

module.exports.get = function (callback, limit) {
  Morto.find(callback).limit(limit);
}