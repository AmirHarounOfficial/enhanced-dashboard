"use client";
import React from 'react'
import { useTranslation } from 'react-i18next'

function SearchForm({ placeholderKey, width, ...props }) {
  const { t } = useTranslation();

  return (
    <div className="search-luxury" style={{ width: width || '546px', maxWidth: '100%' }}>
      <img
        src="/images/icons/search.svg"
        alt="search"
        className="search-icon"
      />
      <input
        type="text"
        placeholder={t(placeholderKey)}
        {...props}
      />
    </div>
  )
}

export default SearchForm
