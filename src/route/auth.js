// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')

User.create({
  email: 'test@gmail.com',
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

//для відправки даних форми через fetch
router.get('/signup', function (req, res) {
  const { email, password, role } = req.body

  console.log(req.body)

  if (!email || !password || !role) {
    return res.status(400).json({
      message: 'Помилка. Обов`язкові поля відсутні',
    })
  }

  try {
    //тут основний код ендпоїнта: реєстрація користувача. Це БІЗНЕС-ЛОГІКА!!!
    // Її завжди треба обробити через try-catch, щоб уникнути поламки сервера, убезпечитися від помилок
    User.create({ email, password, role })

    return res.status(200).json({
      message: 'Користувач успішно зареєстрований',
      // data:....
    })
  } catch (err) {
    return res.status(400).json({
      //message: err.message можна зробити, але не варто, бо в err приходить авто.текст на англ, який не завжди зрозумілий користувачу
      message: 'Помилка створення користувача',
    })
  }
})

// Підключаємо роутер до бек-енду
module.exports = router
