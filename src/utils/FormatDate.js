import dayjs from 'dayjs'
export function FormatDate(timeinMs){
    return dayjs(timeinMs).format("dddd,MMMM D");
}