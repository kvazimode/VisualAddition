let aRange = [6, 7, 8, 9]
let sumRange = [11, 12, 13, 14]

let a = Math.floor(Math.random() * ((aRange[aRange.length - 1] + 1) - aRange[0])) + aRange[0]
let sum = Math.floor(Math.random() * ((sumRange[sumRange.length - 1] + 1) - sumRange[0])) + sumRange[0]
let b = sum - a

let makeBlanc = function (id, taskId) {
    document.getElementById(id).firstChild.style.color = 'black'
    if (taskId) document.getElementById(taskId).style.backgroundColor = 'white'
}
let Wrong = function (id, taskId) {
    document.getElementById(id).firstChild.style.color = 'red'
    if (taskId) document.getElementById(taskId).style.backgroundColor = 'orange'
}
let Submit = function (id) {
    document.getElementById('submit').innerHTML = `<input type='button' value='Заново?' onclick='Restart()'>`
    document.getElementById(id).innerHTML = `${sum}`
    document.getElementById('submit').firstChild.focus()
    document.getElementById('task').innerHTML = `Правильно!`
}
let Restart = () => location.reload()

let aCompare = function (val, id) {
    if (val.length != 0) {
        val == a ? bLoad() : Wrong(id, 'taskA')
    } else {
        makeBlanc(id, 'taskA')
    }
}

let bCompare = function (val, id) {
    if (val.length != 0) {
        val == b ? sumLoad() : Wrong(id, 'taskB')
    } else {
        makeBlanc(id, 'taskB')
    }
}

let sumCompare = function (val, id) {
    if (val.length > 1) {
        val == sum ? Submit(id) : Wrong(id)
    } else {
        makeBlanc(id)
    }
}

let bLoad = function () {
    document.getElementById('a').innerHTML = `${a}`
    document.getElementById('b').innerHTML = `<input type='text' maxlength='1'  oninput='bCompare(this.value, this.parentElement.id)'>`
    document.getElementById('b').firstChild.focus()
    drawNum(b)
    document.getElementById('b').style.top = pointer[1] - 70
    document.getElementById('b').style.left = pointer[0] - Length(b) / 2 - 10
    document.getElementById('task').innerHTML = `Введите второе слагаемое`
}

let sumLoad = function () {
    document.getElementById('b').innerHTML = `${b}`
    document.getElementById('sum').innerHTML = `<input type='text' maxlength='2'  oninput='sumCompare(this.value, this.parentElement.id)'>`
    document.getElementById('sum').firstChild.focus()
    document.getElementById('task').innerHTML = `Введите сумму`
}

let makeBase = function () {
    let context = document.getElementById('field').getContext('2d')
    image = new Image()
    image.src = 'sprite.png'
    image.onload = function () {
        context.drawImage(image, 0, 144, 600, 56)
        drawNum(a)
    }
}

let k = 26.6 //длина деления шкалы в текущем масштабе 
let pointer = [25, 157] //точка начала шкалы [x, y]
let Length = num => num * k
let drawNum = function (num) {
    let context = document.getElementById('field').getContext('2d')
    let l = Length(num)
    context.beginPath()
    context.moveTo(pointer[0], pointer[1])
    let cp1x = l / 4 + pointer[0]
    let cpy = pointer[1] - 60
    let cp2x = 3 * l / 4 + pointer[0]
    pointer[0] = pointer[0] + l
    context.bezierCurveTo(cp1x, cpy, cp2x, cpy, pointer[0], pointer[1])
    context.strokeStyle = "purple"
    context.stroke()
}

window.onload = function () {
    makeBase()
    document.getElementById('taskA').innerHTML = `${a}`
    document.getElementById('taskB').innerHTML = `${b}`
    document.getElementById('a').innerHTML = `<input type='text' maxlength='1' oninput='aCompare(this.value, this.parentElement.id)' autofocus>`
    document.getElementById('a').style.top = pointer[1] - 70
    document.getElementById('a').style.left = (Length(a) + pointer[0]) / 2
    document.getElementById('task').innerHTML = `Введите первое слагаемое`
}