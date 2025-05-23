import * as Ariakit from "@ariakit/react";
import styled from "@xstyled/emotion";

import { defaultFieldStyles } from "../../utils/field-styles";

import { CheckboxProps } from "./index";

/* /!\ WARNING /!\ Don't add style after pseudo selector, it won't apply because of the dynamic color injected in the fill of the content */

export const Checkbox = styled(Ariakit.Checkbox)<CheckboxProps>((props) => {
  const { indeterminate, order = "-1", size, theme, variant } = props;
  // Cast theme to any to avoid TypeScript errors with theme properties
  const typedTheme = theme as any;

  // Create the base styles
  const baseStyles = `
    ${defaultFieldStyles({ size, variant })}
    position: relative;
    padding: 0;
    order: ${order};
    cursor: pointer;
    transition: medium;
    overflow: hidden;
  `;

  // Create checked styles
  const checkedStyles = `
    &[aria-checked='true'] {
      &:not([disabled]) {
        color: ${typedTheme.checkboxes?.checked?.color};
        background-color: ${typedTheme.checkboxes?.checked?.backgroundColor};
        border-color: ${typedTheme.checkboxes?.checked?.borderColor};
      }
    }
    //   &:not([indeterminate]) {
    //     &::after {
    //       content: url('data:image/svg+xml; utf8, <svg viewBox="0 0 10 8" xmlns="http://www.w3.org/2000/svg"><path fill="${typedTheme.defaultFields?.checkableField?.checked?.color || "#000"}" d="M7.96171 0.596898C8.24912 0.27893 8.74024 0.25262 9.06024 0.537743C9.37208 0.815607 9.40671 1.28712 9.14514 1.60662L9.11975 1.63611L3.90331 7.40311C3.75365 7.5687 3.54304 7.66003 3.32401 7.66003C3.15017 7.66003 2.98077 7.60235 2.84241 7.49383L2.80848 7.46564L0.943652 5.82577C0.620151 5.54147 0.590221 5.04928 0.877091 4.72749C1.15398 4.41772 1.62383 4.38076 1.94536 4.6368L1.97506 4.66166L3.26156 5.79276L7.96171 0.596898Z" /></svg>');
    //       position: absolute;
    //       top: -2px;
    //       right: 0;
    //       bottom: 0;
    //       left: 0;
    //       width: 10px;
    //       margin: auto;
    //       text-align: center;
    //     }
    //   }
    // }
  `;

  // Create indeterminate styles
  const indeterminateStyles = indeterminate
    ? `
    &:not([disabled]) {
      color: ${typedTheme.checkboxes?.checked?.color};
      background-color: ${typedTheme.checkboxes?.checked?.backgroundColor};
      border-color: ${typedTheme.checkboxes?.checked?.borderColor};
    }

    /* stylelint-disable string-no-newline */
    // &::after {
    //   content: url("data:image/svg+xml,%3Csvg width='10' height='4' viewBox='0 0 10 4' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M1.3973 1.76919C0.953776 1.81988 0.634816 2.04775 0.685235 2.49156C0.732149 2.90436 1.08212 3.03624 1.48789 3.03624L8.6029 2.23086C9.04669 2.18017 9.36538 1.9523 9.31469 1.50849C9.26427 1.06468 8.86389 0.917163 8.41956 0.969201C4.90971 1.38026 4.90828 1.36792 1.3973 1.76919Z' fill='${typedTheme.defaultFields?.checkableField?.checked?.color || "#000"}'/%3E%3C/svg%3E");
    //   position: absolute;
    //   top: -3.5px;
    //   right: 0;
    //   bottom: 0;
    //   left: 2px;
    //   margin: auto;
    // }
  `
    : "";

  // Create disabled styles
  const disabledStyles = `
    &[disabled] {
      opacity: ${typedTheme.checkboxes?.disabled?.opacity || 0.5};
      cursor: not-allowed;

      &::after {
        opacity: ${typedTheme.defaultFields?.checkableField?.disabled?.opacity || 0.5};
      }
    }
  `;

  return `
    ${baseStyles}
    ${checkedStyles}
    ${indeterminateStyles}
    ${disabledStyles}
  `;
});
