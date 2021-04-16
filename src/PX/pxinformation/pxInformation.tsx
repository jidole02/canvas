import { FC, ReactElement,useRef, useState } from 'react'
import { PxClass } from '../classInterface/class';
import { useEffect } from 'react';

export const PxInformatino : FC =() :ReactElement =>{
    const canvas = useRef();
    const cv:HTMLCanvasElement = canvas.current;
    const p = new PxClass();
    const [load,setLoad] = useState<boolean>(false);
    if(cv!==undefined){
        p.ctx = cv.getContext('2d');
    }
    useEffect(()=>{
        setLoad(true);
    },[])
    useEffect(()=>{
        if(cv !==undefined){
            p.ctx.fillStyle = 'black';
        }
        p.ctx?.fillRect(1,1,10,10);
    },[load])
    return(
        <>
        <canvas ref={canvas}></canvas>
        </>
    )
}