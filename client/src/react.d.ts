import {RefObject} from 'react'

interface RefObject<T>{
  readonly current:T|null
}

function createRef<T>(): RefObject