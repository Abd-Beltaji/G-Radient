import GradiantLogo from 'assets/svg/Gradiant.svg'
import './Header.css'

import { ReactComponent as RadialIcon } from 'assets/svg/modes/radial.svg'
import { ReactComponent as LinearIcon } from 'assets/svg/modes/linear.svg'
import { ReactComponent as MeshIcon } from 'assets/svg/modes/mesh.svg'
import { useState, useEffect } from 'react'

import {update} from 'App'

let mode: string, setMode: React.Dispatch<React.SetStateAction<string>>

const ModeButtons = () => {
  useEffect(()=>{
    update()
  },[mode])
  return (
    <div className="modeChanger">
      <div
        className={`mode ${mode === 'radial' ? 'active' : ''}`}
        onClick={() => setMode('radial')}
      >
        <RadialIcon />
      </div>
      <div
        className={`mode ${mode === 'linear' ? 'active' : ''}`}
        onClick={() => setMode('linear')}
      >
        <LinearIcon />
      </div>
      <div
        className={`mode ${mode === 'mesh' ? 'active' : ''}`}
        onClick={() => setMode('mesh')}
      >
        <MeshIcon />
      </div>
    </div>
  )
}

const Header = () => {
  ;[mode, setMode] = useState('radial')
  return (
    <header>
      <img src={GradiantLogo} alt="Gradiant" draggable="false" />
      <div>
        Gradient mode:
        <ModeButtons />
      </div>
    </header>
  )
}
export default Header
export const getMode = () => mode
