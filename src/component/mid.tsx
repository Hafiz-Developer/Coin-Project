import { useEffect, useState } from "react";
import Coin from "../assets/images/puma.ico";
import textImage from "../assets/images/textImage.png";

interface FloatingText {
  id: number;
  x: number;
  y: number;
}

const Mid = () => {
  const maxEnergy = 2000;
  const regenerationDelay = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

  const [value, setValue] = useState(() => {
    const storedCoinValue = localStorage.getItem('coinValue');
    return storedCoinValue !== null ? parseInt(storedCoinValue, 10) : 0;
  });

  const [energy, setEnergy] = useState(() => {
    const storedEnergy = localStorage.getItem('energy');
    return storedEnergy !== null ? parseInt(storedEnergy, 10) : maxEnergy;
  });

  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [nextId, setNextId] = useState(0);
  const [lastTapTime, setLastTapTime] = useState(() => {
    const storedLastTapTime = localStorage.getItem('lastTapTime');
    return storedLastTapTime !== null ? parseInt(storedLastTapTime, 10) : Date.now();
  });
  const [countdown, setCountdown] = useState(() => {
    const storedCountdown = localStorage.getItem('countdown');
    return storedCountdown !== null ? parseInt(storedCountdown, 10) : regenerationDelay;
  });

  const handleClick = (e: any) => {
    if (energy > 0) {
      setValue((prev) => {
        const newValue = prev + 1;

        const totalCoinsTaskList = localStorage.getItem('totalCoinsTaskList') ?? '0';
        const totalCoinsYoutube = localStorage.getItem('totalCoinsYoutube') ?? '0';
        const totalCoinsDailyRewards = localStorage.getItem('totalCoinsDailyRewards') ?? '0';

        const totalAllCoins = parseInt(totalCoinsTaskList, 10) +
                              parseInt(totalCoinsYoutube, 10) +
                              parseInt(totalCoinsDailyRewards, 10) +
                              newValue;

        localStorage.setItem('coinValue', newValue.toString());
        localStorage.setItem('totalAllCoins', totalAllCoins.toString());

        return newValue;
      });

      setEnergy((prev) => {
        const newEnergy = prev > 0 ? prev - 1 : 0;
        localStorage.setItem('energy', newEnergy.toString());
        return newEnergy;
      });

      const { clientX: x, clientY: y } = e;
      const newText: FloatingText = { id: nextId, x, y };
      setFloatingTexts((prev) => [...prev, newText]);
      setNextId((prev) => prev + 1);

      setTimeout(() => {
        setFloatingTexts((prev) =>
          prev.filter((text) => text.id !== newText.id)
        );
      }, 2000);

      const now = Date.now();
      setLastTapTime(now);
      localStorage.setItem('lastTapTime', now.toString());

      if (energy === 1) {
        setCountdown(regenerationDelay);
        localStorage.setItem('countdown', regenerationDelay.toString());
      }
    }
  };

  const energyPercentage = (energy / maxEnergy) * 100;

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeElapsed = currentTime - lastTapTime;

      if (energy === 0 && countdown > 0) {
        const newCountdown = regenerationDelay - timeElapsed;
        if (newCountdown <= 0) {
          setEnergy(maxEnergy);
          localStorage.setItem('energy', maxEnergy.toString());
          setCountdown(regenerationDelay);
          localStorage.setItem('countdown', regenerationDelay.toString());
        } else {
          setCountdown(newCountdown);
          localStorage.setItem('countdown', newCountdown.toString());
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastTapTime, countdown, energy]);

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

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
            className="coin-button "
            alt="Puma"
          />
        </div>
        <div className="energyMain">
        <div className="energy">
          <div className="energyText">
            {energy === 0 ? (
              <h1>Time until energy refills: {formatTime(countdown)}</h1>
            ) : (
              <h2>energy</h2>
            )}
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
