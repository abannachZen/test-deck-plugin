import React from 'react'
import {render, screen} from "@testing-library/react";
import {ZendeskSpinner} from "components/zendesk-spinner";

describe('test', () => {
  it('renders', () => {

    render(<ZendeskSpinner/>)
    expect(screen.getByText("hello world")).toBeInTheDocument()
  })
})