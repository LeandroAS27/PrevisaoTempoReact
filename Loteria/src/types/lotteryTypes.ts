export interface LotteryResult {
    loteria: string;
    concurso: number;
    data: string;
    dezenas: number[];
}

export interface LotteryData {
    [key: string]: LotteryResult;
}