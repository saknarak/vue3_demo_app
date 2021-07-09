const dialogStack = []
let activeToast = null

export function pushDialog(dialog) {
  dialogStack.push(dialog)
  setTimeout(() => {
    dialog.doFocus()
  }, 0)
}

export function popDialog() {
  dialogStack.pop()
  if (dialogStack.length) {
    let dialog = dialogStack[dialogStack.length - 1]
    setTimeout(() => {
      dialog.doFocus()
    }, 10)
  }
}

export function setActiveToast(toast) {
  if (activeToast && typeof activeToast.hide === 'function') {
    activeToast.hide()
  }
  activeToast = toast
}
