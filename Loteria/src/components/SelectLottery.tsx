import React from 'react';
import '../styles/SelectLottery.scss'

interface LotterySelectorProps{
    selected: string | null;
    onChange: (value: string) => void;
}

const SelectLottery: React.FC<LotterySelectorProps> = ({ selected, onChange }) => {

    console.log(selected)

    return(
        <header className='select-lottery'>
            <form>
                <select name="lottery" 
                    id="lottery" 
                    value={selected || ''} 
                    onChange={(e) => onChange(e.target.value)}
                >
                    <option value="">Selecione uma opção</option>
                    <option value="MegaSena">MEGA-SENA</option>
                    <option value="Lotofacil">LOTOFACIL</option>
                    <option value="Quina">QUINA</option>
                    <option value="Lotomania">LOTOMANIA</option>
                    <option value="Timemania">TIMEMANIA</option>
                    <option value="Dia de sorte">DIA DE SORTE</option>
                </select>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="20"
                    height="20"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </form>
        </header>
    )
}

export default SelectLottery;

