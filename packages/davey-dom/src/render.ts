const ATTR_FNS_MAP_CLIENT = {
  onClick: (el, handler) => {
    return el.addEventListener("click", handler);
  },
  onBlur: (el, handler) => {
    return el.addEventListener("blur", handler);
  },
  style: (el, styles) => {
    return eachKey(styles, (val, key) => (el.style[key] = val));
  },
  __fallback__: (el, val, key) => {
    return el.setAttribute(key, val);
  },
};

const getAttrFnClient = key => {
  return ATTR_FNS_MAP_CLIENT[key] || ATTR_FNS_MAP_CLIENT.__fallback__;
};

const eachKey = (obj, handler) => {
  const keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    handler(obj[keys[i]], keys[i], obj);
  }
};

const renderClient = ({ tag, props: _props }) => {
  const parent = document.createElement(tag);
  const { children, ...props } = _props;

  eachKey(props, (val, key) => getAttrFnClient(key)(parent, val, key));

  if (Array.isArray(children)) {
    children.forEach(child => {
      if (!child) {
        return;
      } else if (child instanceof Object) {
        parent.appendChild(renderClient(child));
      } else {
        parent.appendChild(document.createTextNode(child));
      }
      return;
    });
  } else {
    parent.appendChild(document.createTextNode(children));
  }

  return parent;
};

export default (elements, el) => {
  el.innerHTML = "";
  el.appendChild(renderClient(elements));
};
