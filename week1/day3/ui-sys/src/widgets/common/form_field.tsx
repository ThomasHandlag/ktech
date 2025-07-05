import React from "react";

type FormFieldProps = {
  label?: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  className?: string;
  canSubmit?: boolean;
  children?: React.ReactNode;
};

const FormField = (props: FormFieldProps) => {
  return (
   <form className={`p-4 sm:p-2 ${props.className}`} onSubmit={props.onSubmit}>
      {props.children}
    </form>
  );
};


export default FormField;
