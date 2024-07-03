import React, { FC, ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './iconCheckbox.module.scss';
import { IconCheckboxProps } from './iconCheckbox.types';

const IconCheckbox: FC<IconCheckboxProps> = ({ className, items, value = [], onChange }) => {
  const rootClassName = classNames(styles.root, className);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: itemValue, checked } = e.target;
    let newValue;
    if (checked) {
      newValue = [...value, itemValue];
    } else {
      newValue = value.filter((v) => v !== itemValue);
    }
    const event = {
      target: {
        value: newValue.join(', '),
      },
    } as unknown as ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

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
              onChange={handleCheckboxChange}
            />
            {icon}
          </label>
        </li>
      ))}
    </ul>
  );
};

export default IconCheckbox;
