export interface TotalIncomeResponse {
    message: string;
    data:    Data;
}

export interface Data {
    totalIncome:      number;
    currentMonth:     Month;
    previousMonth:    Month;
    percentageChange: number;
}

export interface Month {
    month:  number;
    income: number;
}
