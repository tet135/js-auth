import { Form, REG_EXP_EMAIL } from '../../script/form'

import { saveSession } from '../../script/session'

class LoginForm extends Form {
  FIELD_NAME = {
    EMAIL: 'email',
    PASSWORD: 'password',
  }

  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Значення дуже довге, скоротіть його',
    EMAIL: 'Введіть коректне значення електронної пошти',
  }

  validate = (name, value) => {
    //тут функціонал валідації значень
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }

    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG
    }

    // for email field
    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value)))
        return this.FIELD_ERROR.EMAIL
    }
    //нічого не повертає, якщо всі поля ОК; повертає текст помилки, якщо його немає (underfined), то розуміємо, що всі поля введені коректно
  }

  //функція для кнопки "Зареєструватия" для відправки даних на сервер через fetch, a не через button, type=submit
  submit = async () => {
    if (this.disabled === true) {
      this.validateAll()
    } else {
      //тут буде код відправки даних на сервер
      console.log(this.value)

      this.setAlert(
        'progress',
        'Завантаження. Зачекайте, будь-ласка!',
      )

      try {
        const res = await fetch('/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: this.convertData(),
        })
        //сюди приходить з route/auth.js/ res.status(200).json({
        // message: 'Користувач успішно зареєстрований'
        const data = await res.json()

        if (res.ok) {
          this.setAlert('success', data.message)
          saveSession(data.session)
          location.assign('/')
        } else {
          this.setAlert('error', data.message)
        }
      } catch (error) {
        this.setAlert('error', error.message)
      }
    }
  }

  //готуємо дані для відправки на сервер
  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]:
        this.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.PASSWORD]:
        this.value[this.FIELD_NAME.PASSWORD],
    })
  }
}

//треба дописувати new щоб підтяглись поля з Form
window.loginForm = new LoginForm()

document.addEventListener('DOMContentLoaded', () => {
  if (window.session) {
    location.assign('/')
  }
})
