import React, { createRef, useEffect, useState, useRef } from 'react';
import { WheelCanvasStyle } from './styles';
import { clamp } from '../utils';

function roundedImage(ctx, x, y, width, height, radius){
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.stroke();
}

const drawWheel = (canvasRef, data, drawWheelProps) => {
    const QUANTITY = data.length;
    /* eslint-disable prefer-const */
    let outerBorderColor = drawWheelProps.outerBorderColor, 
        outerBorderWidth = drawWheelProps.outerBorderWidth, 
        innerRadius = drawWheelProps.innerRadius, 
        innerBorderColor = drawWheelProps.innerBorderColor, 
        innerBorderWidth = drawWheelProps.innerBorderWidth, 
        radiusLineColor = drawWheelProps.radiusLineColor, 
        radiusLineWidth = drawWheelProps.radiusLineWidth, 
        fontSize = drawWheelProps.fontSize, 
        textDistance = drawWheelProps.textDistance;
    outerBorderWidth *= 2;
    innerBorderWidth *= 2;
    radiusLineWidth *= 2;
    fontSize *= 2;
    const canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 500, 500);
    ctx.strokeStyle = 'transparent';
    ctx.lineWidth = 0;
    // ctx.translate(0.5, 0.5)
    var arc = Math.PI / (QUANTITY / 2);
    var startAngle = 0;
    var outsideRadius = canvas.width / 2 - 10;
    var clampedTextDistance = clamp(0, 100, textDistance);
    var textRadius = (outsideRadius * clampedTextDistance) / 100;
    var clampedInsideRadius = clamp(0, 100, innerRadius);
    var insideRadius = (outsideRadius * clampedInsideRadius) / 100;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    ctx.font = "bold " + fontSize + "px Helvetica, Arial";
    for (var i = 0; i < data.length; i++) {
        var angle = startAngle + i * arc;
        var style = data[i].style;
        ctx.fillStyle = (style && style.backgroundColor);
        ctx.beginPath();
        ctx.arc(centerX, centerY, outsideRadius, angle, angle + arc, false);
        ctx.arc(centerX, centerY, insideRadius, angle + arc, angle, true);
        ctx.stroke();
        ctx.fill();
        ctx.save();
        // WHEEL RADIUS LINES
        ctx.strokeStyle = radiusLineWidth <= 0 ? 'transparent' : radiusLineColor;
        ctx.lineWidth = radiusLineWidth;
        for (var j = 0; j < data.length; j++) {
            var radiusAngle = startAngle + j * arc;
            ctx.beginPath();
            ctx.moveTo(centerX + (insideRadius + 1) * Math.cos(radiusAngle), centerY + (insideRadius + 1) * Math.sin(radiusAngle));
            ctx.lineTo(centerX + (outsideRadius - 1) * Math.cos(radiusAngle), centerY + (outsideRadius - 1) * Math.sin(radiusAngle));
            ctx.closePath();
            ctx.stroke();
        }
        // WHEEL OUTER BORDER
        ctx.strokeStyle =
            outerBorderWidth <= 0 ? 'transparent' : outerBorderColor;
        ctx.lineWidth = outerBorderWidth;
        ctx.beginPath();
        ctx.arc(centerX, centerY, outsideRadius - ctx.lineWidth / 2, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        // WHEEL INNER BORDER
        ctx.strokeStyle =
            innerBorderWidth <= 0 ? 'transparent' : innerBorderColor;
        ctx.lineWidth = innerBorderWidth;
        ctx.beginPath();
        ctx.arc(centerX, centerY, insideRadius + ctx.lineWidth / 2 - 1, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
        // TEXT FILL
        ctx.fillStyle = (style && style.textColor);
        ctx.translate(centerX + Math.cos(angle + arc / 2) * textRadius, centerY + Math.sin(angle + arc / 2) * textRadius);
        var text = data[i].option;
        var valueText = data[i].subTitle || data[i].valueText;
        var imageItem = data[i].image;
        var textRotationAngle = Math.PI - (Math.PI - 2*Math.PI/QUANTITY)/2 + 2*Math.PI/QUANTITY*i;
        ctx.rotate(textRotationAngle);
        ctx.font = "bold " + (fontSize * (imageItem ? 0.7 : 1)) + "px Helvetica, Arial";
        const xRatioTitle = imageItem ? -3.3 : -1;
        const xRatioValue = imageItem ? 2.9 : 1;
        const xRatioImage = -0.8;
        ctx.fillText(text, -ctx.measureText(text).width / 2, xRatioTitle * fontSize * 0.75);
        ctx.font = "" + fontSize*0.8 + "px Helvetica, Arial";
        ctx.fillText(valueText, -ctx.measureText(valueText).width / 2,  xRatioValue * fontSize * 0.5);
        if(imageItem) {
            const imgSize = 105;
            var image = new Image();
            image.src = imageItem;
            ctx.globalCompositeOperation = 'source-over'; //default
            roundedImage(ctx, -(imgSize / 2),  xRatioImage * imgSize, imgSize, imgSize, imgSize * 0.577)
            ctx.clip();
            ctx.drawImage(image, -(imgSize / 2),  xRatioImage * imgSize, imgSize, imgSize);
        }
        ctx.restore();
    }
};

var WheelCanvas = (_a) => {
    const canvasRef = createRef(null);
    const refDrawer = useRef(0);

    const [drawWheelProps, setDrawWheelProps] = useState(null);
    const {
        width,
        height,
        data,
        outerBorderColor,
        outerBorderWidth,
        innerRadius,
        innerBorderColor,
        innerBorderWidth,
        radiusLineColor,
        radiusLineWidth,
        fontSize,
        perpendicularText,
        textDistance,
    } = _a;

    useEffect(() => {
        return () => {
            canvasRef.current = null;
            refDrawer.current = 0; 
        }
    }, []);

    useEffect(() => {
        const obj = {
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
        };
        setDrawWheelProps(obj);
    }, [fontSize, innerBorderColor, innerBorderWidth, innerRadius, outerBorderColor, outerBorderWidth, perpendicularText, radiusLineColor, radiusLineWidth, textDistance]);

    

    useEffect(() => {
        if(data?.length > 0 && canvasRef && drawWheelProps) {
            if(refDrawer.current < 3) {
                refDrawer.current+=1;
                drawWheel(canvasRef, data, drawWheelProps);
            }
        }		
    }, [canvasRef, data, drawWheelProps, refDrawer]);

    useEffect(() => {
       if(data) {
        refDrawer.current = 0;
       }
    }, [data, refDrawer]);

    return React.createElement(WheelCanvasStyle, { ref: canvasRef, width: width, height: height });
};
export default WheelCanvas;
