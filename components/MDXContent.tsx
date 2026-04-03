'use client'

import React, { useMemo } from 'react'
import * as _jsx_runtime from 'react/jsx-runtime'
import { components as defaultComponents } from '@/components/MDXComponents'

interface MDXContentProps {
  code: string
  [key: string]: unknown
}

const getMDXComponent = (code: string) => {
  // Velite-compiled MDX expects arguments[0] to be the jsx runtime
  const fn = new Function(code)
  return fn(_jsx_runtime).default
}

const useMDXComponent = (code: string) => {
  return useMemo(() => getMDXComponent(code), [code])
}

export const MDXLayoutRenderer = ({ code, ...rest }: MDXContentProps) => {
  const Mdx = useMDXComponent(code)
  return <Mdx components={defaultComponents} {...rest} />
}
