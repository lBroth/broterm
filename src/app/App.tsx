import React, {ChangeEvent, KeyboardEvent, useRef, useState} from 'react'
import './App.css'
import Commands from '../command/core'
import {HistoryObjectType} from "../command/index.d"
import * as packageJson from "../../package.json"

const TERMINAL_COMMAND_PREFIX = `${packageJson.name} ~ % `


function App() {
  const [currentCommand, setCurrentCommand] = useState("");
  const [history, setHistory] = useState<HistoryObjectType[]>([])
  const inputRef = useRef<HTMLInputElement>();
  const setFocus = (): void => {
    const currentEl = inputRef.current;
    if (currentEl) {
      currentEl.focus();
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value
      setCurrentCommand(value)
  }

  const onKeypress = async (event: KeyboardEvent<HTMLInputElement>) => {
    if(event.key === 'Enter') {
      console.log(event, currentCommand);
      if (currentCommand.trim() === "") {
        // empty command
        setHistory(history.concat([{result: "", command: ""}]))
      } else {
        // search for command
        const foundCommand = Commands.filter((c) => c.command === currentCommand);
        if (foundCommand.length > 0) {
          // command found
          if (foundCommand[0].resetHistory) {
            setHistory([])
          } else {
            setHistory(history.concat([{result: (await foundCommand[0].func()).result, command: currentCommand}]))
          }
        } else {
          // command not found
          setHistory(history.concat([{ result: `command not found: ${currentCommand}`, command: currentCommand}]))
        }
      }
      setCurrentCommand("")
    }
  }

  const renderInput = () => {
    return <input
        // @ts-ignore
          ref={inputRef}
          data-testid={"broterm-input"}
          value={currentCommand}
          onChange={onChange}
          onKeyPress={onKeypress}
          autoFocus={true}
          style={{
              margin: 0,
              marginLeft: 10,
              fontSize: 16,
              color: "#00ff00",
              fontFamily: "courier new",
              backgroundColor: "#000",
              border: "0px solid #000",
              padding: 0,
              boxShadow: 'none',
              outline: 'none'
          }}
      />
  }

  return (
      <div
          onClick={() => setFocus()}
          className="terminal"
      >
              <div style={{padding: 8}}>
                  {
                      history.map((c, i) => {
                          return (
                              <div role="line" key={`${c.command}_${i}`} style={{display:"flex", justifyContent: "left", alignItems: "left", flexDirection: "column"}}>
                                  <span>{TERMINAL_COMMAND_PREFIX + c.command}</span>
                                  <span style={{whiteSpace: "pre-wrap"}}>{c.result}</span>
                              </div>
                          )
                      })
                  }
                  {
                      <div role="last-line" style={{display:"flex", justifyContent: "left", alignItems: "left"}}>
                          <span>{TERMINAL_COMMAND_PREFIX}</span>
                          <span>{renderInput()}</span>
                      </div>
                  }
              </div>
      </div>
  )
}

export default App
