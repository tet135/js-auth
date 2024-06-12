import { response } from 'express'

//з прапорцями не працюэ валідація???
const regexpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

//prittier чомусь коригує сам вираз якщо писати його всерединуnew RegExp(...)
export const REG_EXP_EMAIL = new RegExp(regexpEmail)

// console.log(REG_EXP_EMAIL)

const regexpPassword =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const REG_EXP_PASSWORD = RegExp(regexpPassword)
// console.log(REG_EXP_PASSWORD)

//це базовий абстрактний класс який далі перевикористовується, перезаписується
export class Form {
  //для EMAIL: email, PASSWORD...
  FIELD_NAME = {}
  //заготовка для помилок
  // залишаэмо порожнім, потім будумо наповнювати в класах
  FIELD_ERROR = {}

  //   static поля НЕ наслідуються, тому їх тут НЕ робити

  //value для запису даних з полей по name
  //key - це буду name поля
  // value - саме значення з поля
  value = {}

  error = {}

  disabled = true

  change = (name, value) => {
    // console.log(name, value)

    const error = this.validate(name, value)

    this.value[name] = value

    if (error) {
      this.setError(name, error)
      this.error[name] = error
    } else {
      this.setError(name, null)
      delete this.error[name]
    }

    this.checkDisabled()
  }

  setError = (name, error) => {
    const field = document.querySelector(
      `.validation[name="${name}"]`,
    )

    const span = document.querySelector(
      `.form__error[name="${name}"]`,
    )

    if (field) {
      field.classList.toggle(
        'validation--active',
        Boolean(error),
      )
    }

    if (span) {
      span.classList.toggle(
        'form__error--active',
        Boolean(error),
      )
      span.innerText = error || ''
    }
  }

  // перевіряє конкретні поля
  checkDisabled = () => {
    let disabled = false

    Object.values(this.FIELD_NAME).forEach((name) => {
      if (
        this.error[name] ||
        //this.value[name] === undefined - користувач ще не ввів дані
        this.value[name] === undefined
      ) {
        disabled = true
      }
    })

    const button = document.querySelector('.button')

    if (button) {
      button.classList.toggle(
        'button--disabled',
        Boolean(disabled),
      )
    }

    this.disabled = disabled
  }

  validateAll = () => {
    // let disabled = false

    Object.values(this.FIELD_NAME).forEach((name) => {
      const error = this.validate(name, this.value[name])

      if (error) {
        this.setError(name, error)
      }
    })
  }

  setAlert = (status, text) => {
    const alert = document.querySelector('.alert')

    if (status === 'progress') {
      alert.className = 'alert alert--progress'
    } else if (status === 'success') {
      alert.className = 'alert alert--success'
    } else if (status === 'error') {
      alert.className = 'alert alert--error'
    } else {
      alert.className = 'alert alert--disabled'
    }

    if (text) alert.innerText = text
  }
}
