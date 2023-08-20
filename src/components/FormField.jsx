const FormField = (props) => {
    const { name,handleBlur,type,formValues, touched ,...rest} =props
    console.log(formValues[name].errors?.[0],name,"touched[name] ")
    return (
      <div>
        <input
          type={type || "text"}
          name={name}
value={formValues[name].value}
         {...rest}
          placeholder={`Enter ${name}`}
        />
        {touched[name] &&  <span>{formValues[name].errors?.[0] }</span>}
      </div>
    );
  };

  export default FormField