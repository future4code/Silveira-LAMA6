export default class Show {
    constructor(
        private id: string,
        private week_day: string,
        private start_time: string,
        private end_time: string,
        private band_id: string

    ) { }
    public getId(): string {
        return this.id;
    }
    public getWeekDay(): string {
        return this.week_day;
    }
    public getStartTime(): string {
        return this.start_time;
    }
    public getEndTime(): string {
        return this.end_time;
    }
    public getBandId(): string {
        return this.band_id
    }
}