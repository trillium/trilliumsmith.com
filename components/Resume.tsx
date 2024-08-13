'use client'

import { useCallback, useState } from 'react'
import { useResizeObserver } from '@wojtekmaj/react-hooks'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'css/pdf.css'

import type { PDFDocumentProxy } from 'pdfjs-dist'

pdfjs.GlobalWorkerOptions.workerSrc = '/static/js/pdf.worker.min.js'

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
}

const resizeObserverOptions = {}

export default function Sample({ filename }) {
  const [numPages, setNumPages] = useState<number>()
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>(400)
  const [documentHeight, setDocumentHeight] = useState<number>(400)

  function debounce(fn, delay) {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  }

  const handleSetContainerWidth = (width) => {
    setContainerWidth(width)
    setDocumentHeight(Math.floor(width * (11 / 8.5)))
  }

  const debounceSetContainerWidth = debounce(handleSetContainerWidth, 100)

  const onResize = useCallback<ResizeObserverCallback>(
    (entries) => {
      const [entry] = entries

      if (entry) {
        debounceSetContainerWidth(entry.contentRect.width)
      }
    },
    [debounceSetContainerWidth]
  )

  useResizeObserver(containerRef, resizeObserverOptions, onResize)

  function onDocumentLoadSuccess({ numPages: nextNumPages }: PDFDocumentProxy): void {
    setNumPages(nextNumPages)
  }

  return (
    <div className="PDF__container">
      <div className="PDF__container__document xs:m-0" ref={setContainerRef}>
        <Document file={filename} onLoadSuccess={onDocumentLoadSuccess} options={options}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              canvasBackground={'#ffffff'}
              className={`min-w-fit border border-primary-500 bg-primary-500`}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              height={documentHeight}
            />
          ))}
        </Document>
      </div>
    </div>
  )
}
