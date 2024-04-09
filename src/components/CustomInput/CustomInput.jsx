import "./CustomInput.css"

export const CustomInput = ({
  typeProp,
  nameProp,
  placeholderProp,
  handlerProp,
  value,
  isDisabled
}) => {
  

  return (
    
    <input className="customInputDesign"
      type={typeProp}
      name={nameProp}
      placeholder={placeholderProp}
      value={value}
      disabled={isDisabled}
      onChange={(e) => handlerProp(e)}
    />
  );
};
// props, properties, propiedades, se reciben como un objeto
// <CustomInput type="email" name="emailInput" placeholder="introduce tu email..." />