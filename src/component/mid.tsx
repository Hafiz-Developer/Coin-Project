import { useEffect, useState } from "react";
import Coin from "../assets/images/coin.ico";
import textImage from "../assets/images/textImage.png";

interface FloatingText {
  id: number;
  x: number;
  y: number;
}

const Mid = () => {
  const maxEnergy = 2000;

  // Initialize state with the sum of totalCoins and totalCoins2 from localStorage
  const [value, setValue] = useState(() => {
    const storedTotalCoins = localStorage.getItem('totalCoins');
    const storedTotalCoins2 = localStorage.getItem('totalCoins2');
    const totalCoins = storedTotalCoins !== null ? parseInt(storedTotalCoins, 10) : 0;
    const totalCoins2 = storedTotalCoins2 !== null ? parseInt(storedTotalCoins2, 10) : 0;
    return totalCoins + totalCoins2;
  });

  const [energy, setEnergy] = useState(maxEnergy);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [nextId, setNextId] = useState(0);

  const handleClick = (e: any) => {
    if (energy > 0) {
      setValue((prev) => {
        const newValue = prev + 1;
        // Update both totalCoins and totalCoins2 in localStorage
        const storedTotalCoins = localStorage.getItem('totalCoins');
        const storedTotalCoins2 = localStorage.getItem('totalCoins2');
        const totalCoins = storedTotalCoins !== null ? parseInt(storedTotalCoins, 10) : 0;
        const totalCoins2 = storedTotalCoins2 !== null ? parseInt(storedTotalCoins2, 10) : 0;
        localStorage.setItem('totalCoins', totalCoins.toString());
        localStorage.setItem('totalCoins2', totalCoins2.toString());
        return newValue;
      });
      setEnergy((prev) => (prev > 0 ? prev - 1 : 0));

      const { clientX: x, clientY: y } = e;
      const newText: FloatingText = { id: nextId, x, y };
      setFloatingTexts((prev) => [...prev, newText]);
      setNextId((prev) => prev + 1);

      setTimeout(() => {
        setFloatingTexts((prev) =>
          prev.filter((text) => text.id !== newText.id)
        );
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
      <div className="MidData">
        <div className="TotalCoins">
          <img src={textImage} alt="" />
          {value}
        </div>
        <div className="MidImgCoin">
          <img
            src={Coin}
            onClick={handleClick}
            onMouseDown={(e) => e.preventDefault()}
            draggable={true}
            className="coin-button no-select"
            alt="Puma"
          />
        </div>
        <div className="energy">
          <div className="energyText">
            <h2>energy</h2>
            <span>
              {energy} / {maxEnergy}
            </span>
          </div>
          <div className="percentage">
            <div
              className="PercenetCount"
              style={{ width: `${energyPercentage}%` }}
            ></div>
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
  );
};

export default Mid;
