// 1) завантаження даних = відобразити статус завантаження
// 2) Відображення даних, які ми завантажили (в т.ч. конвертація даних)
// 3) якщо є помилка, то виводими статус помилки
export class List {
  STATE = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
  }

  status = null
  data = null
  element = null

  updateStatus = (status, data) => {
    this.status = status
    if (data) this.data = data

    this.updateView()
  }
  //updateView - зовнішній вигляд екрану користувача, оновлення відображення
  //враховує status, змінює вигляд element через зміну innerHTML
  updateView = () => {}

  loadData = async () => {}

  convertData = () => {}
}
