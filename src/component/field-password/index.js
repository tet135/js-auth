class FieldPassword {
  static toggle = (target) => {
    target.toggleAttribute('show')

    const input = target.previousElementSibling

    const type = input.getAttribute('type')

    if (type === 'password') {
      //якщо око відкрите, то будумо бачити текст
      input.setAttribute('type', 'text')
    } else {
      //якщо око закрите, то не будумо бачити текст(тип password замінює символи крапочками)
      input.setAttribute('type', 'password')
    }
  }
}

window.fieldPassword = FieldPassword
