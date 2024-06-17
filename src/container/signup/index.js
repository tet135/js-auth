import {
  Form,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
} from '../../script/form'

import { saveSession } from '../../script/session'

class SignupForm extends Form {
  FIELD_NAME = {
    EMAIL: 'email',
    PASSWORD: 'password',
    PASSWORD_AGAIN: 'passwordAgain',
    ROLE: 'role',
    IS_CONFIRM: 'isConfirm',
  }

  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Значення дуже довге, скоротіть його',
    EMAIL: 'Введіть коректне значення електронної пошти',
    PASSWORD:
      'Пароль має складатися з 8 або більше символів, в т.ч. малі і великі літери, хоча б одну цифру',
    PASSWORD_AGAIN: 'Паролі не збігаються',
    ROLE: 'Ви не обрали роль',
    NOT_CONFIRM:
      'Ви не погоджуєтесь з умовами користування сайтом',
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

    // for password field
    if (name === this.FIELD_NAME.PASSWORD) {
      if (!REG_EXP_PASSWORD.test(String(value)))
        return this.FIELD_ERROR.PASSWORD
    }

    // for passwordAgain field
    if (name === this.FIELD_NAME.PASSWORD_AGAIN) {
      // const password =
      //   document.getElementsByName('password')[0].value

      // console.log(password)
      if (
        String(value) !==
        this.value[this.FIELD_NAME.PASSWORD]
      )
        return this.FIELD_ERROR.PASSWORD_AGAIN
    }

    // for role
    // просто перевірка на число. а на бекенді далі йде перевірка прописана в класі User.js
    if (name === this.FIELD_NAME.ROLE) {
      if (isNaN(value)) return this.FIELD_ERROR.ROLE
    }

    // for isConfirm
    if (name === this.FIELD_NAME.IS_CONFIRM) {
      if (Boolean(value) !== true)
        return this.FIELD_ERROR.NOT_CONFIRM
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
        const res = await fetch('/signup', {
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
      [this.FIELD_NAME.ROLE]:
        this.value[this.FIELD_NAME.ROLE],
    })
  }
}

//треба дописувати new щоб підтяглись поля з Form
window.signupForm = new SignupForm()
