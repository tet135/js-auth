import { List } from '../../script/list'
import { USER_ROLE } from '../../route/user'

class UserList extends List {
  constructor() {
    //super() - щоб працював конструктор батьківського List, якщо він там є
    super()

    this.element = document.querySelector('#user-list')
    if (!this.element) throw new Error('Element is null')

    this.loadData()
  }

  loadData = async () => {
    this.updateStatus(this.STATE.LOADING)

    try {
      const res = await fetch('/user-list-data', {
        method: 'GET',
      })
      const data = await res.json()

      if (res.ok) {
        this.updateStatus(
          this.STATE.SUCCESS,
          this.convertData(data),
        )
      } else {
        this.updateStatus(this.STATE.ERROR, data)
      }
    } catch (error) {
      console.log(error)
      this.updateStatus(this.STATE.ERROR, {
        message: error.message,
      })
    }
  }

  //convertData завжди маэ бути коли йде взаэмодія з сервером!
  convertData = (data) => {
    return {
      ...data,
      list: data.list.map((user) => ({
        ...user,
        role: USER_ROLE[user.role],
      })),
    }
  }

  updateView = () => {
    console.log(this.status, this.data)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  try {
    if (!window.session || !window.session.user.isConfirm) {
      location.assign('/')
    }
  } catch (e) {}

  new UserList()
})
