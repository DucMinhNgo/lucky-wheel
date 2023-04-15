import { Wheel } from './Wheel';
import './WheelRoulette.css';

const WheelRoulette = ({
  turn = 0,
  mustSpin = false,
  prizeNumber = 0,
  rouletteData = [],
  handleSpinClick = () => { },
  spining = false,
  didStopSpin = () => { },
}): any => {
  return (<div
    style={{
      flexDirection: 'column',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <div
      style={{
        display: 'flex',
        padding: 20,
        position: 'relative',
        flexDirection: 'column'
      }}
    >
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={rouletteData}
        innerBorderColor={'black'}
        outerBorderColor={'white'}
        outerBorderWidth={0}
        radiusLineColor={'white'}
        radiusLineWidth={2}
        fontSize={21}
        onStopSpinning={didStopSpin} />
      {!spining ? (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <button
            style={{
              width: 90,
              height: 90,
              borderRadius: '100%',
              backgroundColor: '#7B20F2',
              color: 'white',
              fontWeight: '800',
              fontSize: 16,
              border: '2px white solid',
              boxShadow: '0px 1px 10px #333333',
            }}
            onClick={handleSpinClick}
          >
            {!spining ? <div style={{ marginTop: 4 }}>{'QUAY'}</div> : null}
            {!spining ? (
              <div style={{ fontSize: 14, fontWeight: '500', marginTop: 2 }}>
                {`${turn} lượt`}
              </div>
            ) : null}
          </button>
        </div>
      ) : null}
    </div>
  </div>)
}

export default WheelRoulette;