export interface Props {
  children: String | String[];
}

export type Tag = Function | String;

const flattenFirstChild = val => {
  // First children can come down as arrays, strings or arrays of arrays.
  // TODO: Clean this up.
  return val && val[0]
    ? Array.isArray(val) && val.length > 2 ? [...val] : [val]
    : [];
};

export const davey = (tag: Tag, _props: Props, first, ...rest) => {
  const props = {
    ..._props,
    children: flattenFirstChild(first).concat(
      rest,
      _props && _props.children ? _props.children : []
    ),
  };

  return typeof tag === "function" ? tag(props) : [tag, props];
};
