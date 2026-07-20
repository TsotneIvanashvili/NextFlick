import { createContext, useContext, useState } from 'react'

const UIContext = createContext(null)

export function UIProvider({ children }) {
  const [muted, setMutedState] = useState(() => sessionStorage.getItem('nextflick_sound') !== 'on')
  const [soundChosen, setSoundChosen] = useState(() => sessionStorage.getItem('nextflick_sound') !== null)
  const [searchOpen, setSearchOpen] = useState(false)

  const chooseSound = (on) => {
    sessionStorage.setItem('nextflick_sound', on ? 'on' : 'off')
    setMutedState(!on)
    setSoundChosen(true)
  }

  const setMuted = (m) => {
    sessionStorage.setItem('nextflick_sound', m ? 'off' : 'on')
    setMutedState(m)
  }

  return (
    <UIContext.Provider
      value={{
        muted,
        setMuted,
        soundChosen,
        chooseSound,
        searchOpen,
        openSearch: () => setSearchOpen(true),
        closeSearch: () => setSearchOpen(false),
      }}
    >
      {children}
    </UIContext.Provider>
  )
}

export function useUI() {
  return useContext(UIContext)
}
