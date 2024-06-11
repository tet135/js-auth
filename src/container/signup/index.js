import { Form } from '../../script/form'

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

  static validate = (name, value) => {
    //тут функціонал валідації значень
    if (String(value).length < 1) {
      return FIELD_ERROR.IS_EMPTY
    }

    // if (String(value).length > 20) {
    //   return FIELD_ERROR.IS_BIG
    // }

    // //for email field
    // if (name === this.FIELD_NAME.EMAIL) {
    //   return FIELD_ERROR.IS_BIG
    // }
    // //нічого не повертає, якщо всі поля ОК; повертає текст помилки, якщо його немає (underfined), то розуміємо, що всі поля введені коректно
  }

  //функція для кнопки "Зареєструватия" для відправки даних на сервер через fetch, a не через button, type=submit
  static submit = () => {
    console.log(this.value)
  }
}

//треба дописувати new щоб підтяглись поля з Form
window.signupForm = new SignupForm()
