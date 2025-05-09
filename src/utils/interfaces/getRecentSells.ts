export interface RecentSalesResponse {
    message: string;
    data:    Datum[];
}

export interface Datum {
    id:          number;
    name:        string;
    email:       string;
    amount:      string;
    amountValue: number;
    status:      string;
    date:        Date;
    avatar:      null;
    isVip:       boolean;
    trend:       string;
}
