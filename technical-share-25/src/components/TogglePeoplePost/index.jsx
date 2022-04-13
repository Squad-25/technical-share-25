import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useState } from "react"

export default function TogglePeoplePost() {
    const [toggle, setToggle] = useState('pessoas')

    return (
        <ToggleButtonGroup
            value={toggle}
            exclusive
            onChange={(event, newToggle) => { setToggle(newToggle) }}
            sx={{
                '&.MuiToggleButtonGroup-root': {
                    width: '312px',
                    height: '36px',
                    margin: '20px auto',
                    backgroundColor: '#ffffff',
                    border: '1px solid #404099'
                },
            }}
        >
            <ToggleButton sx={{
                '&.MuiToggleButton-root': { width: '50%', color: '#404099' },
                '&.MuiToggleButton-root:hover': { backgroundColor: '#ffffff', border: '1px solid #404099' },
                '&.Mui-selected': { backgroundColor: '#404099', color: '#ffffff' },
                '&.Mui-selected:hover': { backgroundColor: '#404099', color: '#ffffff' }
            }}

                value="pessoas">Pessoas
            </ToggleButton>

            <ToggleButton sx={{
                '&.MuiToggleButton-root': { width: '50%', color: '#404099' },
                '&.MuiToggleButton-root:hover': { backgroundColor: '#ffffff', border: '1px solid #404099' },
                '&.Mui-selected': { backgroundColor: '#404099', color: '#ffffff' },
                '&.Mui-selected:hover': { backgroundColor: '#404099', color: '#ffffff' }
            }}
                value="perguntas">Perguntas
            </ToggleButton>
        </ToggleButtonGroup>
    )
}