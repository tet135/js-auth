// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')

User.create({
  email: 'test@mail.com',
  password: 123,
  role: 1,
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/signup', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('signup', {
    // вказуємо назву контейнера
    name: 'signup',
    // вказуємо назву компонентів
    component: [
      'back-button',
      'field',
      'field-password',
      'field-checkbox',
      'field-select',
    ],

    // вказуємо назву сторінки
    title: 'Signup page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {
      role: [
        {
          value: User.USER_ROLE.USER,
          text: 'Користувач',
        },
        {
          value: User.USER_ROLE.ADMIN,
          text: 'Адміністратор',
        },
        {
          value: User.USER_ROLE.DEVELOPER,
          text: 'Розробник',
        },
      ],
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

//===============================

//для відправки даних форми через fetch
router.post('/signup', function (req, res) {
  const { email, password, role } = req.body

  // console.log(req.body)

  if (!email || !password || !role) {
    return res.status(400).json({
      message: 'Помилка. Обов`язкові поля відсутні',
    })
  }

  try {
    //тут основний код ендпоїнта: реєстрація користувача. Це БІЗНЕС-ЛОГІКА!!!
    // Її завжди треба обробити через try-catch, щоб уникнути поламки сервера, убезпечитися від помилок
    const user = User.getByEmail(email)
    if (user) {
      return res.status(400).json({
        message:
          'Помилка. Користувач з таким email вже існує',
      })
    }
    User.create({ email, password, role })

    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
      // data:....

      //тут логіка кодування паролю: до певного коду прив'язується об'єкт юзер(з його email). Технологія Redis
    })
  } catch (err) {
    return res.status(400).json({
      //message: err.message можна зробити, але не варто, бо в err приходить авто.текст на англ, який не завжди зрозумілий користувачу
      message: 'Помилка створення користувача',
    })
  }
})

// ================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/recovery', function (req, res) {
  res.render('recovery', {
    name: 'recovery',
    component: ['back-button', 'field'],
    title: 'Recovery page',
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})
// ====================================
router.post('/recovery', function (req, res) {
  const { email } = req.body
  console.log(email)

  if (!email) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Користувача з таким email не існує',
      })
    }

    Confirm.create(email)

    return res.status(200).json({
      message: 'Код для відновлення паролю відправлено',
    })
  } catch (error) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

//===============================

router.get('/recovery-confirm', function (req, res) {
  return res.render('recovery-confirm', {
    name: 'recovery-confirm',
    component: ['back-button', 'field', 'field-password'],
    title: 'Recovery confirm page',
    data: {},
  })
})
//================
router.post('/recovery-confirm', function (req, res) {
  const { code, password } = req.body
  console.log(code, password)

  if (!code || !password) {
    return res.status(400).json({
      message: "Помилка. Обов'язкові поля відсутні",
    })
  }

  try {
    const email = Confirm.getData(Number(code))

    if (!email) {
      return res.status(400).json({
        message: 'Код не дійсний',
      })
    }

    const user = User.getByEmail(email)

    if (!user) {
      return res.status(400).json({
        message:
          'Помилка. Користувача з таким email не існує',
      })
    }

    user.password = password // поки так, але пароль на бэкэнді не зберігають в неконвертованому вигляді!

    console.log(user)

    return res.status(200).json({
      message: 'Пароль успішно змінено',
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

//===============================
// Підключаємо роутер до бек-енду
module.exports = router
