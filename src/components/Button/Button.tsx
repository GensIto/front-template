import React, { FC } from 'react'

import { Button as MUIButton } from '@mui/material'

export const Button: FC<{ children: React.ReactNode; disabled: boolean; onClick: () => void }> = ({
  children,
  disabled,
  onClick,
}) => (
  <MUIButton onClick={onClick} disabled={disabled}>
    {children}
  </MUIButton>
)
