import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getRotationDegrees } from '../utils';
import { rouletteSelector } from '../common/images';
import {
  RouletteContainer,
  RouletteSelectorImage,
  RotationContainer,
} from './styles';
import {
  DEFAULT_BACKGROUND_COLORS,
  DEFAULT_TEXT_COLORS,
  DEFAULT_OUTER_BORDER_COLOR,
  DEFAULT_OUTER_BORDER_WIDTH,
  DEFAULT_INNER_RADIUS,
  DEFAULT_INNER_BORDER_COLOR,
  DEFAULT_INNER_BORDER_WIDTH,
  DEFAULT_RADIUS_LINE_COLOR,
  DEFAULT_RADIUS_LINE_WIDTH,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_DISTANCE,
} from '../strings';
import WheelCanvas from '../WheelCanvas';

var __assign =
  (this && this.__assign) ||
  function() {
    __assign =
      Object.assign ||
      function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };


const STARTED_SPINNING = 'started-spinning';
const START_SPINNING_TIME = 0;
const CONTINUE_SPINNING_TIME = 0;
const STOP_SPINNING_TIME = 4000;

const getRouletteClass = (hasStartedSpinning) => {
  if (hasStartedSpinning) {
    return STARTED_SPINNING;
  }
  return '';
};

export const Wheel = (_a) => {
  const mustStopSpinning = useRef(false);

  const mustStartSpinning = _a.mustStartSpinning,
    prizeNumber = _a.prizeNumber,
    data = _a.data,
    _b = _a.onStopSpinning,
    onStopSpinning =
      _b === void 0
        ? () => null
        : _b,
    _c = _a.backgroundColors,
    backgroundColors = _c === void 0 ? DEFAULT_BACKGROUND_COLORS : _c,
    _d = _a.textColors,
    textColors = _d === void 0 ? DEFAULT_TEXT_COLORS : _d,
    _e = _a.outerBorderColor,
    outerBorderColor = _e === void 0 ? DEFAULT_OUTER_BORDER_COLOR : _e,
    _f = _a.outerBorderWidth,
    outerBorderWidth = _f === void 0 ? DEFAULT_OUTER_BORDER_WIDTH : _f,
    _g = _a.innerRadius,
    innerRadius = _g === void 0 ? DEFAULT_INNER_RADIUS : _g,
    _h = _a.innerBorderColor,
    innerBorderColor = _h === void 0 ? DEFAULT_INNER_BORDER_COLOR : _h,
    _j = _a.innerBorderWidth,
    innerBorderWidth = _j === void 0 ? DEFAULT_INNER_BORDER_WIDTH : _j,
    _k = _a.radiusLineColor,
    radiusLineColor = _k === void 0 ? DEFAULT_RADIUS_LINE_COLOR : _k,
    _l = _a.radiusLineWidth,
    radiusLineWidth = _l === void 0 ? DEFAULT_RADIUS_LINE_WIDTH : _l,
    _m = _a.fontSize,
    fontSize = _m === void 0 ? DEFAULT_FONT_SIZE : _m,
    _o = _a.perpendicularText,
    perpendicularText = _o === void 0 ? false : _o,
    _p = _a.textDistance,
    textDistance = _p === void 0 ? DEFAULT_TEXT_DISTANCE : _p;

  var _q = useState(0),
    startRotationDegrees = _q[0],
    setStartRotationDegrees = _q[1];
  var _r = useState(0),
    finalRotationDegrees = _r[0],
    setFinalRotationDegrees = _r[1];
  var _s = useState(false),
    hasStartedSpinning = _s[0],
    setHasStartedSpinning = _s[1];
  var _t = useState(false),
    hasStoppedSpinning = _t[0],
    setHasStoppedSpinning = _t[1];
  var _u = useState(false),
    isCurrentlySpinning = _u[0],
    setIsCurrentlySpinning = _u[1];
  var _v = useState(false),
    isDataUpdated = _v[0],
    setIsDataUpdated = _v[1];

  useEffect(() => {
      var _a, _b;
      data.current = data;
      for (var i = 0; i < data.length; i++) {
        data.current[i] = __assign(__assign({}, data[i]), {
          style: {
            backgroundColor:
              ((_a = data[i].style) === null || _a === void 0
                ? void 0
                : _a.backgroundColor) ||
              backgroundColors[i % backgroundColors.length],
            textColor:
              ((_b = data[i].style) === null || _b === void 0
                ? void 0
                : _b.textColor) || textColors[i % textColors.length],
          },
        });
      }
      setIsDataUpdated(true);
    },
    [data, backgroundColors, textColors, setIsDataUpdated]
  );

  const startSpinning = useCallback(
    () => {
      setHasStartedSpinning(true);
      setHasStoppedSpinning(false);
      mustStopSpinning.current = true;
      setTimeout(() => {
        if (mustStopSpinning.current) {
          mustStopSpinning.current = false;
          setHasStartedSpinning(false);
          setHasStoppedSpinning(true);
          onStopSpinning();
        }
      }, START_SPINNING_TIME + CONTINUE_SPINNING_TIME + STOP_SPINNING_TIME);
    },
    [onStopSpinning, setHasStartedSpinning, setHasStoppedSpinning],
  )

  useEffect(() => {
      if (mustStartSpinning && !isCurrentlySpinning) {
        setIsCurrentlySpinning(true);
        startSpinning();
        var finalRotationDegreesCalculated = getRotationDegrees(
          prizeNumber,
          data.length
        );
        setFinalRotationDegrees(finalRotationDegreesCalculated);
      }
    },
    [data.length, isCurrentlySpinning, mustStartSpinning, prizeNumber, setFinalRotationDegrees, setIsCurrentlySpinning, startSpinning]
  );

  useEffect(() => {
      if (hasStoppedSpinning) {
        setIsCurrentlySpinning(false);
        setStartRotationDegrees(finalRotationDegrees);
      }
    },
    [finalRotationDegrees, hasStoppedSpinning, setIsCurrentlySpinning, setStartRotationDegrees]
  );

  

  if (!isDataUpdated) {
    return null;
  }

  return React.createElement(
    RouletteContainer,
    null,
    React.createElement(
      RotationContainer,
      {
        className: getRouletteClass(hasStartedSpinning),
        startSpinningTime: START_SPINNING_TIME,
        continueSpinningTime: CONTINUE_SPINNING_TIME,
        stopSpinningTime: STOP_SPINNING_TIME,
        startRotationDegrees: startRotationDegrees,
        finalRotationDegrees: finalRotationDegrees,
      },
      <div
        style={{
          position: 'absolute',
          top: -20,
          bottom: -20,
          left: -20,
          right: -20,
        }}
      >
        <img src={'/assets/draw_wheel.png'} />
      </div>,
      React.createElement(WheelCanvas, {
        data,
        width: '900',
        height: '900',
        outerBorderColor: outerBorderColor,
        outerBorderWidth: outerBorderWidth,
        innerRadius: innerRadius,
        innerBorderColor: innerBorderColor,
        innerBorderWidth: innerBorderWidth,
        radiusLineColor: radiusLineColor,
        radiusLineWidth: radiusLineWidth,
        fontSize: fontSize,
        perpendicularText: perpendicularText,
        textDistance: textDistance,
      })
    ),
    <div
      style={{
        position: 'absolute',
        inset: 5,
        borderRadius: '100%',
        boxShadow: 'inset 0px 1px 20px #333',
      }}
    ></div>,
    React.createElement(RouletteSelectorImage, {
      src: rouletteSelector.src,
      alt: 'roulette-static',
    })
  );
};
