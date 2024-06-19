// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/user-list', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('user-list', {
    // вказуємо назву контейнера
    name: 'user-list',
    // вказуємо назву компонентів
    component: ['back-button'],

    // вказуємо назву сторінки
    title: 'User list page',
    // ... сюди можна далі продовжувати додавати потрібні технічні дані, які будуть використовуватися в layout

    // вказуємо дані,
    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

//===============================

//для відправки даних форми через fetch
router.get('/user-list-data', function (req, res) {
  const list = User.getList()

  console.log(list)

  if (list.length === 0) {
    return res.status(400).json({
      message: 'Список користувачів порожній',
    })
  }

  return res.status(200).json({
    //витягуємо тільки ті дані, які потрібні(email, role, and id, щоб далі передати в query на наступну сторінку)
    list: list.map(({ id, email, role }) => ({
      id,
      email,
      role,
    })),
  })
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
