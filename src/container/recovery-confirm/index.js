import { Form, REG_EXP_PASSWORD } from '../../script/form'
import { saveSession } from '../../script/session'

class RecoveryConfirmForm extends Form {
  FIELD_NAME = {
    CODE: 'code',
    PASSWORD: 'password',
    PASSWORD_AGAIN: 'passwordAgain',
  }

  FIELD_ERROR = {
    IS_EMPTY: 'Введіть значення в поле',
    IS_BIG: 'Значення дуже довге, скоротіть його',
    //code не валідуємо, щоб не підказувати формат введення коду для злодюжок
    PASSWORD:
      'Пароль має складатися з 8 або більше символів, в т.ч. малі і великі літери, хоча б одну цифру',
    PASSWORD_AGAIN: 'Паролі не збігаються',
  }

  validate = (name, value) => {
    //тут функціонал валідації значень
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }

    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG
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
        const res = await fetch('/recovery-confirm', {
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
      [this.FIELD_NAME.PASSWORD]:
        this.value[this.FIELD_NAME.PASSWORD],
    })
  }
}

//треба дописувати new щоб підтяглись поля з Form
window.recoveryConfirmForm = new RecoveryConfirmForm()

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (window.session) {
      if (window.session.user.isConfirm) {
        location.assign('/')
      }
    } else {
      location.assign('/')
    }
  } catch (error) {}
})
