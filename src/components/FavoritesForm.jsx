import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';
import SuggestionPopover from './SuggestionPopover';

const formCss = css`
  position: relative;
  margin-bottom: 40px;

  .input {
    border: 1px solid var(--brand-grey-lighter);
    border-radius: 4px;
    padding: 8px 32px 8px 8px;
    width: 100%;
    transition: border-color 0.3s;

    &:focus,
    &:active {
      outline: none;
    }

    &:focus {
      border-color: var(--link-alt-color);
    }
  }

  .submit {
    position: absolute;
    top: 3px;
    right: 6px;
    font-size: 24rem;
    color: var(--link-color);

    &:focus,
    &:active {
      outline: none;
    }
  }
`;

function FavoritesForm({ onAdd }) {
  const [value, setValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  function reset() {
    setValue('');
    setShowSuggestions(false);
  }

  function handleBlur() {
    setShowSuggestions(false);
  }

  function handleChange(evt) {
    setValue(evt.target.value);
    setShowSuggestions(evt.target.value.trim().length > 2);
  }

  function handleSelect(selectedValue) {
    onAdd(selectedValue);
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const sanitized = value.trim();
    if (sanitized.length) {
      onAdd(sanitized);
      reset();
    }
  }

  return (
    <form className={formCss} onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          className="input"
          placeholder="Flavor name"
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <button className="submit" type="submit">+</button>
      </div>
      <SuggestionPopover
        query={value}
        onSelect={handleSelect}
        show={showSuggestions}
      />
    </form>
  );
}

FavoritesForm.propTypes = {
  calendar: PropTypes.object,
  onAdd: PropTypes.func
};

export default FavoritesForm;
