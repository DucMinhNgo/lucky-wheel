import "./WheelButton.css";
import { useHistory } from "react-router";

/** 
 * Wheel Button
 * @param param0
 * 1. React router, React router dom
 * 2. let, const
 */
const WheelButton = ({ isGuest = false }) => {
  const history = useHistory();
  // TODO:
  const turn = 10;
  const pendingTurns = [];

  return (<div
    style={{
      // position: 'absolute',
      // bottom: isGuest ? 110 : 0,
      // right: 0,
      // zIndex: 9999,
    }}
    onClick={() => {
      history.push('/roulette');
    }}
  >
    <div
      style={{
        // width: 60,
        height: 60,
        // borderRadius: 30,
        // color: '#ef224e',
        margin: 12,
        marginLeft: 16,
        marginBottom: 16,
        // backgroundColor: '#fff0',
        // display: 'flex',
        // justifyContent: 'center',
        // alignItems: 'center',
        // boxShadow: '0px 1px 14px #33333388',
      }}
    >
      <div>
        <img className="rotate" src={'/assets/wheel_small.png'} />
      </div>
    </div>
  </div>)
}

export default WheelButton;