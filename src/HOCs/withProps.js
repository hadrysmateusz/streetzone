export const withProps = (addedProps) => (Component) => (props) =>
  <Component {...props} {...addedProps} />
