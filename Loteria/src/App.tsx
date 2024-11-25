import './styles/main.scss'
import { useEffect, useState } from 'react'
import SelectLottery from './components/SelectLottery.js'
import LotteryResults from './components/LotteryResults.js'
import image from './images/federal.svg'
import { LotteryResult } from './types/lotteryTypes.js'

const App: React.FC = () => {
  const [selectedLottery, setSelectedLottery] = useState<string | null>(null);
  const [lotteryData, setLotteryData] = useState<LotteryResult | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleLotteryDataFetched = (data: LotteryResult) => {
    setLotteryData(data);
  }
  return (
    <div className='main-container'>
      <div className={`left-container ${selectedLottery ? selectedLottery.toLowerCase().replace(/\s+/g, '-') : ''}`}>
        <SelectLottery selected={selectedLottery} onChange={(value) => setSelectedLottery(value)}/>
        <div className='lottery-header'>
          <img src={image} alt="" className='lottery-logo'/>
          <p className='lottery-text'>{selectedLottery || 'Nenhum sorteio selecionado'}</p>
        </div>
        <div className="lottery-info">
          {isMobile && lotteryData ? (
            <div className="mobile-info">
              <p><strong>Concurso N° {lotteryData.concurso}</strong></p>
            </div>
          ) : lotteryData ? (
            <div className="desktop-info">
              <p>Concurso</p>
              <p>
                <strong>{lotteryData.concurso} - {lotteryData.data}</strong>
              </p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="right-container">
        <div className="numbers">
          {lotteryData ? (
            lotteryData.dezenas.map((numero, index) => (
              <span key={index} className='number-circle'>{numero}</span>
            ))
          ) : (
            <p>Sem numeros sorteados.</p>
          )}
        </div>
        <p className="description">Este sorteio é meramente ilustrativo e não possui nenhuma ligação com a CAIXA.</p>
      </div>
        <LotteryResults selectedLottery={selectedLottery} onLotteryDataFetched={handleLotteryDataFetched}/>
    </div>
  )
}

export default App;
