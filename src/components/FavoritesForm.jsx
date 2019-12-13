import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from 'linaria';

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

  function handleChange(evt) {
    setValue(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const sanitized = value.trim();
    if (sanitized.length) {
      onAdd(sanitized);
      setValue('');
    }
  }

  return (
    <form className={formCss} onSubmit={handleSubmit}>
      <input
        className="input"
        placeholder="Flavor name"
        type="text"
        value={value}
        onChange={handleChange}
      />
      <button className="submit" type="submit">+</button>
    </form>
  );
}

FavoritesForm.propTypes = {
  calendar: PropTypes.object,
  onAdd: PropTypes.func
};

export default FavoritesForm;
