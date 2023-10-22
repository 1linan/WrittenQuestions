import styles from './button.module.scss';
import cn from 'classnames';
import React, { ReactNode } from 'react';
import { ButtonType } from '@/types/type';
import addIcon from '@/assets/images/add.png';

interface ButtonProps {
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode | string;
  className?: any;
  type?: ButtonType | 'primary' | 'link'; //设置按钮类型
  ghost?: boolean; //幽灵属性，使按钮背景透明，默认是false
  add?: boolean; //是否带+号，默认不带，默认是false
  danger?: boolean; //设置危险按钮，默认是false
  gray?: boolean; //设置暗灰色按钮，默认是false
  disabled?: boolean; //设置按钮失效状态，默认是false
  size?: 'large' | 'middle' | 'small'; //设置按钮大小,默认是middle
}

export function Button(props: ButtonProps) {
  const {
    className = {},
    type = 'default',
    ghost = false,
    add = false,
    danger = false,
    disabled = false,
    gray = false,
    size = 'middle',
    onClick = () => {
      //
    },
  } = props;

  return (
    <button
      onClick={onClick}
      className={cn(styles.btn, className, styles[type], styles[size], {
        [styles.ghost]: ghost,
        [styles.danger]: danger,
        [styles.gray]: gray,
        [styles.disabled]: disabled,
        [styles.gray]: gray,
      })}
      disabled={disabled}
    >
      {add && <img src={addIcon} alt="" width={15} height={15} />}
      {props.children}
    </button>
  );
}
