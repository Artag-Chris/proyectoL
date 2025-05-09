export interface GetClientStatsResponse {
    totalUsuarios:     number;
    usuariosActivos:   number;
    usuariosInActivos: number;
    subscriptions:     Subscriptions;
}

export interface Subscriptions {
    currentMonth:     Month;
    previousMonth:    Month;
    percentageChange: number;
}

export interface Month {
    month: number;
    count: number;
}
