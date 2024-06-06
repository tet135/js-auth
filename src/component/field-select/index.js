class FieldSelect {
  static toggle = (target) => {
    const options = target.nextElementSibling
    options.toggleAttribute('active')

    // setTimeout потрібен для того, щоб спочатку спрацював toggle на клікб
    // а вже потім на наступний ОДИН(once: true) - addEventListener
    setTimeout(() => {
      window.addEventListener(
        'click',
        // e.target = той тег, на якому клікнули. спрацьовує, коли
        // це НЕ поле з button всередині
        (e) => {
          if (!options.parentElement.contains(e.target))
            options.removeAttribute('active')
        },
        { once: true },
      )
    })
  }

  static change = (target) => {
    const list = target.parentElement

    //піднімаємось до field__container (parent)
    const parent = target.parentElement.parentElement

    //=====
    const active = list.querySelector('*[active]')

    if (active) active.toggleAttribute('active')
    //=====
    target.toggleAttribute('active')

    //=====
    //placeholder = value
    const value = parent.querySelector('.field__value')

    if (value) {
      value.innerText = target.innerText
      value.classList.remove('field__value--placeholder')
    }

    list.toggleAttribute('active')
  }
}

window.fieldSelect = FieldSelect
