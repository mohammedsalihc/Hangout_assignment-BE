import moment from "moment-timezone"

export const GetCurrentDateandTime = ()=>{
    return moment().utc()
}