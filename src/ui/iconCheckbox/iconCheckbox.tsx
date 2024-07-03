import React, { FC } from 'react';
import classNames from 'classnames';
import styles from './iconCheckbox.module.scss';
import { IconCheckboxProps } from './iconCheckbox.types';

const IconCheckbox: FC<IconCheckboxProps> = ({ className, items, value = [], onChange }) => {
  const rootClassName = classNames(styles.root, className);

  return (
    <ul className={rootClassName}>
      {items.map(({ label, value: itemValue, name, icon }) => (
        <li className={styles.item} key={itemValue}>
          <label>
            <span className="visually-hidden">{label}</span>
            <input
              type="checkbox"
              name={name}
              value={itemValue}
              checked={value.includes(itemValue)}
              onChange={onChange}
            />
            {icon}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default IconCheckbox;
