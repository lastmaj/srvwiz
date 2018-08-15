export interface IPlan {
    id?: number;
    planName?: string;
    reqestLimit?: number;
    datasourceLimit?: number;
    wsLimit?: number;
    roleLimit?: number;
    price?: number;
}

export class Plan implements IPlan {
    constructor(
        public id?: number,
        public planName?: string,
        public reqestLimit?: number,
        public datasourceLimit?: number,
        public wsLimit?: number,
        public roleLimit?: number,
        public price?: number
    ) {}
}
