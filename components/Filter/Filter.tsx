import type { ChangeEvent } from 'react';
import React from 'react';

interface FilterProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Filter = ({ id, label, checked, onChange }: FilterProps) => (
  <div className="flex justify-start items-center">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type="checkbox"
      className="ml-2"
      checked={checked}
      onChange={onChange}
    />
  </div>
);

export default Filter;
