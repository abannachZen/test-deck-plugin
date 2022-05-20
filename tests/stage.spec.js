import React from 'react'
import '@testing-library/jest-dom/extend-expect'

import {render, screen} from '@testing-library/react'
import {WidgetizeStageForm} from 'src/WidgetizeStage'

describe('test', () => {
  it('renders', () => {
    render(<WidgetizeStageForm/>)

    expect(screen.getByText("Instance Count")).toBeInTheDocument()
  })
})