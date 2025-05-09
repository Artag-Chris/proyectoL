export interface GetsellStatsResponse {
    message: Message;
    data:    Data;
}

export interface Data {
    totalVentas:   TotalVentas;
    currentMonth:  Month;
    previousMonth: Month;
    changes:       Changes;
}

export interface Changes {
    incomePercentage: number;
    countPercentage:  number;
}

export interface Month {
    month:  number;
    count:  number;
    amount: number;
}

export interface TotalVentas {
    count:  number;
    amount: number;
}

export interface Message {
    total:         string;
    currentMonth:  string;
    previousMonth: string;
    changes:       string;
}
