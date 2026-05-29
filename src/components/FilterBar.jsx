import React from 'react';

const FILTER_OPTIONS = [
  { value: 'all', label: 'TẤT CẢ' },
  { value: 'floral', label: 'HƯƠNG HOA (FLORAL)' },
  { value: 'woody', label: 'HƯƠNG GỖ (WOODY)' },
  { value: 'fresh', label: 'TƯƠI MÁT (FRESH)' },
];

export const FilterBar = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="filter-section">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          className={`filter-btn ${activeFilter === option.value ? 'active' : ''}`}
          onClick={() => onFilterChange(option.value)}
          aria-pressed={activeFilter === option.value}
          aria-label={`Lọc theo ${option.label}`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};