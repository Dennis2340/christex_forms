import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import TextFieldComponent from "@/components/TextFieldComponent";
import DropdownFieldComponent from "@/components/DropdownFieldComponent";
import CheckboxFieldComponent from "@/components/CheckBoxFieldComponent";
import RadioFieldComponent from "@/components/RadioFieldComponent";
import DateFieldComponent from "@/components/DateFieldComponent";
import NumberFieldComponent from "@/components/NumberFieldComponent";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


type FieldType = "TEXT" | "DROPDOWN" | "CHECKBOX" | "RADIO" | "DATE" | "NUMBER";

export const getFieldComponent = (fieldType: FieldType): React.FC<any> | null => {
  switch (fieldType) {
    case "TEXT":
      return TextFieldComponent;
    case "DROPDOWN":
      return DropdownFieldComponent;
    case "CHECKBOX":
      return CheckboxFieldComponent;
    case "RADIO":
      return RadioFieldComponent;
    case "DATE":
      return DateFieldComponent;
    case "NUMBER":
      return NumberFieldComponent;
    default:
      return null;
  }
};

