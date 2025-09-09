const input = document.getElementById("bruh")

document.getElementById("form").addEventListener("submit", (e) => {
    e.preventDefault()
    const value = input.value
    input.value = ''
    console.log('sent', value)
    socket.send(value)
})
console.log('script loaded')

const chat = document.getElementById("chat")

const online = document.getElementById("online")
let socket
function bruh() {
    socket = new WebSocket("ws://localhost:8080")
    const statuss = document.getElementById("status")
    statuss.style.backgroundColor = 'yellow' 
    statuss.innerText = 'connecting...'

    socket.addEventListener("open", (event) => {
        statuss.style.backgroundColor = 'green' 

        let element = document.createElement('button')
        element.addEventListener('click', (e) => {
            socket.close()
        })
        element.innerText = 'disconnect'
        statuss.innerText = ''
        statuss.append(element)
        statuss.append(`${socket.url}`)
    })

    socket.addEventListener("close", (event) => {
        statuss.style.backgroundColor = 'red' 
        statuss.innerText = 'disconnected'
        online.innerText = `offline`

        let element = document.createElement('button')
        element.addEventListener('click', (e) => {
            bruh()
        })
        element.innerText = 'reconnect'

        statuss.innerText = ''
        statuss.append(element)
    })

    socket.addEventListener("message", (e) => {
        const data = JSON.parse(e.data)
        console.log(data)

        if (data.count) {
            online.innerText = `${data.count} ${data.count == 1 ? "other" : "others"} online`
        }

        let ee = document.createElement('p')
        const date = new Date()
        ee.append(`${date.toTimeString().slice(0, 5)} `)
        let eee = document.createElement('span')
        eee.style.color = 'red'
        eee.innerText = data.user
        ee.append(eee)
        ee.append(` ${data.message}`)

        chat.insertBefore(ee, form)
    })
}
bruh()