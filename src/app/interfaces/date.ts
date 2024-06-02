export interface DateInfo {
    id: string,
    data: {
        petId: string,
        userId: string,
        date: {
            day: number,
            month: number,
            year: number,
            hour: string
        }
    }
}