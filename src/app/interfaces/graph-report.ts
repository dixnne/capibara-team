export interface Report{
    screenPageViews:Metrics[],
    newUsers:Metrics[],
}

interface Metrics{
    date:string,
    country:string,
    value:string
}