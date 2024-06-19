import { Form } from '../../script/form'

import {
  getSession,
  getTokenSession,
  saveSession,
} from '../../script/session'

class SignupConfirmForm extends Form {
  FIELD_NAME = {
    CODE: 'code',
  }

  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Значення дуже довге, скоротіть його',
    //code не валідуємо, щоб не підказувати формат введення коду для злодюжок
  }

  validate = (name, value) => {
    //тут функціонал валідації значень
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }

    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG
    }

    //нічого не повертає, якщо всі поля ОК; повертає текст помилки, якщо його немає (underfined), то розуміємо, що всі поля введені коректно
  }

  //функція для кнопки "Зареєструватия" для відправки даних на сервер через fetch, a не через button, type=submit
  submit = async () => {
    if (this.disabled === true) {
      this.validateAll()
    } else {
      // console.log(this.value)

      //тут буде код відправки даних на сервер
      this.setAlert(
        'progress',
        'Завантаження. Зачекайте, будь-ласка!',
      )

      try {
        const res = await fetch('/signup-confirm', {
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
      [this.FIELD_NAME.CODE]: Number(
        this.value[this.FIELD_NAME.CODE],
      ),
      token: getTokenSession(),
    })
  }
}

//треба дописувати new щоб підтяглись поля з Form
window.signupConfirmForm = new SignupConfirmForm()

document
  .querySelector('#renew')
  .addEventListener('click', (e) => {
    e.preventDefault()

    const session = getSession()

    location.assign(
      `/signup-confirm?renew=true&email=${session.user.email}`,
    )
  })
