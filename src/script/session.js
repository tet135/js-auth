export const SESSION_KEY = 'sessionAuth'

export const saveSession = (session) => {
  try {
    console.log(session)

    window.session = session

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(session), //ПЕРЕДАЄМО НА ЗБЕРІГАННЯ in JSON
    )
  } catch (err) {
    console.error(err)
    window.session = null
  }
}

export const loadSession = () => {
  //якщо в JSON.parse прийде null (JSON.parse(null)),то ок, але
  //якщо прийде underfined (JSON.parse(underfined), наприклад, якась функція буду всередені
  //і поверне underfined, то буду помилка і код зламається.
  //тому треба обгорнути try-catch, або отримати
  // const json = localStorage.getItem(SESSION_KEY), a потім if(json) {...})
  try {
    const session = JSON.parse(
      localStorage.getItem(SESSION_KEY),
    )

    if (session) {
      window.session = session
    } else {
      window.session = null
    }
  } catch (err) {
    console.error(err)
    window.session = null
  }
}

export const getTokenSession = () => {
  try {
    const session = getSession()

    return session ? session.token : null
  } catch (err) {
    console.log(err)
    return null
  }
}

export const getSession = () => {
  try {
    const session = JSON.parse(
      localStorage.getItem(SESSION_KEY) || window.session,
    )
    return session || null
  } catch (err) {
    console.log(err)
    return null
  }
}
