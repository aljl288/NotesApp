import { useState, useEffect } from 'react'

export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    // Example static list. This can be replaced by an API call if the categories are dynamic.
    const fetchedCategories = [
      'Work and Study',
      'Life',
      'Health and Well-being',
    ]
    setCategories(fetchedCategories)
  }, [])

  return categories
}
