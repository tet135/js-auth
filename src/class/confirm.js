class Confirm {
  //приватний список кодів для паролю
  static #list = []

  constructor(data) {
    this.code = Confirm.generateCode()
    this.data = data
  }

  static generateCode = () =>
    Math.floor(Math.random() * 9000) + 1000

  static create = (data) => {
    this.#list.push(new Confirm(data))

    setTimeout(() => {
      this.delete(code)
    }, 1000 * 60 * 60 * 24) //24 hours

    console.log(this.#list)
  }

  static delete = (code) => {
    const length = this.#list.length

    this.#list = this.#list.filter(
      (item) => item.code !== code,
    )

    return length > this.#list.length //return true якщо видалення відбулося
  }

  static getData = (code) => {
    const obj = this.#list.find(
      (item) => item.code === code,
    )
    return obj ? obj.data : null
  }
}

module.exports = {
  Confirm,
}
