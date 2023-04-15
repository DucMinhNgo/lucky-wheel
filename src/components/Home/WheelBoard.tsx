import { IonContent, IonPage } from '@ionic/react';
import { useState } from 'react';
import './WheelBoard.css';
import WheelRoulette from './WheelRoulette';
import { useToggle } from 'react-use';

const data: any = [
  {
    id: 40,
    image: "https://mio-app-dev.s3.ap-southeast-1.amazonaws.com/photos/SlBiRYeYoWOVQyvX9LZqP7QrXWsXZcD2.jpg",
    option: "[Tặng] Bịch sữa tiệt trùng Vinamilk",
    subTitle: "Sữa",
    valueText: "15.000 ₫",
    style: {
      "backgroundColor": "#fe8c2e",
      "textColor": "white"
    }
  }
]

const WheelBoard = () => {
  const [spining, setSpining] = useState(false);
  const [mustSpin, setMustSpin] = useState(false);
  const [isShowBlankView, toggleShowBlankView] = useToggle(false);
  const turn = 10;

  const didStopSpin = () => {
    setMustSpin(false);
    setSpining(false);
    setTimeout(() => {
      // toggleShowDrawedReward(true);
    }, 200);
  };

  const handleSpinClick = async () => {
    try {
      if (turn <= 0) {
        toggleShowBlankView(true);
        return;
      }
      setSpining(true);
      setMustSpin(true);
    } catch (error) {
      // error
    }
  };

  return (<IonPage>
    <div
      style={{
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <img
        alt={'Mio'}
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
        src={'/assets/draw_bg.png'}
      />
    </div>
    <IonContent
      color="transparent"
      style={{
        '--background': 'transparent'
      }}
    >
      <div
        style={{
          flex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-arround',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            marginTop: -60,
            zIndex: 100
          }}
        >
          <WheelRoulette
            turn={turn}
            mustSpin={mustSpin}
            prizeNumber={1}
            rouletteData={data}
            handleSpinClick={handleSpinClick}
            spining={spining}
            didStopSpin={didStopSpin}
          />
        </div>
      </div>
    </IonContent>
  </IonPage>)
}

export default WheelBoard;