import {
  forwardRef,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { ControlBorder } from "./Sketch";
import { cx } from "./utils";
export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  success?: ReactNode;
}
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextField(
    {
      label,
      description,
      error,
      success,
      id,
      className,
      "aria-describedby": describedBy,
      ...props
    },
    ref,
  ) {
    const autoId = useId();
    const inputId = id ?? autoId;
    const invalid = Boolean(error);
    const message = error || success;
    return (
      <div
        className={cx("edem-field", className)}
        data-invalid={invalid}
        data-success={!invalid && Boolean(success)}
      >
        <label htmlFor={inputId}>{label}</label>
        {description && (
          <div
            id={`${inputId}-description`}
            className="edem-field__description"
          >
            {description}
          </div>
        )}
        <div className="edem-field__control">
          <input
            {...props}
            ref={ref}
            id={inputId}
            aria-invalid={invalid || props["aria-invalid"]}
            aria-describedby={
              [
                describedBy,
                description && `${inputId}-description`,
                message && `${inputId}-message`,
              ]
                .filter(Boolean)
                .join(" ") || undefined
            }
          />
          <ControlBorder />
        </div>
        <div aria-live="polite">
          {message && (
            <div id={`${inputId}-message`} className="edem-field__message">
              {message}
            </div>
          )}
        </div>
      </div>
    );
  },
);
