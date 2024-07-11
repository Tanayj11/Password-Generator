import { useState, useCallback, useEffect, useRef } from 'react'

function App() {

  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
      let pass = ""
      let str = "ABCDEFGHIJKLMNOPQRSRTUVWXYZabcdefghijklmnopqrstuvwxyz"

      if(numberAllowed){
        str += "0123456789"
      }
      if(charAllowed){
        str += "!@#$%^&*(){}[]_"
      }

      for(let i =0;i<=length;i++){
        let char = Math.floor(Math.random()*str.length + 1)
        pass += str.charAt(char)
      }

      setPassword(pass)

  }, [length,numberAllowed,charAllowed,setPassword])

    const copyPasswordToClipBoard = useCallback(() => {
      passwordRef.current?.select()
      window.navigator.clipboard.writeText(password)  
      //alert("Copied to Clipboard")
    }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='justify-center items-center h-auto w-full max-w-md  mx-auto shadow-md rounded-lg px-4 py-2 my-10 text-black bg-gray-400'>
      <h1 className='text-black  text-center my-3'>
        Password Generator
      </h1>
     <div className='flex  shadow rounded-lg overflow-hidden '>
      <input type="text"
      value={password} 
      className='outline-none w-full py-2 px-3'
      placeholder ='Password'
      readOnly
      ref = {passwordRef}
      >        
      </input>
      <button 
      onClick={copyPasswordToClipBoard}
      className='outline-none bg-blue-500 text-white px-3 py-1 shrink-0 hover:bg-blue-800'>
      Copy
      </button>
     </div>
     <div className='flex text-sm text-black gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input type='range' 
        min={8}
        max={50}
        value={length}
        className='cursor-pointer py-1 text-blue-500  '
        onChange={(e) => {
          setLength(e.target.value)
        }}  
        >
          </input>
        <label>
          Length: {length}
        </label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type='checkbox'
        defaultChecked={numberAllowed}
        id='numberInput'
        onChange={() => {
          setNumberAllowed((prev) => !prev)
        }}
        >
        </input>
        <label> Numbers </label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input 
        type='checkbox'
        defaultChecked={charAllowed}
        id='CharacterInput'
        onChange={() => {
          setCharAllowed((prev) => !prev)
        }}
        >
        </input>
        <label> Characters </label>
      </div>
     </div>
    </div>
    </>
  )
}

export default App
