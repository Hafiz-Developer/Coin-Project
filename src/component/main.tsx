import { useEffect, useState } from 'react';
import Coin from '../assets/images/coin.webp'
import { FaBitcoin } from "react-icons/fa";
interface FloatingText {
	id: number;
	x: number;
	y: number;
}

const Main = () => {
    const maxEnergy = 2000;
	const [value, setValue] = useState(0);
	const [energy, setEnergy] = useState(maxEnergy);
	const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
	const [nextId, setNextId] = useState(0);

	const handleClick = (e: any) => {
		if (energy > 0) {
			setValue((prev) => prev + 1);
			setEnergy((prev) => (prev > 0 ? prev - 1 : 0));

			const { clientX: x, clientY: y } = e;
			const newText: FloatingText = { id: nextId, x, y };
			setFloatingTexts((prev) => [...prev, newText]);
			setNextId((prev) => prev + 1);

			setTimeout(() => {
				setFloatingTexts((prev) => prev.filter((text) => text.id !== newText.id));
			}, 2000);
		}
	};

	const energyPercentage = (energy / maxEnergy) * 100;

	useEffect(() => {
		const interval = setInterval(() => {
			setEnergy((prevEnergy) => {
				if (prevEnergy < maxEnergy) {
					return prevEnergy + 1;
				}
				return prevEnergy;
			});
		}, 1500);

		return () => clearInterval(interval);
	}, []);
  return (
    <>
    <div className="mainData">
        <div className="TotalCoins">
            <FaBitcoin className='iconCoin'/>
            {value.toLocaleString()}
        </div>
        <div className="mainImgCoin">
            <img src={Coin}
            	onClick={handleClick}
                className='coin-button'
            alt="" />
        </div>
        <div className="energy">
            <div className="energyText">
                <h2>energy</h2>
                <span>{energy} / {maxEnergy}</span>
            </div>
            <div className="percentage">
                <div className="PercenetCount"
                style={{ width: `${energyPercentage}%` }}
                >

                </div>
            </div>
        </div>
        {floatingTexts.map((text) => (
				<span
					className="floating-text font-semibold text-[30px]"
					key={text.id}
					style={{ top: text.y, left: text.x }}
				>
					+1
				</span>
			))}
    </div>
    </>
  )
}

export default Main