import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import {
  it, describe, beforeEach, expect,
} from 'vitest'
import App from '../App.tsx'
import { ConverterTo, ConverterFrom } from '../constants.ts'

describe('Convert:', () => {
  beforeEach(() => {
    render(<App />)
  })

  it('Text entry', async () => {
    const input = screen.getByPlaceholderText('Waiting for your input...')
    fireEvent.change(input, { target: { value: 'Im trying to enter text' } })
    expect(screen.queryByDisplayValue('Im trying to enter text')).toBeNull()
  })

  it('From decimal to roman', async () => {
    const decimalBtn = screen.getAllByText(ConverterFrom.decimal)[0] as HTMLElement
    const romanBtn = screen.getByText(ConverterTo.roman)
    const input = screen.getByPlaceholderText('Waiting for your input...')

    await userEvent.click(decimalBtn)
    fireEvent.change(input, { target: { value: '10' } })
    await userEvent.click(romanBtn)
    expect(await screen.findByText('X')).toBeInTheDocument()
  })

  it('From binary to roman', async () => {
    const binaryBtn = screen.getAllByText(ConverterFrom.binary)[0] as HTMLElement
    const romanBtn = screen.getByText(ConverterTo.roman)
    const input = screen.getByPlaceholderText('Waiting for your input...')

    await userEvent.click(binaryBtn)
    fireEvent.change(input, { target: { value: '10' } })
    await userEvent.click(romanBtn)
    expect(await screen.findByText('II')).toBeInTheDocument()
  })

  it('From decimal to decimal', async () => {
    const decimalBtn = screen.getAllByText(ConverterFrom.decimal)[0] as HTMLElement
    const secondDecimalBtn = screen.getAllByText(ConverterTo.decimal)[1] as HTMLElement
    const input = screen.getByPlaceholderText('Waiting for your input...')

    await userEvent.click(decimalBtn)
    fireEvent.change(input, { target: { value: '10' } })
    await userEvent.click(secondDecimalBtn)
    expect(await screen.findByText('10')).toBeInTheDocument()
  })

  it('From binary to binary', async () => {
    const binaryBtn = screen.getAllByText(ConverterFrom.binary)[0] as HTMLElement
    const secondBinaryBtn = screen.getAllByText(ConverterTo.binary)[1] as HTMLElement
    const input = screen.getByPlaceholderText('Waiting for your input...')

    await userEvent.click(binaryBtn)
    fireEvent.change(input, { target: { value: '100' } })
    await userEvent.click(secondBinaryBtn)
    expect(await screen.findByText('100')).toBeInTheDocument()
  })

  it('From binary to decimal', async () => {
    const binaryBtn = screen.getAllByText(ConverterFrom.binary)[0] as HTMLElement
    const decimalBtn = screen.getAllByText(ConverterTo.decimal)[1] as HTMLElement
    const input = screen.getByPlaceholderText('Waiting for your input...')

    await userEvent.click(binaryBtn)
    fireEvent.change(input, { target: { value: '10' } })
    await userEvent.click(decimalBtn)
    expect(await screen.findByText('2')).toBeInTheDocument()
  })

  it('From decimal to binary', async () => {
    const decimalBtn = screen.getAllByText(ConverterFrom.decimal)[0] as HTMLElement
    const binaryBtn = screen.getAllByText(ConverterTo.binary)[1] as HTMLElement
    const input = screen.getByPlaceholderText('Waiting for your input...')

    await userEvent.click(decimalBtn)
    fireEvent.change(input, { target: { value: '10' } })
    await userEvent.click(binaryBtn)
    expect(await screen.findByText('1010')).toBeInTheDocument()
  })

  it('Binary error', async () => {
    const binaryBtn = screen.getAllByText(ConverterFrom.binary)[0] as HTMLElement
    const decimalBtn = screen.getAllByText(ConverterTo.decimal)[1] as HTMLElement
    const input = screen.getByPlaceholderText('Waiting for your input...')

    await userEvent.click(binaryBtn)
    fireEvent.change(input, { target: { value: '1234' } })
    await userEvent.click(decimalBtn)
    expect(await screen.findByText('Something went wrong...')).toBeInTheDocument()
  })
})
