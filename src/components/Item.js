import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import randomcolor from 'randomcolor';

import classNames from '../styles/components/Item.scss';
import { DEFAULT_POST_TITLE } from '../config';

export default function Item({ onClick, href, thumbnail, title, meta, active, hoverText, activeClass }) {
  const itemClass = active ? classNames.activeItem : classNames.item;
  let content = renderContent({ thumbnail, title, meta, hoverText });
  if (activeClass && href) {
    content = <Link to={href} activeClassName={activeClass}>{content}</Link>;
  }
  else if (href) {
    content = <Link to={href}>{content}</Link>;
  }
  return (
    <li className={itemClass} onClick={onClick}>
      {content}
    </li>
  );
}

Item.propTypes = {
  onClick: PropTypes.func,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  defaultTitle: PropTypes.string,
  active: PropTypes.bool,
  meta: PropTypes.node,
  hoverText: PropTypes.string
};

function renderContent({ thumbnail, title, meta, hoverText }) {
  const titleClass = title ? classNames.title : classNames.noTitle;

  const thumbStyle = {
    backgroundImage: thumbnail ? `url(${thumbnail})` : undefined,
    backgroundColor: randomcolor({ seed: title, luminosity: 'light' })
  };
  let thumb = (
    <div key="thumb" className={classNames.thumbnail} style={thumbStyle} />
  );
  if (thumbnail === null) {
    thumb = null;
  }

  title = title || DEFAULT_POST_TITLE;
  hoverText = hoverText || title
  return [
    thumb,
    <div key="info" className={classNames.info}>
      <div className={titleClass} title={hoverText}>
        {title}
      </div>
      <div className={classNames.meta} title={typeof meta === 'string' ? meta : undefined}>
        {meta}
      </div>
    </div>
  ];
}
