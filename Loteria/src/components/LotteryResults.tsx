import SelectLottery from "./SelectLottery";
import axios from "axios";
import { useState, useEffect } from "react";
import { LotteryResult } from "../types/lotteryTypes";
import '../styles/LotteryResults.scss'


interface LotteryResultsProps{
    selectedLottery: string | null;
    onLotteryDataFetched: (data: LotteryResult) => void;
}

const LotteryResults: React.FC<LotteryResultsProps> = ({selectedLottery, onLotteryDataFetched}) => {
    const [lotteryData, setLotteryData] = useState<LotteryResult | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        if(!selectedLottery) return;

        const fetchData = async () => {
            setLoading(true)
            setError(null);
          try {
            const endpoint = `https://loteriascaixa-api.herokuapp.com/api/${selectedLottery?.toLowerCase().replace(/\s/g, '')}/latest`;
            const response = await axios.get(endpoint)
            setLotteryData(response.data);
            onLotteryDataFetched(response.data);
            console.log(response.data)
          } catch (error) {
            setError('Erro ao carregar os dados')
            
          }finally{
            setLoading(false)
          }
        }
        fetchData()
      }, [selectedLottery])

    return(
        <>
        </>
    )
}

export default LotteryResults;