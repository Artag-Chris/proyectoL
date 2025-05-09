export interface MetricInterface {
    message: string;
    data:    Datum[];
}

export interface Datum {
    month:   string;
    revenue: number;
    users:   number;
}
