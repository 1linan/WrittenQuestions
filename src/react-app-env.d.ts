/// <reference types="react-scripts" />
declare module '*.module.scss' {
  const classes: {
    readonly [key: string]: string
  }
  export default classes
  declare module '*.scss'
}


declare module 'react-router-dom'
declare module '*.svg'
declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.gif'
declare module '*.bmp'
declare module '*.tiff'