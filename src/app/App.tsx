import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react'
import './App.css'
import Commands from '../command/core'
import {HistoryObjectType} from "../command/index.d"
import * as packageJson from "../../package.json"

const TERMINAL_COMMAND_PREFIX = `${packageJson.name} ~ % `


function App() {
  const [currentCommand, setCurrentCommand] = useState("");
  const [history, setHistory] = useState<HistoryObjectType[]>([])
  // const [historyPointer, setHistoryPointer] = useState<number>(1)
  const inputRef = useRef<HTMLInputElement>();
  const setFocus = (): void => {
    const currentEl = inputRef.current;
    if (currentEl) {
      currentEl.focus();
    }
  };

  /*useEffect(() => {
    if (historyPointer > 0) {
      setCurrentCommand(history[historyPointer].command)
    }
  }, [historyPointer])*/

  useEffect(() => {
    const currentEl = inputRef.current;
    if (currentEl) {
      // console.log(currentEl.clientHeight)
      // currentEl.scrollTop = currentEl.clientHeight
      currentEl.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentCommand, history])

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setCurrentCommand(value)
  }

  const onKeyPress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      // console.debug(event, currentCommand);
      if (currentCommand.trim() === "") {
        // empty command
        // setHistory(history.concat([{result: "", command: ""}]))
      } else {
        // search for command
        const foundCommand = Commands.filter((c) => c.command === currentCommand.trim());
        if (foundCommand.length > 0) {
          // command found
          if (foundCommand[0].resetHistory) {
            setHistory([])
          } else {
            setHistory(history.concat([{result: (await foundCommand[0].func()).result, command: currentCommand.trim()}]))
          }
        } else {
          // command not found
          setHistory(history.concat([{ result: `command not found: ${currentCommand}`, command: currentCommand.trim()}]))
        }
      }
      setCurrentCommand("")
    }
  }
  /*const onKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      if (history.length > 0) {
        setHistoryPointer(history.length - historyPointer)
      }
    } else if (event.key === "ArrowDown") {

    }
  }*/

  const renderInput = () => {
    return <input
        // @ts-ignore
          ref={inputRef}
          data-testid={"broterm-input"}
          value={currentCommand}
          onChange={onChange}
          type={"text"}
          autoCorrect={'none'}
          autoCapitalize={'none'}
          autoSave={'none'}
          autoFocus
          // onKeyDown={onKeyDown}
          className={"terminal-input"}
      />
  }

  return (
      <div
          className="terminal"
          tabIndex={0}
          onClick={() => setFocus()}
          onKeyPress={onKeyPress}
          // onKeyUp={onKeyUp}
      >
              <div className={"container"}>
                  {
                      history.map((c, i) => {
                          return (
                              <div role="listitem" className="line" key={`${c.command}_${i}`}>
                                  <span>{TERMINAL_COMMAND_PREFIX + c.command}</span>
                                  <span style={{whiteSpace: "pre-wrap"}}>{c.result}</span>
                              </div>
                          )
                      })
                  }
                  {
                      <div role="listitem" className="line last">
                          <span>{TERMINAL_COMMAND_PREFIX}</span>
                          <span>{renderInput()}</span>
                      </div>
                  }
              </div>
      </div>
  )
}

export default App
