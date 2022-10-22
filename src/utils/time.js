import dayjs from "dayjs"

export const dateFormat1 = payload => dayjs(payload).format('DD/MM/YYYY')

export const dateFormat2 = payload => dayjs(payload).format('MMM DD, YYYY')

export const dateFormat3 = payload => dayjs(payload).format('MMM DD, YYYY hh:mm A')
