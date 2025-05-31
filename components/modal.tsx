"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'full'
}

const sizeClasses = {
  sm: 'sm:max-w-[425px]',
  md: 'sm:max-w-[550px]',
  lg: 'sm:max-w-[650px]',
  xl: 'sm:max-w-[800px]',
  '2xl': 'sm:max-w-[1000px]',
  '3xl': 'sm:max-w-[1200px]',
  '4xl': 'sm:max-w-[1400px]',
  '5xl': 'sm:max-w-[1600px]',
  '6xl': 'sm:max-w-[1800px]',
  '7xl': 'sm:max-w-[2000px]',
  full: 'sm:max-w-full',
}

export function Modal({ isOpen, onClose, children, title, size = 'md' }: ModalProps) {
  const sizeClass = sizeClasses[size] || sizeClasses.md
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={sizeClass}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
