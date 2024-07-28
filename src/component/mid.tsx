import { useEffect, useState } from "react";
import Coin from "../assets/images/puma.png";
import textImage from "../assets/images/textImage.png";

interface FloatingText {
  id: number;
  x: number;
  y: number;
}

const Mid = () => {
  const maxEnergy = 2000;

  // Initialize state with value from localStorage or default to 0
  const [value, setValue] = useState(() => {
    const storedCoinValue = localStorage.getItem('coinValue');
    return storedCoinValue !== null ? parseInt(storedCoinValue, 10) : 0;
  });

  const [energy, setEnergy] = useState(maxEnergy);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [nextId, setNextId] = useState(0);

  const handleClick = (e: any) => {
    if (energy > 0) {
      setValue((prev) => {
        const newValue = prev + 1;

        // Retrieve existing values from localStorage
        const totalCoinsTaskList = localStorage.getItem('totalCoinsTaskList') ?? '0';
        const totalCoinsYoutube = localStorage.getItem('totalCoinsYoutube') ?? '0';
        const totalCoinsDailyRewards = localStorage.getItem('totalCoinsDailyRewards') ?? '0';

        // Calculate the total coins
        const totalAllCoins = parseInt(totalCoinsTaskList, 10) +
                              parseInt(totalCoinsYoutube, 10) +
                              parseInt(totalCoinsDailyRewards, 10) +
                              newValue;

        // Update localStorage with the new values
        localStorage.setItem('coinValue', newValue.toString());
        localStorage.setItem('totalAllCoins', totalAllCoins.toString());

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

  // Calculate total coins for display
  const totalCoinsTaskList = parseInt(localStorage.getItem('totalCoinsTaskList') ?? '0', 10);
  const totalCoinsYoutube = parseInt(localStorage.getItem('totalCoinsYoutube') ?? '0', 10);
  const totalCoinsDailyRewards = parseInt(localStorage.getItem('totalCoinsDailyRewards') ?? '0', 10);
  const totalAllCoins = totalCoinsTaskList + totalCoinsYoutube + totalCoinsDailyRewards + value;

  return (
    <>
      <div className="MidData">
        <div className="TotalCoins">
          <img src={textImage} alt="" />
          {totalAllCoins}
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
