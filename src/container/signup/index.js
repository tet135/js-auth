class SignupForm {
  //value для запису даних з полей по name
  static value = {
    //key - це буду name поля
    // value - саме значення з поля
  }

  static validate = (name, value) => {
    //тут функціонал валідації значень
    return true
  }

  //функція для кнопки "Зареєструватия" для відправки даних на сервер через fetch, a не через button, type=submit
  static submit = () => {
    console.log(this.value)
  }

  static change = (name, value) => {
    console.log(name, value)
    if (this.validate(name, value)) this.value[name] = value
  }
}

window.signupForm = SignupForm
