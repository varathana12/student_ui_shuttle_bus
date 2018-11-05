import {isMobile} from 'react-device-detect'

export const HOME = "Booking"
export const HISTORY = "History"
export const PROFILE = "Profile"
export const PREFIX = sessionStorage.getItem('path')
export const WIDTH = isMobile ? "100%" : 500
