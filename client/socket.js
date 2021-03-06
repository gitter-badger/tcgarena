import io from 'socket.io-client'
import store, { fetchMini } from './store';

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')

  socket.on('fetch-mini', miniId =>
    store.dispatch(fetchMini(miniId))
  )

})

export default socket
