// const REG_EXP_EMAIL = new RegExp(
//   '^[w-.]+@([w-]+.)+[w-]{2,4}$',
//   'gm',
// )

// const REG_EXP_PASSWORD = new RegExp(
//   '/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/',
// )

//це базовий абстрактний класс який далі перевикористовується, перезаписується
export class Form {
  //для EMAIL: email, PASSWORD...
  FIELD_NAME = {}
  //заготовка для помилок
  // залишаэмо порожнім, потім будумо наповнювати в класах
  FIELD_ERROR = {}

  //   static поля НЕ наслідуються, тому їх тут НЕ робити

  //value для запису даних з полей по name
  value = {
    //key - це буду name поля
    // value - саме значення з поля
  }

  error = {}

  change = (name, value) => {
    console.log(name, value)

    const error = this.validate(name, value)

    this.value[name] = value

    console.log(error)

    // if (this.validate(name, value)) this.value[name] = value
  }
}
