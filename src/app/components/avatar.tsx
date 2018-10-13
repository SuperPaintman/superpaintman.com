'use strict';
/** Imports */
import * as React           from 'react';
import { Component }        from 'react';


/** Interfaces */
export interface IAvatarProps {
  src:   string;
  size?: number;
}


/** Constants */
const AVATAR_SIZE = 64;


/** Component */
export default class Avatar extends Component<IAvatarProps, undefined> {
  render() {
    const { src } = this.props;
    const size = this.props.size || AVATAR_SIZE;
    const alt = 'Aleksandr Krivoshchekov\'s (SuperPaintman) Avatar';

    return (
      <div
        className='avatar'
        style={{
          width:  size,
          height: size
        }}
        >
        <img
          className='image'
          width={size}
          height={size}
          src={src}
          alt={alt}
          />
      </div>
    );
  }
}
