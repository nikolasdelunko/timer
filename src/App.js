import './App.css';
import Button from "./Components/button/Button";
import Display from "./Components/display/Display";
import React, {useEffect, useState} from 'react';
import {interval, of, concat, Subject, share} from "rxjs";
import {repeatWhen, scan, startWith, takeWhile} from "rxjs/operators";


const observable$ = interval(100).pipe(
    startWith(3),
    scan(time => time - 1),
    takeWhile(time => time > -1)
).pipe(share())

const action$ = new Subject()

const countdown$ = concat(observable$, of(0)).pipe(
    repeatWhen(() => action$)
)


function App() {
    const [time, setTime] = useState({HH: 0, MM: 0, SS: 0, MS: 0,})
    const [itsRun, setItsRun] = useState(false)
    const [interV, setInterV] = useState()
    const [wait, setWait] = useState(0)
    const [text, setText] = useState(null)
    const [off, setOff] = useState(false)


    const waitFnk = () => {
        const sub = countdown$.subscribe(setWait)
        return () => sub.unsubscribe()
    }

    const funk = () => {
        if (wait !== 0) {
            setText('*WAIT')
            setOff(true)
            stop()
        }
    }

    useEffect(() => {
        if (wait === 0) {
            setText(null)
            setOff(false)
        }
    }, [wait])



    const start = () => {
        run()
        setInterV(setInterval(run, 10))
        setItsRun(true)
        waitFnk()

    }

    const stop = () => {
        clearInterval(interV)
        setItsRun(false)

    }

    const reset = () => {
        clearInterval(interV)
        setItsRun(false)
        setTime({HH: 0, MM: 0, SS: 0, MS: 0})
    }

    let updateH = time.HH, updateM = time.MM, updateS = time.SS, updateMs = time.MS

    const run = () => {
        if (updateM === 60) {
            updateH++
            updateM = 0
        }
        if (updateS === 60) {
            updateM++
            updateS = 0
        }
        if (updateMs === 100) {
            updateS++
            updateMs = 0
        }
        updateMs++
        return setTime({HH: updateH, MM: updateM, SS: updateS, MS: updateMs})
    }

    return (
        <div className="App">
            <div className='timer-container'>
                <div>
                    <Display time={time}/>
                    <div className='buttons-section'>
                        {(itsRun === true) ? <Button
                            text='STOP'
                            start={stop}
                            itsRun={itsRun}
                            funk={funk}
                            off={off}
                        /> : <Button
                            funk={funk}
                            text='START'
                            start={start}
                            itsRun={itsRun}
                            off={off}
                        />}
                        <p className='wait'>{text}</p>
                        <Button start={reset} text='RESET'/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
