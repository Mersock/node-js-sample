const socket = io();

// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated!', count)
// });

// document.querySelector('#increment').addEventListener('click',() => {
//     console.log('Clicked')
//     socket.emit('increment')
// })

//Element
const $messageForm = document.querySelector("#message-form");
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $locationButton = document.querySelector('#send-location')
const $message = document.querySelector('#messages')

// Template
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML

//Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true });

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createAt: moment(message.createAt).format('HH:mm:ss')
    })
    $message.insertAdjacentHTML('beforeend', html)
});

socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationMessageTemplate, {
        url: message.url,
        createAt: moment(message.createAt).format('HH:mm:ss')
    })
    $message.insertAdjacentHTML('beforeend', html)
});

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();

    $messageFormButton.setAttribute('disabled', 'disabled');

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();

        if (error) {
            return console.log(error)
        }

        console.log('The message was delivered!')
    });
});

$locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Gelocation is not support by your browser')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        $locationButton.setAttribute('disabled', 'disabled')
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $locationButton.removeAttribute('disabled')
            console.log('Location shared!');
        })
    });
});

socket.emit('join', { username, room });